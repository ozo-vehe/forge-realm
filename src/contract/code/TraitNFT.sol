// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Trait (Trait.sol)
 * @notice ERC1155-based trait / accessory contract designed for composable NFT systems.
 *
 * Features:
 *  - Owner-only creation of trait types (typeId)
 *  - Per-type metadata URI storage (uri(uint256) returns the per-type URI)
 *  - Minting and batch minting (owner-only convenience)
 *  - Per-account locking of trait amounts (lock/unlock for composition flows)
 *  - Transfer protection so locked amounts cannot be transferred or burned
 *  - Events for lifecycle monitoring
 *
 * Security notes:
 *  - Only owner can create new types and mint by default (changeable for production)
 *  - Locked amounts are tracked per (owner -> typeId)
 *  - _update checks ensure users can't move locked tokens
 *
 * Usage in composition flow:
 *  - User holds trait tokens for a given typeId
 *  - User calls lockTrait(typeId, amount) to reserve them for composition
 *  - Composition flow consumes (burns/mints/bridges) the reserved amount, then unlocks as needed
 *
 * For production, consider role-based minting (AccessControl), pausability, and gas optimizations.
 */

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TraitNFT is ERC1155, Ownable {
    uint256 private _nextTypeId;

    // Per-type URI storage
    mapping(uint256 => string) public uriOf;

    // Per-type pricing - NEW!
    mapping(uint256 => uint256) public priceOf;

    // Per-account locked amounts
    mapping(address => mapping(uint256 => uint256)) public lockedAmountOf;

    // Total supply per type
    mapping(uint256 => uint256) public totalSupplyOf;

    // NEW: Track all minters for each type
    mapping(uint256 => address[]) public mintersOf; // typeId => array of minters
    mapping(uint256 => mapping(address => bool)) private hasMinted; // typeId => minter => true/false

    // NEW: Track total minted per user per type
    mapping(address => mapping(uint256 => uint256)) public mintedBy; // minter => typeId => amount

    // NEW: Track all minters across all types
    address[] private allMinters;
    mapping(address => bool) private isRegisteredMinter;

    // Events
    event TraitTypeCreated(
        uint256 indexed typeId,
        string uri,
        uint256 initialSupply,
        address indexed to,
        uint256 price
    );
    event TraitMinted(
        uint256 indexed typeId,
        address indexed to,
        uint256 amount
    );
    event TraitBurned(
        uint256 indexed typeId,
        address indexed from,
        uint256 amount
    );
    event TraitLocked(
        address indexed account,
        uint256 indexed typeId,
        uint256 amount
    );
    event TraitUnlocked(
        address indexed account,
        uint256 indexed typeId,
        uint256 amount
    );
    event URISet(uint256 indexed typeId, string uri);
    event PriceSet(uint256 indexed typeId, uint256 price);

    constructor() ERC1155("") Ownable(msg.sender) {
        _nextTypeId = 0;
    }

    // ======================
    // Type creation & URI
    // ======================

    /**
     * @notice Create a new trait type with initial supply and price
     * @param tokenURI URI for this trait type
     * @param initialSupply initial amount to mint (goes to owner)
     * @param to recipient of initial supply
     * @param price price per trait token in wei (0 = free)
     * @return typeId created type id
     */
    function createType(
        string calldata tokenURI,
        uint256 initialSupply,
        address to,
        uint256 price
    ) external onlyOwner returns (uint256) {
        _nextTypeId += 1;
        uint256 tid = _nextTypeId;

        uriOf[tid] = tokenURI;
        priceOf[tid] = price; // Set the price

        if (initialSupply > 0) {
            _mint(to, tid, initialSupply, "");
            totalSupplyOf[tid] += initialSupply;

            // Track owner as initial minter
            _trackMinter(to, tid, initialSupply);

            emit TraitMinted(tid, to, initialSupply);
        }

        emit TraitTypeCreated(tid, tokenURI, initialSupply, to, price);
        return tid;
    }

    /**
     * @notice Set price for a trait type (owner only)
     * @param typeId the trait type id
     * @param price new price in wei (0 = free)
     */
    function setPrice(uint256 typeId, uint256 price) external onlyOwner {
        require(typeId > 0 && typeId <= _nextTypeId, "Trait: invalid type");
        priceOf[typeId] = price;
        emit PriceSet(typeId, price);
    }

    function setURI(uint256 typeId, string calldata newURI) external onlyOwner {
        require(typeId > 0 && typeId <= _nextTypeId, "Trait: invalid type");
        uriOf[typeId] = newURI;
        emit URISet(typeId, newURI);
    }

    function uri(uint256 typeId) public view override returns (string memory) {
        return uriOf[typeId];
    }

    // ======================
    // Public Minting (Users can mint by paying)
    // ======================

    /**
     * @notice Public mint function - anyone can mint by paying the price
     * @param typeId the trait type to mint
     * @param amount number of tokens to mint
     */
    function mint(uint256 typeId, uint256 amount) external payable {
        require(typeId > 0 && typeId <= _nextTypeId, "Trait: invalid type");
        require(amount > 0, "Trait: amount must be > 0");

        // Calculate total cost
        uint256 totalCost = priceOf[typeId] * amount;
        require(msg.value >= totalCost, "Trait: insufficient payment");

        // Mint to msg.sender
        _mint(msg.sender, typeId, amount, "");
        totalSupplyOf[typeId] += amount;

        // Track the minter
        _trackMinter(msg.sender, typeId, amount);

        emit TraitMinted(typeId, msg.sender, amount);

        // Refund excess payment if any
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }

    /**
     * @notice Owner can mint for free (for airdrops, giveaways, etc.)
     * @param to recipient address
     * @param typeId the trait type
     * @param amount number of tokens
     */
    function ownerMint(
        address to,
        uint256 typeId,
        uint256 amount
    ) external onlyOwner {
        require(typeId > 0 && typeId <= _nextTypeId, "Trait: invalid type");
        _mint(to, typeId, amount, "");
        totalSupplyOf[typeId] += amount;

        // Track the minter
        _trackMinter(to, typeId, amount);

        emit TraitMinted(typeId, to, amount);
    }

    /**
     * @notice Batch mint multiple types (owner only, free)
     */
    function mintBatch(
        address to,
        uint256[] calldata typeIds,
        uint256[] calldata amounts
    ) external onlyOwner {
        for (uint256 i = 0; i < typeIds.length; i++) {
            require(
                typeIds[i] > 0 && typeIds[i] <= _nextTypeId,
                "Trait: invalid type in batch"
            );
            totalSupplyOf[typeIds[i]] += amounts[i];

            // Track each type
            _trackMinter(to, typeIds[i], amounts[i]);
        }
        _mintBatch(to, typeIds, amounts, "");
        for (uint256 i = 0; i < typeIds.length; i++) {
            emit TraitMinted(typeIds[i], to, amounts[i]);
        }
    }

    // ======================
    // Withdrawal (NEW!)
    // ======================

    /**
     * @notice Withdraw collected ETH to owner
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Trait: no funds to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @notice Check contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // ======================
    // Internal Tracking Function
    // ======================

    function _trackMinter(
        address minter,
        uint256 typeId,
        uint256 amount
    ) private {
        // Track if this is first time minting this type
        if (!hasMinted[typeId][minter]) {
            mintersOf[typeId].push(minter);
            hasMinted[typeId][minter] = true;
        }

        // Track total amount minted by this user for this type
        mintedBy[minter][typeId] += amount;

        // Track in global minters list
        if (!isRegisteredMinter[minter]) {
            allMinters.push(minter);
            isRegisteredMinter[minter] = true;
        }
    }

    // ======================
    // View Functions for Minter Data
    // ======================

    /**
     * @notice Get all addresses that have minted a specific type
     * @param typeId the trait type
     * @return array of minter addresses
     */
    function getMintersOf(
        uint256 typeId
    ) external view returns (address[] memory) {
        return mintersOf[typeId];
    }

    /**
     * @notice Get number of unique minters for a type
     * @param typeId the trait type
     * @return count of unique minters
     */
    function getMinterCount(uint256 typeId) external view returns (uint256) {
        return mintersOf[typeId].length;
    }

    /**
     * @notice Check if an address has minted a specific type
     * @param typeId the trait type
     * @param minter the address to check
     * @return true if minter has minted this type
     */
    function hasMintedType(
        uint256 typeId,
        address minter
    ) external view returns (bool) {
        return hasMinted[typeId][minter];
    }

    /**
     * @notice Get total amount minted by a user for a specific type
     * @param minter the address
     * @param typeId the trait type
     * @return total amount minted
     */
    function getTotalMintedBy(
        address minter,
        uint256 typeId
    ) external view returns (uint256) {
        return mintedBy[minter][typeId];
    }

    /**
     * @notice Get all unique minters across all types
     * @return array of all minter addresses
     */
    function getAllMinters() external view returns (address[] memory) {
        return allMinters;
    }

    // ======================
    // Burn
    // ======================

    function burn(uint256 typeId, uint256 amount) external {
        require(
            balanceOf(msg.sender, typeId) >= amount,
            "Trait: insufficient balance"
        );
        uint256 locked = lockedAmountOf[msg.sender][typeId];
        uint256 available = balanceOf(msg.sender, typeId) - locked;
        require(available >= amount, "Trait: attempting to burn locked tokens");
        _burn(msg.sender, typeId, amount);
        totalSupplyOf[typeId] -= amount;
        emit TraitBurned(typeId, msg.sender, amount);
    }

    function burnBatch(
        uint256[] calldata typeIds,
        uint256[] calldata amounts
    ) external {
        require(typeIds.length == amounts.length, "Trait: arrays mismatch");
        for (uint256 i = 0; i < typeIds.length; i++) {
            uint256 tid = typeIds[i];
            uint256 amt = amounts[i];
            require(
                balanceOf(msg.sender, tid) >= amt,
                "Trait: insufficient balance for tid"
            );
            uint256 locked = lockedAmountOf[msg.sender][tid];
            uint256 available = balanceOf(msg.sender, tid) - locked;
            require(
                available >= amt,
                "Trait: attempting to burn locked tokens"
            );
        }
        _burnBatch(msg.sender, typeIds, amounts);
        for (uint256 i = 0; i < typeIds.length; i++) {
            totalSupplyOf[typeIds[i]] -= amounts[i];
            emit TraitBurned(typeIds[i], msg.sender, amounts[i]);
        }
    }

    // ======================
    // Locking for composition
    // ======================

    function lockTrait(uint256 typeId, uint256 amount) external {
        require(typeId > 0 && typeId <= _nextTypeId, "Trait: invalid type");
        require(
            balanceOf(msg.sender, typeId) >= amount,
            "Trait: insufficient balance"
        );
        uint256 available = balanceOf(msg.sender, typeId) -
            lockedAmountOf[msg.sender][typeId];
        require(available >= amount, "Trait: insufficient unlocked balance");
        lockedAmountOf[msg.sender][typeId] += amount;
        emit TraitLocked(msg.sender, typeId, amount);
    }

    function unlockTrait(uint256 typeId, uint256 amount) external {
        uint256 locked = lockedAmountOf[msg.sender][typeId];
        require(locked >= amount, "Trait: unlock amount exceeds locked");
        lockedAmountOf[msg.sender][typeId] = locked - amount;
        emit TraitUnlocked(msg.sender, typeId, amount);
    }

    function emergencyUnlock(
        address account,
        uint256 typeId,
        uint256 amount
    ) external onlyOwner {
        uint256 locked = lockedAmountOf[account][typeId];
        require(locked >= amount, "Trait: emergency unlock exceeds locked");
        lockedAmountOf[account][typeId] = locked - amount;
        emit TraitUnlocked(account, typeId, amount);
    }

    // ======================
    // Transfer protection
    // ======================

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal virtual override {
        if (from != address(0)) {
            for (uint256 i = 0; i < ids.length; i++) {
                uint256 tid = ids[i];
                uint256 amt = values[i];
                uint256 locked = lockedAmountOf[from][tid];
                uint256 currentBalance = balanceOf(from, tid);
                uint256 available = currentBalance - locked;
                require(
                    available >= amt,
                    "Trait: attempting to transfer locked tokens"
                );
            }
        }
        super._update(from, to, ids, values);
    }

    // ======================
    // View / Utils
    // ======================

    function nextTypeId() external view returns (uint256) {
        return _nextTypeId;
    }

    function unlockedBalanceOf(
        address account,
        uint256 typeId
    ) public view returns (uint256) {
        uint256 bal = balanceOf(account, typeId);
        uint256 locked = lockedAmountOf[account][typeId];
        if (bal <= locked) return 0;
        return bal - locked;
    }
}

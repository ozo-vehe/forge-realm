// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title BaseNFT
 * @notice ERC-721 NFT contract with:
 *  - minting (owner-only)
 *  - per-token URI storage (ERC721URIStorage)
 *  - lock/unlock mechanics to signal consent for composition (prevents transfers while locked)
 *  - optional ERC-2981 royalty support
 *
 * Usage (hackathon defaults):
 *  - Deployer is owner and can mint NFTs.
 *  - Owners of tokens can call `lockForCompose` before starting a composition flow.
 *  - While locked, token transfers are blocked (prevents accidental transfer during compose).
 *  - Owner (deployer) can emergency unlock tokens if necessary.
 *
 * IMPORTANT: For production, consider role-based minters, pausing, gas optimizations, and audit.
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract BaseNFT is ERC721URIStorage, ERC2981, Ownable {
    // @notice fixed price for minting an nft
    uint256 public mintPrice = 0.01 ether;

    /// @notice incrementing token id counter
    uint256 private _nextId;

    /// @notice marker for tokens locked for composition/consent
    mapping(uint256 => bool) public lockedForCompose;

    /// @notice emitted when a token is minted
    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    /// @notice emitted when a token is locked for composition
    event Locked(uint256 indexed tokenId, address indexed by);

    /// @notice emitted when a token is unlocked
    event Unlocked(uint256 indexed tokenId, address indexed by);

    /// @notice emitted on emergency unlock by contract owner
    event EmergencyUnlocked(uint256 indexed tokenId, address indexed by);

    /// @notice emitted when default royalty is updated
    event DefaultRoyaltySet(address indexed receiver, uint96 feeNumerator);

    /**
     * @param name_ ERC721 name
     * @param symbol_ ERC721 symbol
     * @param royaltyReceiver optional initial royalty receiver (set to address(0) to skip)
     * @param royaltyFeeNumerator initial royalty fee numerator (uses feeDenominator() from ERC2981, default 10000)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        _nextId = 0;
        if (royaltyReceiver != address(0)) {
            _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
            emit DefaultRoyaltySet(royaltyReceiver, royaltyFeeNumerator);
        }
    }

    // =========================
    // Minting / Token Management
    // =========================

    /**
     * @notice Mint a new token to `to` with `tokenURI_`.
     * @dev onlyOwner to simplify hackathon flows. For public minting, add checks/price/whitelist.
     * @return tokenId minted
     */

    // Remove onlyOwner, make it payable
    function mint(
        address to,
        string calldata tokenURI_
    ) external payable returns (uint256) {
        require(msg.value >= mintPrice, "BaseNFT: insufficient payment");
        require(to == msg.sender, "BaseNFT: can only mint to yourself");

        _nextId += 1;
        uint256 tokenId = _nextId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        emit Minted(to, tokenId, tokenURI_);

        return tokenId;
    }

    // Withdraw collected funds
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice Check contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function batchMint(
        address[] calldata recipients,
        string[] calldata tokenURIs
    ) external onlyOwner {
        require(tokenURIs.length > 0, "BaseNFT: no URIs");
        if (recipients.length == 1) {
            // mint all to single recipient
            address to = recipients[0];
            for (uint256 i = 0; i < tokenURIs.length; i++) {
                _nextId += 1;
                uint256 tokenId = _nextId;
                _safeMint(to, tokenId);
                _setTokenURI(tokenId, tokenURIs[i]);
                emit Minted(to, tokenId, tokenURIs[i]);
            }
        } else {
            require(
                recipients.length == tokenURIs.length,
                "BaseNFT: recipients/URIs mismatch"
            );
            for (uint256 i = 0; i < tokenURIs.length; i++) {
                _nextId += 1;
                uint256 tokenId = _nextId;
                _safeMint(recipients[i], tokenId);
                _setTokenURI(tokenId, tokenURIs[i]);
                emit Minted(recipients[i], tokenId, tokenURIs[i]);
            }
        }
    }

    /**
     * @notice Owner can burn a token (useful during composition if you need to burn as part of craft).
     */
    function burn(uint256 tokenId) external {
        // Check if caller is owner or approved
        address owner = ownerOf(tokenId);
        require(
            msg.sender == owner ||
                getApproved(tokenId) == msg.sender ||
                isApprovedForAll(owner, msg.sender),
            "BaseNFT: not owner nor approved"
        );

        _burn(tokenId);

        // clear lock mapping if present
        if (lockedForCompose[tokenId]) {
            lockedForCompose[tokenId] = false;
        }
    }

    // =========================
    // Lock / Unlock (Composition consent)
    // =========================

    /**
     * @notice Token owner calls this to lock token for composition consent.
     * While locked, transfers are blocked (prevents accidental transfer during composition flow).
     */
    function lockForCompose(uint256 tokenId) external {
        address owner = ownerOf(tokenId); // This will revert if token doesn't exist
        require(owner == msg.sender, "BaseNFT: not token owner");
        lockedForCompose[tokenId] = true;
        emit Locked(tokenId, msg.sender);
    }

    /**
     * @notice Token owner may unlock a previously locked token.
     */
    function unlockForCompose(uint256 tokenId) external {
        address owner = ownerOf(tokenId); // This will revert if token doesn't exist
        require(owner == msg.sender, "BaseNFT: not token owner");
        lockedForCompose[tokenId] = false;
        emit Unlocked(tokenId, msg.sender);
    }

    /**
     * @notice Emergency unlock by contract owner (use carefully).
     */
    function emergencyUnlock(uint256 tokenId) external onlyOwner {
        // Check token exists by calling ownerOf (will revert if not exists)
        ownerOf(tokenId);
        if (lockedForCompose[tokenId]) {
            lockedForCompose[tokenId] = false;
            emit EmergencyUnlocked(tokenId, msg.sender);
        }
    }

    // =========================
    // Royalties (ERC-2981)
    // =========================

    /**
     * @notice Set default royalty for all tokens (owner-only).
     * @param receiver royalty receiver address
     * @param feeNumerator royalty fee numerator (denominator 10000 => 100 = 1%)
     */
    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        require(receiver != address(0), "BaseNFT: zero receiver");
        _setDefaultRoyalty(receiver, feeNumerator);
        emit DefaultRoyaltySet(receiver, feeNumerator);
    }

    /**
     * @notice Delete default royalty (owner-only).
     */
    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
        emit DefaultRoyaltySet(address(0), 0);
    }

    // =========================
    // Overrides & Transfer protection
    // =========================

    /**
     * @dev Blocks transfers while token is locked for composition.
     * Allows minting (from == address(0)) and burning (to == address(0)).
     * Replaces _beforeTokenTransfer for OpenZeppelin v5.0+
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);

        // if token exists and a normal transfer (not mint/burn), ensure not locked
        if (from != address(0) && to != address(0)) {
            require(
                !lockedForCompose[tokenId],
                "BaseNFT: token locked for composition"
            );
        }

        return super._update(to, tokenId, auth);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Standard supportsInterface override to include ERC2981
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // =========================
    // View utilities
    // =========================

    /**
     * @notice Returns the latest token id minted (0 if none).
     */
    function nextId() external view returns (uint256) {
        return _nextId;
    }
}

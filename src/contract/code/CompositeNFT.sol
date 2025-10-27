// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title CompositeNFT
 * @dev Composes multiple NFTs (BaseNFT + TraitNFTs) into one "meta-NFT" that represents a new character.
 *      No cross-chain logic — all composition occurs on-chain.
 */
contract CompositeNFT is ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard {
    uint256 private _nextCompositeId;

    struct Component {
        address contractAddress;  // address of BaseNFT or TraitNFT
        uint256 tokenId;          // tokenId from that contract
    }

    // Each composed NFT maps to its underlying components
    mapping(uint256 => Component[]) private _componentsOf;

    // Metadata CID for composed NFTs (stored on IPFS)
    mapping(uint256 => string) public metadataOf;

    // Track if a component token has been used to compose (optional)
    mapping(address => mapping(uint256 => bool)) public isTokenUsedInComposition;

    // Events
    event CompositeMinted(uint256 indexed compositeId, address indexed owner, string metadataCID);
    event CompositeDecomposed(uint256 indexed compositeId);

    // ✅ FIX: Pass msg.sender into Ownable constructor
    constructor() ERC721("CompositeCharacter", "CCNFT") Ownable(msg.sender) {}

    // ==========================================
    // Core Functionality
    // ==========================================

    /**
     * @dev Compose multiple NFTs into a single Composite NFT.
     * @param componentContracts Array of contract addresses (BaseNFT, TraitNFTs).
     * @param componentTokenIds Array of tokenIds corresponding to each contract.
     * @param metadataCID IPFS CID of the combined metadata/image.
     */
    function composeCharacter(
        address[] calldata componentContracts,
        uint256[] calldata componentTokenIds,
        string calldata metadataCID
    ) external nonReentrant returns (uint256) {
        require(componentContracts.length == componentTokenIds.length, "CompositeNFT: bad arrays");
        require(componentContracts.length > 0, "CompositeNFT: no components");

        uint256 compositeId = ++_nextCompositeId;

        // Mint new composite NFT
        _safeMint(msg.sender, compositeId);
        metadataOf[compositeId] = metadataCID;

        // Register all components
        for (uint256 i = 0; i < componentContracts.length; i++) {
            address contractAddr = componentContracts[i];
            uint256 tokenId = componentTokenIds[i];

            // Optional: Mark as used to avoid duplicate composition
            isTokenUsedInComposition[contractAddr][tokenId] = true;

            _componentsOf[compositeId].push(Component({
                contractAddress: contractAddr,
                tokenId: tokenId
            }));
        }

        emit CompositeMinted(compositeId, msg.sender, metadataCID);
        return compositeId;
    }

    /**
     * @dev Decompose (burn) a composite NFT to release components for reuse.
     *      This can be optional depending on your UX.
     */
    function decomposeCharacter(uint256 compositeId) external nonReentrant {
        require(ownerOf(compositeId) == msg.sender, "Not the owner");
        _burn(compositeId);

        // Free the component tokens
        Component[] memory components = _componentsOf[compositeId];
        for (uint256 i = 0; i < components.length; i++) {
            isTokenUsedInComposition[components[i].contractAddress][components[i].tokenId] = false;
        }

        delete _componentsOf[compositeId];
        delete metadataOf[compositeId];

        emit CompositeDecomposed(compositeId);
    }

    // ==========================================
    // View Helpers
    // ==========================================

    function getComponents(uint256 compositeId) external view returns (Component[] memory) {
        return _componentsOf[compositeId];
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        ownerOf(tokenId); // check existence
        string memory cid = metadataOf[tokenId];
        if (bytes(cid).length == 0) return super.tokenURI(tokenId);
        return string(abi.encodePacked("ipfs://", cid));
    }

    // ==========================================
    // Admin & Royalty Controls
    // ==========================================
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
    }

    // ==========================================
    // Overrides
    // ==========================================
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }
}

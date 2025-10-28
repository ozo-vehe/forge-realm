# 🏰 Forge Realm – Cross-Chain Composable NFT Experiences
Forge Realm is a cross-chain composable NFT platform where users can mint base characters and traits (like weapons or accessories), and merge them into unique, dynamic NFTs that evolve across chains.
Step into Forge Realm, and build, customize, and evolve your NFTs—powered by PushChain and blockchain creativity.

<img width="1908" height="1912" alt="Forge-Realm-2" src="https://github.com/user-attachments/assets/7135feee-a6e9-455a-9834-f2d8b57a57c9" />


🔮 Vision
In the world of NFTs, most assets are static — once minted, they cannot evolve. Forge Realm changes that by introducing a composable NFT layer, allowing users to forge new digital identities by combining characters and traits from different creators.
It’s not just about owning NFTs — it’s about building and evolving them together.
I imagine a world where a single NFT character can travel across chains, wear new outfits, equip traits, and grow through player-driven creativity.


💡 Inspiration
NFTs today are mostly static and isolated. We wanted to make them interactive, modular, and community-powered, where creators can collaborate instead of compete. Think of it as “digital Lego for NFTs” — mix, match, and evolve your character across collections and creators.

⚙️ How It Works:
Forge Realm consists of three smart contracts working together:
BaseNFT.sol – Allows creators to mint base characters (e.g., heroes, avatars).
Trait.sol – Enables designers to mint NFT traits such as costumes, weapons, or accessories.
CompositeNFT.sol – Combines a BaseNFT with one or more Trait NFTs to form a new composite NFT with merged metadata and visual layers.
When users forge (compose) a new NFT:
The system locks the base and trait NFTs to prevent double use.
The new composite NFT inherits metadata from both.
Ownership and royalties are fairly split between original creators.

💡 Features
🎨 Dynamic Composition: Combine and detach NFTs in real-time.
🔗 Cross-Chain Bridging: Move and forge NFTs across multiple chains.
⚔️ Metadata Merging: Traits and characters automatically merge metadata for visuals and stats.
💰 Royalty Sharing: Original creators receive royalties from every composite NFT forged.
🧠 Open Creation Layer: Anyone can contribute base characters or traits for others to use.

🛠️ Tech Stack
Solidity (ERC-721A, ERC-2981, OpenZeppelin)
PushChain UI Kit (for cross-chain functionality)
Filebase / Supabase (for metadata storage)
Remix (for development & testing)
React + Ethers.js (frontend minting dApp)

💫 Innovation & Impact
Composable NFTs – Merge NFTs from multiple creators into one asset.
On-chain Collaboration – Reward creators each time their NFT or trait is used.
Dynamic Ownership Graph – Every composite NFT carries proof of origin for all contributors.
Cross-Creator Ecosystem – Encourages collaboration and layered creativity. 

🎨 Design & Vibes
The focus was on simplicity, flow, and vibe. The UI feels like dressing up a digital avatar — smooth, minimal, and fun — but every interaction is actually minting or merging NFTs on-chain. The experience feels playful, yet deeply technical underneath.

🧑‍🎨 Example Use Case
Alice uploads a base character NFT “CyberKnight.”
Bob mints a “Neon Armor” trait NFT.
Carol merges both using Forge Realm, creating a new “CyberKnight (Neon Armor)” NFT.
The metadata updates dynamically, showing the new appearance — all on-chain.

🌍 Impact
Forge Realm empowers creators and communities to:
Collaborate across NFT ecosystems.
Monetize creativity through composable ownership.
Evolve static digital art into living, modular assets.

🚀 Next Steps
Implement full cross-chain composition via PushChain.
Integrate on-chain rendering of composite NFTs.
Launch Forge Realm Creator Portal for artists and game developers.

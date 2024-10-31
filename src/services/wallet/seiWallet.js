const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const bip39 = require('bip39');
const { ethers } = require('ethers');

async function generateSeiWallet() {
    try {
        // 1. Generate mnemonic
        const mnemonic = bip39.generateMnemonic();
        
        // 2. Generate Sei address
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: "sei",
            hdPath: "m/44'/118'/0'/0/0"
        });
        const accounts = await wallet.getAccounts();
        const seiAddress = accounts[0].address;

        // 3. Generate EVM address
        const ethWallet = ethers.Wallet.fromPhrase(mnemonic);
        const evmAddress = ethWallet.address;

        // 4. Print all information
        console.log('\n=== New Wallet Generated ===');
        console.log('Sei Address:', seiAddress);
        console.log('EVM Address:', evmAddress);
        console.log('Mnemonic:', mnemonic);
        console.log('========================\n');

        return {
            seiAddress,
            evmAddress,
            mnemonic
        };
    } catch (error) {
        console.error('Error generating wallet:', error);
        throw error;
    }
}

// Make sure to export the function properly
export { generateSeiWallet };
// Or if you prefer CommonJS:
// module.exports = { generateSeiWallet };
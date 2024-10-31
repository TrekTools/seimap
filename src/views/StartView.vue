<script setup>
import { ref } from 'vue';
import { generateSeiWallet } from '@/services/wallet/seiWallet';

const wallet = ref(null);
const copyTooltip = ref('');
const tooltipTimeout = ref(null);
const showCompassInstructions = ref(false);
const showEvmInstructions = ref(false);

const generateWallet = async () => {
  try {
    wallet.value = await generateSeiWallet();
  } catch (error) {
    console.error('Failed to generate wallet:', error);
  }
};

const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text);
    
    // Clear any existing timeout
    if (tooltipTimeout.value) {
      clearTimeout(tooltipTimeout.value);
    }
    
    // Set the tooltip message
    copyTooltip.value = type;
    
    // Clear the tooltip after 2 seconds
    tooltipTimeout.value = setTimeout(() => {
      copyTooltip.value = '';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const handleCompassClick = () => {
  showCompassInstructions.value = true;
};

const handleEvmClick = () => {
  showEvmInstructions.value = true;
};
</script>

<template>
  <main class="start-view">
    <h1>Get Started</h1>
    
    <button
      @click="generateWallet"
      class="generate-btn"
    >
      Generate New Wallet
    </button>

    <div v-if="wallet" class="wallet-info">
      <h2>Your New Wallet</h2>
      
      <div class="wallet-details">
        <div class="detail-item">
          <label>Sei Address:</label>
          <div class="copy-wrapper">
            <p>{{ wallet.seiAddress }}</p>
            <button 
              @click="copyToClipboard(wallet.seiAddress, 'address')" 
              class="copy-btn"
            >
              📋
              <span 
                class="tooltip" 
                :class="{ 'show': copyTooltip === 'address' }"
              >
                Copied!
              </span>
            </button>
          </div>
        </div>
        
        <div class="detail-item">
          <label>Mnemonic:</label>
          <div class="copy-wrapper">
            <p>{{ wallet.mnemonic }}</p>
            <button 
              @click="copyToClipboard(wallet.mnemonic, 'mnemonic')" 
              class="copy-btn"
            >
              📋
              <span 
                class="tooltip" 
                :class="{ 'show': copyTooltip === 'mnemonic' }"
              >
                Copied!
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="wallet" class="mnemonic-warning">
      <h3>⚠️ Important Security Notice</h3>
      <p>Please write down your mnemonic phrase in a secure location like a notebook. 
         Never share it with anyone. This is your wallet's master key and cannot be recovered if lost.</p>
    </div>

    <div v-if="wallet" class="button-group">
      <a 
        href="https://compasswallet.io/download" 
        target="_blank" 
        class="compass-btn"
        @click="handleCompassClick"
      >
        <img src="https://compasswallet.io/images/logo.svg" alt="Compass" />
        Get Compass Wallet
      </a>
    </div>

    <div v-if="showCompassInstructions" class="instruction-box">
      <h3>⚡ Next Steps in Compass Wallet:</h3>
      <ol>
        <li>Click on the Wallet list</li>
        <li>Select "Import using recovery phrase"</li>
        <li>Paste your copied mnemonic</li>
      </ol>
    </div>

    <div v-if="wallet" class="button-group">
      <a 
        href="https://app.sei.io/" 
        target="_blank" 
        class="evm-btn"
        @click="handleEvmClick"
      >
        Link EVM address
      </a>
    </div>

    <div v-if="showEvmInstructions" class="instruction-box">
      <h3>🔗 Next Steps on app.sei.io:</h3>
      <ol>
        <li>Connect wallet</li>
        <li>Link EVM address</li>
        <li>Pass the Captcha</li>
      </ol>
    </div>
  </main>
</template>

<style scoped>
.start-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
}

.generate-btn, .compass-btn, .evm-btn {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  text-align: center;
}

.compass-btn img {
  height: 24px;
  width: auto;
}

.wallet-info {
  background-color: #1a365d;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 42rem;
  width: 100%;
  margin-bottom: 1rem;
}

.copy-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  color: white;
  position: relative;
}

.tooltip {
  position: absolute;
  background-color: #2ecc71;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
}

.tooltip.show {
  opacity: 1;
  visibility: visible;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: #2ecc71 transparent transparent transparent;
}

.copy-btn:hover {
  opacity: 0.8;
}

.mnemonic-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 42rem;
  width: 100%;
  margin-top: 1rem;
}

.mnemonic-warning h3 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.wallet-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.detail-item p {
  word-break: break-all;
}

.generate-btn {
  background-color: #3498db;
  width: 300px;
  margin-bottom: 2rem;
}

.compass-btn {
  background-color: #2ecc71;
}

.evm-btn {
  background-color: #9b59b6;
}

.generate-btn:hover, .compass-btn:hover, .evm-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

.instruction-box {
  background-color: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 42rem;
  width: 100%;
  margin-top: 1rem;
}

.instruction-box h3 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.instruction-box ol {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.instruction-box li {
  margin-bottom: 0.25rem;
}
</style> 
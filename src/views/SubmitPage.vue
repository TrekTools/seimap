<template>
  <div class="submit">
    <h1>Submit New Entry</h1>
    <div class="explanation">
      <p>Notice something missing from Seimap? Submit it here for review!</p>
      <p>Your contribution helps grow our community. Frequent, high-quality submissions will be recognized on our leaderboard.</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="siteName">Site Name: (you can paste in multiple at once)</label>
        <input type="text" id="siteName" v-model="formData.siteName" required>
      </div>
      <div class="form-group">
        <label for="category">Category: (you can paste in multiple at once)</label>
        <input type="text" id="category" v-model="formData.category" required>
      </div>
      <div class="form-group">
        <label for="productName">Product Name:(you can paste in multiple at once)</label>
        <input type="text" id="productName" v-model="formData.productName" required>
      </div>
      <div class="form-group">
        <label for="url">URL:(you can paste in multiple at once)</label>
        <input type="url" id="url" v-model="formData.url" required>
      </div>
      <div class="form-group">
        <label for="twitterHandle">Your Twitter Handle:</label>
        <input type="text" id="twitterHandle" v-model="formData.twitterHandle" required>
      </div>
      <div class="form-group">
        <label for="walletAddress">Your Wallet Address:</label>
        <input type="text" id="walletAddress" v-model="formData.walletAddress" required>
      </div>
      <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Submitting...' : 'Submit' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SubmitPage',
  data() {
    return {
      formData: {
        siteName: '',
        category: '',
        productName: '',
        url: '',
        twitterHandle: '',
        walletAddress: ''
      },
      isSubmitting: false
    }
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        await fetch('https://script.google.com/macros/s/AKfycbwfPEVrIAUYTLg5pXpdLAg54fLv-0ePdZbZKOM7f4Xx6mbCn-2S9N0M5CNH-VlPnHLQ/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData)
        });

        // Reset form after successful submission
        this.formData = {
          siteName: '',
          category: '',
          productName: '',
          url: '',
          twitterHandle: '',
          walletAddress: ''
        };
        alert('Form submitted successfully! Your suggestion will be reviewed in the coming days.');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.submit {
  padding: 20px;
}

form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #4a6f9e;
  border-radius: 4px;
  background-color: #2c4a6e;
  color: white;
}

button {
  background-color: #4a6f9e;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #5a7fae;
}

.explanation {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #2c4a6e;
  border-radius: 4px;
}

.explanation p {
  margin: 0 0 10px 0;
  color: #dae1e9;
}

.explanation p:last-child {
  margin-bottom: 0;
}
</style>

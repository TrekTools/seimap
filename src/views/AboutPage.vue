<template>
  <div class="about">
    <h1>About Seimap</h1>
    
    <section>
      <h2>The App</h2>
      <p>
        Seimap is a comprehensive index for the Sei ecosystem. Our mission is to provide a centralized hub where users can discover and explore the vast array of projects, tools, and resources within the Sei network. From DeFi protocols to gaming platforms, Seimap aims to be your go-to directory for all things Sei.
      </p>
      <p>
        Seimap is the first foundational piece of TREK 2.0 - the premier project by ark7.
      </p>
    </section>

    <section>
      <h2>The Developer</h2>
      <p>
        Seimap was created by ark7, a passionate developer and enthusiast of the Sei ecosystem. With a vision to foster growth and accessibility within the community, ark7 developed Seimap as a tool to help both newcomers and seasoned users navigate the expanding Sei landscape.
      </p>
      <div class="social-links">
        <a href="https://x.com/ark7dev" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">🐦</span>
          Twitter: @ark7dev
        </a>
        <a href="https://t.co/aCI8jZr4T3" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">💬</span>
          Discord: ark7
        </a>
      </div>
    </section>

    <section>
      <h2>Community Appeal</h2>
      <p>
        Seimap thrives on community contributions. We encourage all members of the Sei ecosystem to submit links they find useful. Whether it's permanent Discord channels, innovative DeFi protocols, essential tools, exciting games, or any other valuable resources, your submissions help make Seimap a more comprehensive and valuable tool for everyone. Together, we can build the most robust index of the Sei ecosystem and foster a more connected and informed community.
      </p>
      <router-link to="/submit" class="submit-button">Submit here</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #ffffff;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #dae1e9;
}

h2 {
  font-size: 1.8em;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #dae1e9;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}

section {
  background-color: #2c4a6e;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 1em;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  opacity: 0.8;
}

.social-icon {
  font-size: 24px;
  margin-right: 10px;
}

.submit-button {
  display: inline-block;
  background-color: #4a6f9e;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.submit-button:hover {
  background-color: #5a7fae;
}
</style>
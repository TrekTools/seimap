<template>
  <div class="app-container">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">
        <span class="world-emoji">🌎</span> Seimap
      </router-link>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/start" class="nav-link">Start</router-link>
        <router-link to="/submit" class="nav-link">Submit</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/map" class="nav-link">The Map</router-link>
        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
        <router-link to="/seipex" class="nav-link">Seipex</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #1e3a5f;
  color: white;
  font-family: Arial, sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.navbar {
  background-color: #2c4a6e;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.world-emoji {
  font-size: 1.2em;
  margin-right: 8px;
}

.navbar-links {
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #4a6f9e;
}

.nav-link.router-link-active {
  background-color: #4a6f9e;
  font-weight: bold;
}
</style>

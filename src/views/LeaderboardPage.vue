<template>
  <div class="leaderboard-container">
    <h1>Leaderboard</h1>
    
      <p>
        This leaderboard tracks contributors who submit the most useful links through our Submit page. 
        A prize pool of 500 $SEI will be distributed among the top contributors who deliver quality links 
        that help grow the Sei ecosystem. Submit your links today to climb the rankings!
      </p>
    
      <div class="requirements-container">
        <div class="requirements-column">
          <h3>What We Need:</h3>
          <ul>
            <li>App Links</li>
            <li>Games</li>
            <li>DeFi</li>
            <li>Bridges</li>
            <li>Wallets</li>
            <li>Permanent Discord Links</li>
            <li>Permanent Telegram Links</li>
          </ul>
        </div>
        
        <div class="requirements-column">
          <h3>What We Don't Need:</h3>
          <ul>
            <li>Twitter Links</li>
            <li>Temporary Discord Links</li>
            <li>Links to Cointrackers (DexScreener, CMC, etc)</li>
            <li>CEXes</li>
          </ul>
        </div>
      </div>

    <div class="table-container">
      <table v-if="leaderboardItems">
        <thead>
          <tr>
            <th>Name</th>
            <th>Links Committed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contributor, index) in leaderboardItems" :key="index">
            <td>
              <a :href="`https://twitter.com/${contributor.name}`" target="_blank" class="twitter-link">
                {{ contributor.name }}
              </a>
            </td>
            <td>{{ contributor.links_committed }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const LEADERBOARD_QUERY = gql`
  query leaderboard {
    seimap_leaderboard {
      name
      links_committed
    }
  }
`;

export default {
  name: 'LeaderboardPage',
  setup() {
    const leaderboardItems = ref([]);

    const { result, loading, error } = useQuery(LEADERBOARD_QUERY, null, {
      context: {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'Be2cesbIqjiax9c2LR2PMdd3R5CVBjtDagd8zC1P4w0plkwtwzECAHMvTFEBk78A'
        }
      }
    });

    watchEffect(() => {
      if (result.value) {
        leaderboardItems.value = result.value.seimap_leaderboard;
      }
    });

    return {
      leaderboardItems,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.leaderboard-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
}

.table-container {
  background-color: #2c4a6e;
  border-radius: 8px;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #4a6f9e;
}

th {
  font-weight: bold;
  color: #a0b4cc;
}

tr:last-child td {
  border-bottom: none;
}

.loading {
  text-align: center;
  color: white;
  padding: 20px;
}

.error {
  text-align: center;
  color: red;
  padding: 20px;
}

.twitter-link {
  color: #1DA1F2;  /* Twitter blue */
  text-decoration: none;
}

.twitter-link:hover {
  text-decoration: underline;
}

.leaderboard-description {
  color: white;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.requirements-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  text-align: left;
}

.requirements-column {
  flex: 1;
  max-width: 300px;
}

.requirements-column h3 {
  color: #a0b4cc;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.requirements-column ul {
  list-style-type: none;
  padding: 0;
}

.requirements-column li {
  margin-bottom: 8px;
  color: white;
}

.requirements-column:first-child li::before {
  content: "✓ ";
  color: #4CAF50;
}

.requirements-column:last-child li::before {
  content: "✗ ";
  color: #f44336;
}
</style> 
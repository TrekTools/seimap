<template>
  <div class="seipex-container">
    <h1>Seipex Token Explorer</h1>
    
    <section class="intro-section">
      <p>
        Explore and analyze meme tokens available on <a href="https://seipex.fi" target="_blank">Seipex Finance</a>.
      </p>
    </section>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <div class="summary-cards">
        <div class="summary-card">
          <h3>Total Tokens</h3>
          <p class="card-value">{{ tokenItems.length }}</p>
        </div>
        <div class="summary-card">
          <h3>Total Liquidity</h3>
          <p class="card-value">${{ formatNumber(totalLiquidity) }}</p>
        </div>
        <div class="summary-card">
          <h3>Total Market Cap</h3>
          <p class="card-value">${{ formatNumber(totalMarketCap) }}</p>
        </div>
        <div class="summary-card">
          <h3>Total Holders</h3>
          <p class="card-value">{{ formatNumber(totalHolders) }}</p>
        </div>
        <div class="summary-card">
          <h3>Migrated Tokens</h3>
          <p class="card-value">{{ migratedCount }}</p>
        </div>
      </div>

      <TokenCreationChart :tokens="tokenItems" />

      <div class="table-container">
        <div class="controls">
          <div class="control-group">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search tokens..."
              class="search-input"
            >
            <label class="filter-toggle">
              <input type="checkbox" v-model="hideNonMigrated">
              Hide Non-Migrated Tokens
            </label>
          </div>
          <p>Total Items: {{ filteredAndSearchedItems?.length || 0 }}</p>
        </div>

        <table class="token-table">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.key" @click="sort(header.key)" :class="{ sortable: header.sortable }">
                {{ header.title }}
                <span v-if="header.sortable" class="sort-icon">
                  {{ sortKey === header.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedFilteredAndSearchedItems" :key="item.address">
              <td>{{ item.name }}</td>
              <td>{{ item.symbol }}</td>
              <td>${{ Number(item.marketCap_usd || 0).toLocaleString() }}</td>
              <td>${{ Number(item.liquidity_usd || 0).toLocaleString() }}</td>
              <td>{{ Number(item.holderCount || 0).toLocaleString() }}</td>
              <td>{{ item.top10HoldersPercentage }}%</td>
              <td>{{ item.creationTimestamp ? new Date(item.creationTimestamp).toLocaleDateString() : '-' }}</td>
              <td>{{ item.creator || '-' }}</td>
              <td>{{ item.decimals || '-' }}</td>
              <td>{{ Number(item.liquidity_sei || 0).toLocaleString() }}</td>
              <td>{{ Number(item.liquidity_starting || 0).toLocaleString() }}</td>
              <td>{{ Number(item.marketCap_sei || 0).toLocaleString() }}</td>
              <td>{{ item.migrated ? 'Yes' : 'No' }}</td>
              <td>{{ item.progress || '-' }}</td>
              <td>{{ item.social_description || '-' }}</td>
              <td>
                <div class="social-links">
                  <a v-if="item.social_discord" :href="item.social_discord" target="_blank">Discord</a>
                  <a v-if="item.social_telegram" :href="item.social_telegram" target="_blank">Telegram</a>
                  <a v-if="item.social_twitter" :href="item.social_twitter" target="_blank">Twitter</a>
                  <a v-if="item.social_website" :href="item.social_website" target="_blank">Website</a>
                </div>
              </td>
              <td>{{ Number(item.totalSupply || 0).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watchEffect, defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import TokenCreationChart from '@/components/TokenCreationChart.vue'

const SEIPEX_QUERY = gql`
  query MyQuery {
    seipex_tokens {
      address
      name
      symbol
      marketCap_usd
      liquidity_usd
      holderCount
      top10HoldersPercentage
      creationTimestamp
      creator
      decimals
      liquidity_sei
      liquidity_starting
      marketCap_sei
      migrated
      progress
      social_description
      social_discord
      social_telegram
      social_twitter
      social_website
      totalSupply
    }
  }
`;

export default defineComponent({
  name: 'SeipexPage',
  components: {
    TokenCreationChart
  },
  setup() {
    const tokenItems = ref([]);
    const sortKey = ref('marketCap_usd');
    const sortOrder = ref('desc');
    const hideNonMigrated = ref(false);
    const searchQuery = ref('');

    // Temporary debug logs
    console.log('All env vars:', process.env);
    console.log('Hasura secret:', process.env.VUE_APP_HASURA_ADMIN_SECRET);

    const { result, loading, error } = useQuery(SEIPEX_QUERY, null, {
      context: {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.VUE_APP_HASURA_ADMIN_SECRET
        }
      }
    });

    watchEffect(() => {
      if (result.value?.seipex_tokens) {
        tokenItems.value = result.value.seipex_tokens;
      }
    });

    const headers = [
      { title: 'Name', key: 'name', sortable: true },
      { title: 'Symbol', key: 'symbol', sortable: true },
      { title: 'Market Cap (USD)', key: 'marketCap_usd', sortable: true },
      { title: 'Liquidity (USD)', key: 'liquidity_usd', sortable: true },
      { title: 'Holders', key: 'holderCount', sortable: true },
      { title: 'Top 10 Holders %', key: 'top10HoldersPercentage', sortable: true },
      { title: 'Creation Date', key: 'creationTimestamp', sortable: true },
      { title: 'Creator', key: 'creator', sortable: true },
      { title: 'Decimals', key: 'decimals', sortable: true },
      { title: 'Liquidity (SEI)', key: 'liquidity_sei', sortable: true },
      { title: 'Starting Liquidity', key: 'liquidity_starting', sortable: true },
      { title: 'Market Cap (SEI)', key: 'marketCap_sei', sortable: true },
      { title: 'Migrated', key: 'migrated', sortable: true },
      { title: 'Progress', key: 'progress', sortable: true },
      { title: 'Description', key: 'social_description', sortable: false },
      { title: 'Social Links', key: 'social_links', sortable: false },
      { title: 'Total Supply', key: 'totalSupply', sortable: true },
    ];

    const filteredAndSearchedItems = computed(() => {
      if (!tokenItems.value) return [];
      
      let items = tokenItems.value;
      
      // Apply migration filter
      if (hideNonMigrated.value) {
        items = items.filter(item => item.migrated);
      }
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        items = items.filter(item => 
          (item.name?.toLowerCase().includes(query)) ||
          (item.symbol?.toLowerCase().includes(query)) ||
          (item.creator?.toLowerCase().includes(query))
        );
      }
      
      return items;
    });

    const sortedFilteredAndSearchedItems = computed(() => {
      if (!filteredAndSearchedItems.value) return [];
      return [...filteredAndSearchedItems.value].map(item => ({
        ...item,
        // Convert Unix timestamp to formatted date
        creationTimestamp: item.creationTimestamp 
          ? new Date(item.creationTimestamp * 1000).toLocaleDateString()
          : '-'
      })).sort((a, b) => {
        let aVal = a[sortKey.value];
        let bVal = b[sortKey.value];

        // Special handling for sorting dates
        if (sortKey.value === 'creationTimestamp' && aVal !== '-' && bVal !== '-') {
          // Convert back to timestamp for sorting
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }
        // Handle numerical values
        else if (typeof aVal === 'string' && !isNaN(aVal)) {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }

        // Handle null/undefined values
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
      });
    });

    const sort = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
    };

    const totalLiquidity = computed(() => {
      if (!tokenItems.value) return 0;
      return tokenItems.value.reduce((sum, token) => {
        return sum + (Number(token.liquidity_usd) || 0);
      }, 0);
    });

    const totalMarketCap = computed(() => {
      if (!tokenItems.value) return 0;
      return tokenItems.value.reduce((sum, token) => {
        return sum + (Number(token.marketCap_usd) || 0);
      }, 0);
    });

    const totalHolders = computed(() => {
      if (!tokenItems.value) return 0;
      return tokenItems.value.reduce((sum, token) => {
        return sum + (Number(token.holderCount) || 0);
      }, 0);
    });
    
    const migratedCount = computed(() => {
      if (!tokenItems.value) return 0;
      return tokenItems.value.filter(token => token.migrated).length;
    });

    const formatNumber = (value) => {
      if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
      }
      if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
      }
      if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
      }
      return value.toLocaleString();
    };

    return {
      tokenItems,
      loading,
      error,
      headers,
      sort,
      sortKey,
      sortOrder,
      hideNonMigrated,
      searchQuery,
      filteredAndSearchedItems,
      sortedFilteredAndSearchedItems,
      totalLiquidity,
      totalMarketCap,
      totalHolders,
      migratedCount,
      formatNumber
    }
  }
});
</script>

<style scoped>
.seipex-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.intro-section {
  color: white;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.table-container {
  background: #336494;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  max-width: 100%;
}

.token-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #465f79;
}

.token-table th,
.token-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.token-table th {
  background-color: #336494;
  font-weight: bold;
  position: sticky;
  top: 0;
}

.token-table tr:nth-child(even) {
  background-color: #336494;
}

.token-table tr:hover {
  background-color: #075fe4;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
}

.social-links {
  display: flex;
  gap: 8px;
}

.social-links a {
  color: #a5e9f1;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(13, 110, 253, 0.1);
}

.social-links a:hover {
  background-color: rgba(13, 110, 253, 0.2);
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: #d1d9e6;
}

.sort-icon {
  margin-left: 5px;
  font-size: 0.8em;
}

th {
  white-space: nowrap;  /* Prevent header text from wrapping */
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
  background-color: rgba(255, 255, 255, 0.9);
}

.search-input:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  cursor: pointer;
}

.filter-toggle input {
  cursor: pointer;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.summary-card {
  background: #336494;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-card h3 {
  color: #a5e9f1;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
}

.card-value {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

/* Make cards responsive */
@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .summary-cards {
    grid-template-columns: 1fr;
  }
}
</style> 
<template>
  <div class="seimap-table">
    <h1></h1>
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        @input="filterData"
        placeholder="Search..."
        class="search-input"
      />
    </div>
    <table v-if="filteredSeimapData.length">
      <thead>
        <tr>
          <th>Logo</th>
          <th>Site Name</th>
          <th>Category</th>
          <th>Product Name</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredSeimapData" :key="index">
          <td><img :src="item.logo" :alt="item.site_name + ' logo'" class="logo-image"></td>
          <td>{{ item.site_name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.product_name }}</td>
          <td><a :href="item.url" target="_blank" rel="noopener noreferrer">Link</a></td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="seimapData.length === 0">Loading data...</p>
    <p v-else>No results found</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SeimapTable',
  data() {
    return {
      seimapData: [],
      filteredSeimapData: [],
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchSeimapData();
  },
  methods: {
    async fetchSeimapData() {
      try {
        const response = await axios.post(
          'https://select-oyster-59.hasura.app/v1/graphql',
          {
            query: `
              query seimap_details {
                seimap {
                  site_name
                  category
                  product_name
                  url
                  logo
                  all_text
                }
              }
            `
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-hasura-admin-secret': process.env.VUE_APP_HASURA_ADMIN_SECRET
            }
          }
        );

        this.seimapData = response.data.data.seimap;
        this.filteredSeimapData = this.seimapData;
      } catch (error) {
        console.error('Error fetching seimap data:', error);
      }
    },
    filterData() {
      const queryWords = this.searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 0);
      
      this.filteredSeimapData = this.seimapData.filter(item => {
        const itemString = Object.values(item).join(' ').toLowerCase();
        return queryWords.every(word => itemString.includes(word));
      });
    }
  }
}
</script>

<style scoped>
.seimap-table {
  margin-top: 20px;
}

h1 {
  color: white;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th, td {
  border: 1px solid #4a6f9e;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #2c4a6e;
  color: whitesmoke;
  font-weight: bold;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #4a6f9e;
  border-radius: 4px;
  background-color: #2c4a6e;
  color: white;
}

.search-input::placeholder {
  color: #a0b4cc;
}

p {
  color: white;
}

.logo-image {
  max-width: 50px;
  max-height: 50px;
}

a {
  color: #a0b4cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
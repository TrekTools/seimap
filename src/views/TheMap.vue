<template>
  <div class="map-container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      
      <div v-for="category in categoryOrder" :key="category" class="category-row">
        <h2 class="category-title">{{ category }}</h2>
        <div class="items-container">
          <div v-for="(item, index) in itemsByCategory[category]" :key="index" 
               :style="itemStyle(item)" 
               class="map-item"
               @click="handleItemClick(item)">
            <img :src="item.logo" :alt="item.site_name" class="item-logo" />
            <h3>{{ item.site_name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const SEIMAP_QUERY = gql`
  query seimap_actual {
    seimap_themap {
      site_name
      category
      url
      logo
    }
  }
`;

export default {
  name: 'TheMap',
  setup() {
    const mapItems = ref([]);
    const categoryOrder = ['NFTs', 'DeFi', 'Tools', 'Gaming'];

    const { result, loading, error } = useQuery(SEIMAP_QUERY, null, {
      context: {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.VUE_APP_HASURA_ADMIN_SECRET
        }
      }
    });

    // Debug logs
    console.log('Initial mapItems:', mapItems.value);
    console.log('Query result:', result.value);

    const categoryColors = {
      'NFTs': '#DDA111',
      'DeFi': '#118811',
      'Tools': '#8787CC',
      'Gaming': '#AA55A8'
    };

    watchEffect(() => {
      console.log('watchEffect triggered');
      console.log('Result value:', result.value);
      
      if (result.value?.seimap_themap) {
        console.log('Found seimap_themap data:', result.value.seimap_themap);
        mapItems.value = result.value.seimap_themap.map(item => ({
          ...item,
          color: categoryColors[item.category] || '#D3D3D3'
        }));
        console.log('Updated mapItems:', mapItems.value);
      }
    });

    const itemsByCategory = computed(() => {
      console.log('Computing itemsByCategory with mapItems:', mapItems.value);
      const grouped = {};
      categoryOrder.forEach(category => {
        grouped[category] = mapItems.value.filter(item => item.category === category);
        console.log(`Category ${category}:`, grouped[category]);
      });
      return grouped;
    });

    const itemStyle = (item) => {
      return {
        backgroundColor: item.color,
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }
    };

    const handleItemClick = (item) => {
      window.open(item.url, '_blank');
    };

    return {
      categoryOrder,
      itemsByCategory,
      itemStyle,
      handleItemClick,
      loading,
      error,
      mapItems
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  background-color: #1e3a5f;
  overflow-y: auto;
  padding: 20px;
}

.category-row {
  margin-bottom: 30px;
}

.category-title {
  color: white;
  margin-bottom: 10px;
}

.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.map-item {
  flex: 0 0 200px;
  color: #333; /* Darker text color for better contrast */
  transition: all 0.3s ease;
}

.map-item:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.item-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 50%;
  object-fit: cover;
}

h3 {
  margin: 0;
  font-size: 1em;
}
</style>
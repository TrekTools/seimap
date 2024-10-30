<template>
  <div class="home">
    <div class="logo-container">
      <img src="https://cdn.prod.website-files.com/65cb43fecf24523357feada3/65cb43fecf24523357feadb3_Sei_Logotype_Red.webp" alt="Sei Logo" class="sei-logo">
    </div>
    <div class="visitor-counter">
      Visitors: {{ visitorCount }}
    </div>
    <div class="content-container">
      <div class="table-container">
        <SeimapTable />
      </div>
      <div class="cards-container">
        <a 
          v-for="(card, index) in cards" 
          :key="index" 
          :href="card.link" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="card"
        >
          <img :src="card.image" :alt="card.title" class="card-image">
          <div class="card-content">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SeimapTable from '@/components/SeimapTable.vue'
import { ref, onMounted } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const GET_VISITOR_COUNT = gql`
  query GetVisitorCount {
    visitor_stats(limit: 1) {
      count
    }
  }
`

const UPDATE_VISITOR_COUNT = gql`
  mutation UpdateVisitorCount($id: Int!, $count: Int!) {
    update_visitor_stats_by_pk(
      pk_columns: { id: $id },
      _set: { count: $count }
    ) {
      count
    }
  }
`

export default {
  name: 'HomePage',
  components: {
    SeimapTable
  },
  setup() {
    const visitorCount = ref(0)
    const { result } = useQuery(GET_VISITOR_COUNT)
    const { mutate: updateCount } = useMutation(UPDATE_VISITOR_COUNT)

    onMounted(async () => {
      if (result.value && result.value.visitor_stats[0]) {
        const currentCount = result.value.visitor_stats[0].count
        visitorCount.value = currentCount

        // Increment the count
        try {
          await updateCount({
            id: 1, // Assuming you have a single record with id: 1
            count: currentCount + 1
          })
          visitorCount.value = currentCount + 1
        } catch (error) {
          console.error('Error updating visitor count:', error)
        }
      }
    })

    return {
      visitorCount
    }
  },
  data() {
    return {
      searchQuery: '',
      showTable: false,
      cards: [
        { 
          title: 'Seipex Finance', 
          description: 'The home of meme coins on Sei', 
          image: 'https://seipex.fi/logo.svg',
          link: 'https://seipex.fi'
        },
        { 
          title: 'Massdrop', 
          description: 'Cmdr. Shepard\'s favourite app', 
          image: 'https://www.massdrop.app/images/massdrop.png',
          link: 'https://massdrop.app'
        },
        { 
          title: '$HAPE', 
          description: 'Just a happy little ape coin', 
          image: 'https://i.seipex.fi/upload/w_100,q_90/https://hapecoin.s3.eu-west-3.amazonaws.com/closeup.png',
          link: 'https://dragonswap.app/swap?inputCurrency=SEI&outputCurrency=0x490736a46aaBa689Db5265510B5C53aF4c23DEd4'
        },
        { 
          title: 'Chronicles of Kryme', 
          description: 'Blog of Sei\'s #1 BS-fighter', 
          image: 'https://cdn.discordapp.com/attachments/1294239583659364363/1299065924036333619/Head.png?ex=671bd8eb&is=671a876b&hm=2130f6d7684887be3cca6a85177ea6b083a427a2e2421a3fe5dcbe8ef3077221&',
          link: 'https://medium.com/@craftycanines'
        },
        { 
          title: 'The Unfrgtn', 
          description: 'Your elite discord verification bot', 
          image: 'https://hub.xyz/_next/image?url=https%3A%2F%2Fhub-space-production.fra1.digitaloceanspaces.com%2Fuploads%2Flt9iqkmg3fp-1729387406453&w=1920&q=75',
          link: 'https://hub.xyz/theunfrgtn'
        },
        { 
          title: 'TREK', 
          description: 'Your personal analytics platform', 
          image: 'https://pbs.twimg.com/profile_images/1772245930470674432/h1oLMdg9_400x400.jpg',
          link: 'https://trek.vision'
        },
      ]
    }
  },
  methods: {
    handleSearch() {
      this.showTable = this.searchQuery.length > 0
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: 30px;
  text-align: center;
}

.sei-logo {
  max-width: 200px;
  height: auto;
}

.content-container {
  display: flex;
  width: 100%;
  gap: 20px;
}

.table-container {
  flex: 2;
}

.cards-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  background-color: #2c4a6e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.card h3 {
  margin-top: 0;
  color: #dae1e9;
}

.card p {
  margin-bottom: 0;
  color: #ffffff;
  font-size: 0.9em;
}

@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
  }

  .cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .card {
    width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #4a6f9e;
  border-radius: 4px;
  background-color: #2c4a6e;
  color: white;
}

.placeholder-message {
  text-align: center;
  color: #dae1e9;
  font-size: 6em;
  padding: 2rem;
  background-color: #2c4a6e;
  border-radius: 8px;
  margin-top: 1rem;
}

.visitor-counter {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(44, 74, 110, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-size: 0.9em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

import { createApp, provide, h } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const httpLink = createHttpLink({
  uri: 'https://select-oyster-59.hasura.app/v1/graphql',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.use(vuetify)
app.use(VueGtag, {
  config: { id: 'G-CZPGCR9QP4' }  // Replace with your Measurement ID
})

app.mount('#app')

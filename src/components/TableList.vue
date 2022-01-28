<template>
  <v-card class="mx-auto pa-6" >
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="tableHeader"
      :items="tableData"
      :search="search"
    >
    
    <template v-slot:item.state="{ item }">
      <v-chip
        :color="getColor(item.state)"
        dark
      >
        {{ item.state }}
      </v-chip>
    </template>

    <template v-slot:item.control="{ item }">
      <router-link :to="{ name: 'Product', params: {orderId: item.id}}">
        <v-btn
          class="ma-2"
          text
          icon
          color="blue lighten-2"
        >
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </router-link>
    </template>
    </v-data-table>
  </v-card>
</template>

<script> 
  export default {
    
    props:{
      tableData:[],
      tableHeader:[]
    },
    data () {
      return {
        search: '',
      }
    },
    methods: {
      getColor (state) {
        if (state == 'Nouvelle') return 'blue'
        else if (state == 'En Traitement') return 'orange'
        else return 'green'
      },
    },
  }
</script>
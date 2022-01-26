<template>
  <v-card>
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
      <template slot="">
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
    }
  }
</script>
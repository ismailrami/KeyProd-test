<template>
      <v-row class="pa-2">
        <v-col cols=4 class="ml-2">
          <product-list
          :products="products"  />
        </v-col>
        <v-col>
          <div style="position: sticky; top: 60px">
          <v-row >
            <v-col >
              <product-card />
            </v-col>
          </v-row>
          <v-row>
            <v-col >
              <colis-card />
            </v-col>
          </v-row>
          </div>
        </v-col>
      </v-row>
</template>

<script>
import axios from 'axios';
import ProductList from './ProductList.vue';
import ProductCard from './ProductCard.vue';
import ColisCard from './ColisCard.vue';
  export default {
  components: { ProductList, ProductCard, ColisCard},
    
    data () {
      return {
        products:[]
      }
    },
    async created(){
      try { 
        const res = await axios.get('http://localhost:5600/Orders/'+ this.$route.params.orderId +'/Products');
        this.products = res.data;
      } catch (e) {
        console.log(e);
      }
    }
   
  }
</script>

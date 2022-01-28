<template>
  <v-card>
    <v-card-title>Décopage de Colis</v-card-title>
  

    <v-card-subtitle class="pb-0">
      Distribuer les produits sur les colis convenable.
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <v-data-table
          :headers="header"
          :items="colis"
          :single-expand="true"
          item-key="name"
          show-expand
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-list dense v-if="item.products.length >0">
                <v-subheader>Produits</v-subheader>
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(it, i) in item.products"
                    :key="i"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="it.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <div v-else>
                <p> Pas de produit affecter a ce type de colis</p>
              </div>
            </td>
          </template>
         
        </v-data-table>
      </v-card-text>
  </v-card>
</template>

<script>
  import axios from "axios";  
  export default {
    
    data () {
      return {
        colis : [],
        header: [
          {text:'Type', value:'name'},
          {text:'Poids', value:'weight'},
        ]
      }
    },
    async created(){
      const res = await axios.get("http://localhost:5600/colis");
      this.colis = res.data; 
      this.$root.$emit('colisList',this.colis);
      console.log(this.$route.params.orderId)
      const resProd = await axios.get("http://localhost:5600/Orders/" + this.$route.params.orderId + '/Products');
      const products  =  resProd.data;
      
      products.forEach(element => {
        console.log(element);
        if(element.ColisId != 0) {
          this.colis[element.ColisId -1 ].products.push(element);
        }
      });

    },
    methods: {
      add(item) {
        console.log(item)
      },
    }
  }
</script>
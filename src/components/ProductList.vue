<template>
      <v-row dense>
        <v-col
          v-for="(item, i) in products"
          :key="i"
          cols="12"
        >
          <v-hover>
            <template v-slot:default="{ hover }" >
          <v-card
            :class="`elevation-${hover ? 24 : 6}`"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div v-if="item.is_scanned" class="text-overline green--text mb-4">
                  Produit ajoutée
                </div>
                <div v-else class="text-overline mb-4 red--text" >
                  Produit manquant
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{item.name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{item.referance}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                v-if="item.is_scanned"
                tile
                size="36"
              >
                <v-icon
                  large
                  color="green darken-2"
                >
                  mdi-check
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar
                v-else
                tile
              >
                <v-icon
                  large
                  color="red darken-2"
                >
                  mdi-close-thick
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>    
                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="showDetail(item)"
                  >
                    Affiche détails
                  </v-btn>
                </v-card-actions>
             
          </v-card>
          </template>
         </v-hover>
        </v-col>
      </v-row>
</template>

<script>
  export default {
    props:{
        products:[],
    },
    data () {
      return {
      }
    },
    async created(){
    },
    methods:{
      showDetail(item){
        this.$root.$emit('detail_product',item,true);
      }
    }
   
  }
</script>
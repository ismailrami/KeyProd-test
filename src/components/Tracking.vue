<template>
<div>
  <v-container>
    <v-row no-gutters>
      <v-col 
        md="6"
        offset-md="3">
      <v-autocomplete
          v-model="selected"
          :items="ordersNumber"
          chips
          label="Numéro de commande"
          full-width
          hide-details
          hide-no-data
          hide-selected
          single-line
          @change="trackOrder()"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="selected">
      <v-col md="10"
         offset-md="1">

      <v-stepper v-model="state">
        <v-stepper-header>
          <v-stepper-step
            :complete="state > 1"
            step="1"
          >
            Récue
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="state > 2"
            step="2"
          >
            En Traitement
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">
            Expidiée
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title>
                <p class="text-h3 text--primary">
                  {{order.number}}
                </p>
              </v-card-title>
              <v-card-text>
                  <div>Récu</div>
                  <p class="text-h4 text--primary">
                     Commande récu le {{order.date_arrival}}
                  </p>
                  <p>Noter</p>
                  <div class="text--primary">
                    Commande recu par notre equipe.<br>
                    Elle sera traité le plus tôt possible 
                  </div>
                </v-card-text>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-title>
                <p class="text-h3 text--primary">
                  {{order.number}}
                </p>
              </v-card-title>
              <v-card-text>
                  <div>En Traitement</div>
                  <p class="text-h4 text--primary">
                    Date de mise à jour {{order.date_trait}}
                  </p>
                  <p>Noter</p>
                  <div class="text--primary">
                    Commande en traitement par notre equipe.<br>
                    Nos personnel s'occupe de votre commande.
                  </div>
                </v-card-text>
            </v-card>            
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card>
              <v-card-title>
                <p class="text-h3 text--primary">
                  {{order.number}}
                </p>
              </v-card-title>
              <v-card-text>
                  <div>Expidiée</div>
                  <p class="text-h4 text--primary">
                    Date de mise à jour {{order.date_send}}
                  </p>
                  <p>Noter</p>
                  <div class="text--primary">
                    Commande confieé à notre partenaire.<br>
                    Elle sera livrée dans les jours qui viennent.
                  </div>
                </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
  
</div>
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      selected :'',
      orders: [],
      order: {},
      ordersNumber: [],
      state: 1
      }

  },
  async created(){
    try { 
      const res = await axios.get('http://localhost:5600/Orders');
      this.orders = res.data;
      this.orders.forEach(order => {
        this.ordersNumber.push(order.number);
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async trackOrder() {
      const res = await axios.get('http://localhost:5600/Orders?number_like='+this.selected);
      this.order = res.data[0];
      switch (this.order.state) {
        case "Nouvelle":
          this.state = 1
          break;
        case "En Traitement":
          this.state = 2
          break;
        case "Expédiee":
          this.state = 3
          break;
      
        default:
          break;
      }
      
    }
  }
}
 
</script>
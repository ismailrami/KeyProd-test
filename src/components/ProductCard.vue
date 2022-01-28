<template>
  <v-card
    v-if="isActive"
  >
      <v-card-title>{{product.name}}</v-card-title>
    <v-card-subtitle class="pb-0">
      Ref°: {{product.referance}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Poids: {{product.weight}} g</div>
      <div><h3>Déscription:</h3>{{product.description}}</div>
    </v-card-text>
    <v-card-actions>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!product.is_scanned"
          v-bind="attrs"
          v-on="on"
          color="blue"
          text
        >
          Scanner
        </v-btn>
        <v-btn
          v-else
          color="blue"
          disabled
          text
        >
          Scanner
        </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Scanner le QRcode de produit!</v-toolbar>
            <v-card-text>
              <qrcode-stream @decode="onDecode" @init="checkInit"></qrcode-stream>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
       <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-if="product.is_scanned"
          color="blue"
          text
          v-bind="attrs"
          v-on="on"
        >
          Affecter a un colis
        </v-btn>
        <v-btn
          v-else
          color="blue"
          text
          disabled
          v-bind="product"
          v-on="on"
        >
          Affecter a un colis
        </v-btn>
      </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Choisir un Colis</v-toolbar>
            <v-card-text>
             <v-select
                v-model="product.ColisId"
                :items="colis"
                menu-props="auto"
                label="Select"
                item-value="id"
                item-text="name"
                hide-details
                prepend-icon="mdi-map"
                single-line
              ></v-select>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="affectColis"
              >Affecter</v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import axios from 'axios'
  export default {
    components: { 
      QrcodeStream
      },
    data () {
      return {
        product: '',
        isActive: false,
        result: '',
        colis: [],
        selectedColis: ''
      }
    },
    created(){
    },
    mounted() {
        this.$root.$on('detail_product', (product, isActive) => {
            this.product = product;
            this.isActive = isActive
        });
        this.$root.$on('colisList', (colis) => {
          this.colis = colis;
        })
    },
    methods: {
      onDecode (result) {
        this.result = result
        if(result == this.product.referance){
          this.product.is_scanned = true;
          this.postData;
        }
      },
      async postData() {
        const res = await axios.patch('http://localhost:5600/Products/'+ this.product.id, {is_scanned: true})
        console.log((await res).status);
      },

      async checkInit(promise){
        try {
          await promise
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permission"
          } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
          } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
          } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
          } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
          } else if (error.name === 'InsecureContextError') {
            this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
          } else {
            this.error = `ERROR: Camera error (${error.name})`;
          }
        }
      },
      async affectColis(){
        const res = await axios.patch('http://localhost:5600/Products/' + this.product.id, this.product );
        console.log((await res).status);
      }

    }
  }
</script>
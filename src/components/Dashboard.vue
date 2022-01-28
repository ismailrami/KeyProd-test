<template>
  <div>
    <TableList :tableData="orders" :tableHeader="orderHeader"  pa-10></TableList>
  </div>
</template>

<script>
  import axios from "axios"; 
  import TableList from '../components/TableList';
  export default {
    components:{
      TableList,
    },
    data() {
      return {
        orders: [],
        orderHeader: [
            {text:'N° de commande', value:"number"},
            {text:'Client', value:"client"},
            {text:'Date de commande', value:"date_arrival"},
            {text:'Etat de commande', value:"state"},
            {text:'Action', value:"control", sortable: false }
          ]
      };
    },
    async created(){
      try { 
        const res = await axios.get('http://localhost:5600/Orders?_embed=Products');
        this.orders = res.data;
        //console.log(this.orders);
      } catch (e) {
        console.log(e);
      }
    }
  }

</script>
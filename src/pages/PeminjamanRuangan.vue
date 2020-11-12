<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <h3>{{ruanganUppercase}}</h3>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="blue">
            <div class="md-title">Peminjaman</div>
          </md-card-header>
          <md-card-content>
            <md-table>
              <md-table-row>
                <md-table-head>Nama Peminjam</md-table-head>
                <md-table-head>Tanggal</md-table-head>
                <md-table-head>Waktu</md-table-head>
                <md-table-head>Perihal</md-table-head>
                <!-- <md-table-head></md-table-head> -->
              </md-table-row>
              <md-table-row v-for="p in peminjaman" :key="p.index">
                <md-table-cell>{{p.namaLengkapPeminjam}} ({{p.nimPeminjam}})</md-table-cell>
                <md-table-cell>{{p.tanggalPeminjaman}}</md-table-cell>
                <md-table-cell>{{p.waktuPeminjaman}}</md-table-cell>
                <md-table-cell>{{p.perihalPeminjaman}}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>      
</template>

<script>
// import Breadcrumb from "@/components/Breadcrumb.vue"
import axios from "axios"
export default {
  name:"PeminjamanRuangan",
  components:{
    // Breadcrumb
  },
  data(){
    return{
      breadcrumb:[],
      peminjaman:[]
    }
  },
  methods:{
    // calculateBreadcrumb(){
    //         // console.log(this.$route.meta.breadcrumb)
    //         this.$route.meta.breadcrumb.map((breadcrumbItem,index)=>{
    //             if(breadcrumbItem.name == null){
    //               console.log(this.$route.path)
    //               let paths=this.$route.path.split("/")
    //               paths.shift()
    //               breadcrumbItem.name = paths[index]
    //               breadcrumbItem.link = breadcrumbItem.link+"/"+paths[index]
    //             }
    //             // if(index != this.$route.meta.breadcrumb.length-1){
    //             //   breadcrumbItem.name += " > "
    //             // }
    //             this.breadcrumb.push(breadcrumbItem)
    //             // console.log(breadcrumbItem.link)
    //         })
    //     }
  },
  computed:{
    ruanganUppercase(){
      return this.$route.params.ruangan.toUpperCase()
    }
  },
  mounted(){
        // console.log(this.$route.path)
        // let routeMatched = this.$route.matched
        // console.log(routeMatched)
        // console.log("hello")
        // this.calculateBreadcrumb()
  },
  created(){
    let vm=this
    axios.get('http://localhost:5000/ruangan/'+this.$route.params.ruangan,{
      headers:{
        'authorization':'BEARER '+this.$store.state.token
      }
    })
    .then(function (response) {
      // handle success
      response.data.map(peminjaman=>{
        peminjaman.tanggalPeminjaman = peminjaman.tanggalPeminjaman.split('T')[0]
        vm.peminjaman.push({
          ...peminjaman
        })
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
}
</script>

<style>

</style>
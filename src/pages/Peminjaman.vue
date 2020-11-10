<template>
    <div>
        <div class="md-layout">
            <!-- <div class="breadcrumb">Peminjaman</div> -->
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="blue">
                        <div class="md-title">Daftar Ruangan</div>
                    </md-card-header>
                    <md-card-content>
                        <md-table>
                            <md-table-row>
                                <md-table-head>Nama Ruangan</md-table-head>
                                <md-table-head>Peminjaman</md-table-head>
                            </md-table-row>
                            <md-table-row v-for="ruangan in ruangans" :key="ruangan.namaRuangan" >
                                <md-table-cell>{{ruangan.namaRuangan}}</md-table-cell>
                                <md-table-cell><router-link :to="ruangan.link">Lihat Daftar</router-link></md-table-cell>
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
import axios from 'axios'
export default {
    components:{
        // Breadcrumb
    },
    name:"Peminjaman",
    data(){
        return {
            breadcrumb:null,
            ruangans:[]
        }
    },
    methods:{
    },
    created(){
        let vm=this
        axios.get('http://localhost:5000/ruangan',{
            headers:{
                'authorization':'BEARER '+this.$store.state.token
            }
        })
        .then(function (response) {
            // handle success
            console.log(vm.ruangans)
            response.data.map(ruangan=>{
                vm.ruangans.push({
                    namaRuangan:ruangan.namaRuangan.toUpperCase(),
                    link:"/peminjaman/"+ruangan.namaRuangan
                })
            })
            console.log(vm.ruangans)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
}
</script>

<style>
    .breadcrumb{
        margin-bottom:15px;
        font-size:16px;
    }
    .breadcrumb .router-link-active{
        background:none;
        box-shadow:none
    }
</style>
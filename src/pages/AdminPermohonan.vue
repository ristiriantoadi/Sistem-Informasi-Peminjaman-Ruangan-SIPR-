<template>
  <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="blue">
                        <div class="md-title">Daftar Permohonan</div>
                    </md-card-header>
                    <md-card-content>
                        <md-table>
                            <md-table-row>
                                <md-table-head>Nama Peminjam</md-table-head>
                                <md-table-head>Nama Ruangan</md-table-head>
                                <md-table-head>Tanggal</md-table-head>
                                <md-table-head>Waktu</md-table-head>
                                <md-table-head>Perihal</md-table-head>
                                <md-table-head>Status</md-table-head>
                                <md-table-head>Aksi</md-table-head>
                            </md-table-row>
                            <md-table-row v-for="permohonan in permohonans" :key="permohonan.index" >
                                <md-table-cell>{{permohonan.namaLengkapPeminjam}} ({{permohonan.nimPeminjam}})</md-table-cell>
                                <md-table-cell>{{permohonan.namaRuangan}}</md-table-cell>
                                <md-table-cell>{{permohonan.tanggalPeminjaman}}</md-table-cell>
                                <md-table-cell>{{permohonan.waktuPeminjaman}}</md-table-cell>
                                <md-table-cell>{{permohonan.perihalPeminjaman}}</md-table-cell>
                                <md-table-cell>
                                    <span class="statusPermohonan" :class="permohonan.statusPermohonan">{{permohonan.statusPermohonan}}</span>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-button @click="tolakPermohonan(permohonan.idPermohonan)" class="md-raised md-primary">Tolak</md-button>
                                    <md-button @click="terimaPermohonan(permohonan.idPermohonan)" class="md-raised md-accent">Terima</md-button>
                                </md-table-cell>
                                <!-- <md-table-cell><router-link :to="ruangan.link">Lihat Daftar</router-link></md-table-cell> -->
                            </md-table-row>
                        </md-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Permohonan',
    data(){
        return{
            permohonans:[],
            dialogPengajuanPermohonan:false,
            namaRuangan:'',
            tanggalPeminjaman:'',
            waktuPeminjaman:'',
            perihalPeminjaman:''
        }
    },
    methods:{
        tolakPermohonan(idPermohonan){
            let vm=this
            axios.post('http://localhost:5000/permohonan/tolak',{
                idPermohonan
            },{
                headers:{
                    'authorization':"BEARER "+this.$store.state.token
                }
            })
            .then(res=>{
                console.log(res)
                if(res.status == 200){
                    vm.getData()
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        terimaPermohonan(idPermohonan){
            let vm=this
            axios.post('http://localhost:5000/permohonan/terima',{
                idPermohonan
            },{
                headers:{
                    'authorization':"BEARER "+this.$store.state.token
                }
            })
            .then(res=>{
                console.log(res)
                if(res.status == 200){
                    vm.getData()
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        ajukanPermohonan(){
            this.dialogPengajuanPermohonan = true
        },
        simpanPengajuanPermohonan(){
            let vm=this
            axios.post('http://localhost:5000/permohonan',{
                namaRuangan:this.namaRuangan,
                tanggalPeminjaman:this.tanggalPeminjaman,
                waktuPeminjaman:this.waktuPeminjaman,
                perihalPeminjaman:this.perihalPeminjaman
            },{
                headers:{
                    'authorization':"BEARER "+this.$store.state.token
                }
            })
            .then(res=>{
                this.getData()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getData(){
            let vm = this
            axios.get('http://localhost:5000/permohonan',{
                headers:{'authorization':"bearer "+this.$store.state.token}
            })
            .then(res=>{
                console.log(res)
                vm.permohonans = res.data.map(permohonan=>{
                    permohonan.tanggalPeminjaman = permohonan.tanggalPeminjaman.split('T')[0]
                    return{ 
                        ...permohonan                    
                    }
                })
                vm.dialogPengajuanPermohonan=false
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    computed:{
    },
    created(){
        this.getData()
    }
}
</script>

<style>
    .statusPermohonan:first-letter {
        text-transform:capitalize;
    }

    .statusPermohonan{
        color:black;
        padding:5px;
    }
    
    .menunggu{
        background: yellow;
    }

    .diterima{
        background: green;
    }

    .ditolak{
        background: red;
    }

    .blue{
        background: blue!important;
    }
</style>
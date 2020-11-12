<template>
    <div>
        <md-dialog :md-active.sync="dialogFormTambahRuangan">
            <md-dialog-title>Form Tambah Ruangan</md-dialog-title>
            <md-dialog-content>
                <div>
                    <md-field>
                        <label>Nama Ruangan</label>
                        <md-input v-model="namaRuangan"></md-input>
                    </md-field>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="simpanDataRuanganTambah">Simpan</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-dialog :md-active.sync="dialogFormEditRuangan">
            <md-dialog-title>Form Edit Ruangan</md-dialog-title>
            <md-dialog-content>
                <div>
                    <md-field>
                        <label>Nama Ruangan</label>
                        <md-input v-model="namaRuangan"></md-input>
                    </md-field>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="simpanDataRuanganEdit">Simpan</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="md-layout">
            <div class="md-layout-item">
                <md-dialog-actions>
                    <md-button class="md-primary" @click="tambahRuangan">Tambah Ruangan</md-button>
                </md-dialog-actions>
            </div>    
        </div>
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
                                <md-table-head>Aksi</md-table-head>
                            </md-table-row>
                            <md-table-row v-for="ruangan in ruangans" :key="ruangan.namaRuangan" >
                                <md-table-cell>{{ruangan.namaRuangan}}</md-table-cell>
                                <md-table-cell><router-link :to="ruangan.link">Lihat Daftar</router-link></md-table-cell>
                                <md-table-cell>
                                    <md-button @click="editRuangan(ruangan)" class="md-raised md-primary">Edit Ruangan</md-button>
                                </md-table-cell>
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
            ruangans:[],
            namaRuangan:"",
            ruanganEdited:null,
            dialogFormTambahRuangan:false,
            dialogFormEditRuangan:false
        }
    },
    methods:{
        tambahRuangan(){
            this.dialogFormTambahRuangan=true
        },
        simpanDataRuanganEdit(){
            let vm = this
            const options={
                headers:{'authorization':'BEARER '+this.$store.state.token}
            }
            axios.post('http://localhost:5000/ruangan/edit',{idRuangan:this.ruanganEdited.idRuangan,namaRuanganEdited:this.namaRuangan},options)
            .then(res=>{
                if(res.status == 200){
                    vm.getData()
                    vm.ruanganEdited = null
                    vm.namaRuangan=""
                    this.dialogFormEditRuangan=false
                }
            })
            .catch(err=>{
                if(err){}
                    // console.log(err)
            })
        },
        simpanDataRuanganTambah(){
            let vm = this
            const options={
                headers:{'authorization':'BEARER '+this.$store.state.token}
            }
            axios.post('http://localhost:5000/ruangan/tambah',{namaRuangan:this.namaRuangan},options)
            .then(res=>{
                if(res.status == 200){
                    vm.getData()
                    // vm.ruanganEdited = null
                    vm.namaRuangan=""
                    this.dialogFormTambahRuangan=false
                }
            })
            .catch(err=>{
                if(err){}
                    // console.log(err)
            })
        },
        editRuangan(ruangan){
            this.dialogFormEditRuangan=true
            this.namaRuangan=ruangan.namaRuangan
            this.ruanganEdited=ruangan
        },
        getData(){
            let vm=this
            axios.get('http://localhost:5000/ruangan',{
                headers:{
                    'authorization':'BEARER '+this.$store.state.token
                }
            })
            .then(function (response) {
                // handle success
                vm.ruangans=[]
                // console.log(vm.ruangans)
                response.data.map(ruangan=>{
                    vm.ruangans.push({
                        idRuangan:ruangan._id,
                        namaRuangan:ruangan.namaRuangan.toUpperCase(),
                        link:"/admin/peminjaman/"+ruangan.namaRuangan
                    })
                })
                // console.log(vm.ruangans)
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
        }
    },
    created(){
        this.getData()
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
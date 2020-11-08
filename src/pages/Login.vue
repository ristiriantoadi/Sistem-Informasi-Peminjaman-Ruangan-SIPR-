<template>
    <div class="container">
        <div class="login-card">
            <md-card>
                <md-card-header data-background-color="orange">
                    <div class="md-title center">Login Sistem Informasi Peminjaman Ruangan</div>
                </md-card-header>
                <md-card-content>
                    <md-field>
                        <label>NIM</label>
                        <md-input v-model="nim"></md-input>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="login" class="md-primary">Login</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"Login",
    data(){
        return{
            nim:'',
            password:''
        }
    },
    methods:{
        login(){
            console.log(this.nim)
            console.log(this.password)
            axios.post('http://localhost:5000/login',{
                nim:this.nim,
                password:this.password
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .md-title.center{
        text-align: center;
    }
    .login-card{
        width:40%;
        margin: 0 auto;
    }
    .container{
        display: flex;
        align-items: center;
        height:100vh;
    }
</style>
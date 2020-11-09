<template>
    <div class="container">
        <div class="login-card">
            <md-card>
                <md-card-header data-background-color="orange">
                    <div class="md-title center">Login Sistem Informasi Peminjaman Ruangan</div>
                </md-card-header>
                <md-card-content>
                    <div class="error" v-if="error">Password atau NIM salah</div>
                    <md-field>
                        <label>NIM</label>
                        <md-input required v-model="nim"></md-input>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input v-model="password" required type="password"></md-input>
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button :disabled="!requiredFilled" @click="login" class="md-primary">Login</md-button>
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
            password:'',
            error:false
        }
    },
    computed:{
        requiredFilled(){
            if(this.nim != '' && this.password != ''){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        login(){
            axios.post('http://localhost:5000/login',{
                nim:this.nim,
                password:this.password
            }).then(res=>{
                this.$store.commit('login',res.data.token)
                this.$router.replace({path:'/peminjaman'})
            }).catch(err=>{
                console.log(err.response.status)
                if(err.response.status == 401){
                    this.error=true
                }
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
        width:50%;
        margin: 0 auto;
    }
    .container{
        display: flex;
        align-items: center;
        height:100vh;
    }
    .error{
        background: tomato;
        padding:15px;
        border-radius: 3px;
        color:white;
        margin-bottom: 20px;
    }
</style>
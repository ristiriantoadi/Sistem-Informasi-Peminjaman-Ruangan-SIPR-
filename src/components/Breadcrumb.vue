<template>
  <div class="breadcrumb">
        <span class="breadcrumb-item" v-for="(breadcrumbItem,index) in breadcrumb" :key="breadcrumbItem.index" >
            <router-link :class="{ disabled: (index == breadcrumb.length-1) }" active-class="active" :to="breadcrumbItem.link">{{breadcrumbItem.name}}</router-link>
            <span v-if="index != breadcrumb.length-1"> > </span>
        </span>
    </div>
</template>

<script>
export default {
    name:"Breadcrumb",
    data(){
        return{
            breadcrumb:[]
        }
    },
    methods:{
        calculateBreadcrumb(){//function to aggregate and compute breadcrumb data
            let paths = this.$route.path.split("/")
            paths.shift()

            this.$route.meta.breadcrumb.map((breadcrumbItem,index)=>{
                if(index == 0)
                    breadcrumbItem.link="/"+paths[index]
                else{
                    breadcrumbItem.link=this.$route.meta.breadcrumb[index-1].link+"/"+paths[index]
                }

                if(breadcrumbItem.type == "dynamic"){
                    breadcrumbItem.name = paths[index]
                }

                this.breadcrumb.push(breadcrumbItem)
            })
        }
    },
    created(){
        this.calculateBreadcrumb()    
    }
}
</script>

<style>
.breadcrumb-item{
    background:none;
}
/* .active{
    background-color:none!important;
} */
/* a:hover{
    text-decoration: underline;
} */
.disabled{
    /* opacity: 0.5; */
    color:#80807c!important;
    font-weight: 400;
    pointer-events: none;
}
</style>
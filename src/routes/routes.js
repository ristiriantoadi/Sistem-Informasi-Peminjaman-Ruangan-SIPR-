import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AdminDashboardLayout from "@/pages/Layout/AdminDashboardLayout.vue";


import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import PeminjamanLayout from "@/pages/PeminjamanLayout.vue";
import Peminjaman from "@/pages/Peminjaman.vue";
import AdminPeminjaman from "@/pages/AdminPeminjaman.vue";
import PeminjamanRuangan from "@/pages/PeminjamanRuangan.vue";
import Login from "@/pages/Login.vue"
import Permohonan from "@/pages/Permohonan.vue"
import AdminPermohonan from "@/pages/AdminPermohonan.vue"

const routes = [
  {
    path:"/login",
    component:Login,
    meta:{
      protected:false
    }
  },
  {
    path:"/admin",
    component:AdminDashboardLayout,
    redirect:"/login",
    children:[
      {
        path:"peminjaman",
        component:PeminjamanLayout,
        children:[
          {
            path:"",
            name:"AdminPeminjaman",
            component:AdminPeminjaman,
            meta:{
              protected:true
            }
          },
          {
            path:":ruangan",
            name:"AdminPeminjamanRuangan",
            component:PeminjamanRuangan,
            meta:{
              protected:true
            }
          }
        ]
      },
      {
        path:"permohonan",
        name:"AdminPermohonan",
        component:AdminPermohonan,
        meta:{
          protected:true
        }
      }
    ]
  },
  {
    path: "",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "peminjaman",
        component: PeminjamanLayout,
        meta:{
        },
        children:[
          {
            path:"",
            name:"Peminjaman",
            component:Peminjaman,
            meta:{
              breadcrumb:
                [
                  {
                    name:"Peminjaman",
                  }
                ],            
              protected:true
            }
          },
          {
            path:":ruangan",
            name:"PeminjamanRuangan",
            component:PeminjamanRuangan,
            meta:{
              breadcrumb:
                [
                  {
                    name:"Peminjaman",
                  },
                  {
                    type:"dynamic"
                  }
                ],
              protected:true
            }
          }
        ]
      },
      {
        path:"permohonan",
        name:"Permohonan",
        component:Permohonan,
        meta:{
          protected:true
        }
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  }
];

export default routes;

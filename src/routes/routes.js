import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

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
import PeminjamanRuangan from "@/pages/PeminjamanRuangan.vue";
import Login from "@/pages/Login.vue"

const routes = [
  {
    path:"/login",
    component:Login,
  },
  {
    path: "",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "peminjaman",
        name: "PeminjamanLayout",
        component: PeminjamanLayout,
        meta:{
          breadcrumb:{
            name:"Peminjaman",
            link:"/peminjaman"              
          }
        },
        children:[
          {
            path:"",
            name:"Peminjaman",
            component:Peminjaman
          },
          {
            path:":ruangan",
            name:"PeminjamanRuangan",
            component:PeminjamanRuangan,
            meta:{
              type:"dynamic"
            }
          }
        ]
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

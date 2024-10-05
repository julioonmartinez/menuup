import { Route } from "@angular/router";
import { MyMenusComponent } from "../web/pages/my-menus/my-menus.component";
import { LayoutUserComponent } from "./components/layout-user/layout-user.component";
import { AccountComponent } from "../web/pages/account/account.component";


export default [
  {
    path:'',
    component:LayoutUserComponent,
    children:[
        {path:'home', component:MyMenusComponent},
        {path:'account', component:AccountComponent},
        {path: '', redirectTo:'/user/home', pathMatch:'full'},
       
    ]
  },
  {
    path:'', redirectTo:'/user/home', pathMatch:'full'
  }
    
  ] as Route[
  
  ];
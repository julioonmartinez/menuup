import { Route } from "@angular/router";
import { LayoutMenu03Component } from "./components/layout-menu-03/layout-menu-03.component";
import { HomeComponent } from "./pages/home/home.component";



export default [
  {
    path: ':id',
    component: LayoutMenu03Component,
    children: [
      { path: 'home', component: HomeComponent},
      { path:'', redirectTo: '/home', pathMatch: 'full' },
      {path:'**', redirectTo:'/home', pathMatch:'full'},
    ],
  },
  // {
  //   path:'**',
  //   redirectTo:'home'
  // }
] as Route[];
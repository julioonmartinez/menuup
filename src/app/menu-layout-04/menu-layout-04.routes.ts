import { Route } from "@angular/router";
import { Layout04Component } from "./components/layout-04/layout-04.component";




export default [
  {
    path: ':id',
    component: Layout04Component,
  },
  // {
  //   path:'**',
  //   redirectTo:'home'
  // }
] as Route[];
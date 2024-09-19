import { Route } from "@angular/router";
import { LayoutComponent02 } from "./components/layout/layout.component";
import { HomeComponent02 } from "./pages/home/home.component";
import { DetailProductComponent } from "./pages/detail-product/detail-product.component";


export default [
  {
    path: '',
    component: LayoutComponent02,
    children: [
      { path: 'home/:idCategory', component: HomeComponent02},
      { path:'', redirectTo: '/home/0', pathMatch: 'full' },
      {path:'**', redirectTo:'/home/0', pathMatch:'full'},
    ],
  },
  // {
  //   path:'**',
  //   redirectTo:'home'
  // }
] as Route[];
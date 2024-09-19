import { Route } from "@angular/router";
import { LayoutComponent01 } from "./layout/layout.component";
import { HomeComponent01 } from "./pages/home/home-menu-demo-01.component";
import { SectionComponent } from "./pages/section/section.component";
import { DetailPlatilloComponent } from "./pages/detail-platillo/detail-platillo.component";
import { DialogInfoComponent } from "./pages/dialog-info/dialog-info.component";

export default [
  {
    path: '',
    component: LayoutComponent01,
    children: [
      { path: 'home', component: HomeComponent01, data: { animation: 'isRight' } },
      { path: 'home/sections/:id', component: SectionComponent, data: { animation: 'isLeft' } },
      { path: 'detail-platillo/:id', component: DetailPlatilloComponent, data: { animation: 'detail' } },
      { path: 'infogeneral', component: DialogInfoComponent, data: { animation: 'isLeft' } },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
] as Route[];
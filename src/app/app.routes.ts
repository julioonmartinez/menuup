import { Routes } from '@angular/router';

import { LayoutComponent01 } from './menu-demo-layout01/layout/layout.component';
import { HomeComponent01 } from './menu-demo-layout01/pages/home/home-menu-demo-01.component';
import { SectionComponent } from './menu-demo-layout01/pages/section/section.component';
import { DetailPlatilloComponent } from './menu-demo-layout01/pages/detail-platillo/detail-platillo.component';
import { DialogInfoComponent } from './menu-demo-layout01/pages/dialog-info/dialog-info.component';
import { HomeComponent02 } from './menu-layout-02/pages/home/home.component';
import { LayoutComponent02 } from './menu-layout-02/components/layout/layout.component';
import { LayoutWelcomeComponent } from './welcome/components/layout-welcome/layout-welcome.component';
import { PagesHomeComponent } from './web/pages/pages-home/pages-home.component';
import { LayoutRoutingComponent } from './routing/layout-routing/layout-routing.component';
import { LayoutWebComponent } from './web/components/layout-web/layout-web.component';
import { SearchComponent } from './web/pages/search/search.component';
import { TapsComponent } from './web/pages/taps/taps.component';
import { AccountComponent } from './web/pages/account/account.component';
import { RoutesFeedComponent } from './web/components/routes-feed/routes-feed.component';
import { PlatsFeedComponent } from './web/components/plats-feed/plats-feed.component';
import { PromosFeedComponent } from './web/components/promos-feed/promos-feed.component';
import { PlacesFeedComponent } from './web/components/places-feed/places-feed.component';
import { MyMenusComponent } from './web/pages/my-menus/my-menus.component';
import { LoginComponent } from './web/pages/login/login.component';
import { RegisterComponent } from './web/pages/register/register.component';

import { LayoutMenu03Component } from './menu-layout-03/components/layout-menu-03/layout-menu-03.component';
import { Layout04Component } from './menu-layout-04/components/layout-04/layout-04.component';
import { TemporalAdminComponent } from './temporal-admin/temporal-admin.component';
import { HomeComponent } from './web/pages/home/home.component';
import { NoRegisterComponent } from './web/components/no-register/no-register.component';
import { PoliticaPrivacidadComponent } from './web/pages/politica-privacidad/politica-privacidad.component';
import { SelectionPlanComponent } from './web/pages/selection-plan/selection-plan.component';
import { BuyNowComponent } from './web/pages/buy-now/buy-now.component';
import { SelectionMenuCreditComponent } from './web/pages/selection-menu-credit/selection-menu-credit.component';

export const routes: Routes = [
    {
        path:'menus/:idCompany',
        component:LayoutRoutingComponent
    },
    {
        path:'temporal',
        component:TemporalAdminComponent
    },
   
    {
        path:'menu-demo-layout-01/:idCompany',
        component:LayoutComponent01,
        children: [
            { path: 'home', component: HomeComponent01, data: { animation: 'isRight' } },
            { path: 'home/sections/:id', component: SectionComponent, data: { animation: 'isLeft' } },
            { path: 'detail-platillo/:id', component: DetailPlatilloComponent, data: { animation: 'detail' } },
            { path: 'infogeneral', component: DialogInfoComponent, data: { animation: 'isLeft' } },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
            ]
    },
    {
        path:'menu-layout-02/:idCompany',
        component:LayoutComponent02,
        children:[
            { path: 'home/:idCategory', component: HomeComponent02},
        ]
    },
    {
        path:'menu-layout-04/:idCompany',
        component:Layout04Component,
    },
    
    {
        path:'menu-layout-03/:idCompany',
        component:LayoutMenu03Component,
        children: [
            { path: 'home', component: HomeComponent },
            // { path:'', redirectTo: '/home', pathMatch: 'full' },
            
          ],
    },
    
    {
        path:'',
        component:LayoutWelcomeComponent,
        children:[
            {path:'', redirectTo:'/web/home', pathMatch:'full'}
        ]
    },
    {
        path:'user',
        loadChildren:()=> import('./user/user.routes')
    },
    {
        path:'web',
        component:LayoutWebComponent,
        children:[
            {path:'search', component:SearchComponent},
            {
                path:'feed', 
                component:RoutesFeedComponent,
                children:[
                    {path:'menus', component:PagesHomeComponent},
                    {path:'plats', component:PlatsFeedComponent},
                    {path:'promos', component:PromosFeedComponent},
                    {path:'places', component:PlacesFeedComponent},
                    // {path:'', redirectTo:'/web/feed/menus', pathMatch:'full'}
                ]
            },
            {path:'account/login', component:LoginComponent},
            {path:'account/register', component:NoRegisterComponent},
            {path:'menus', component:MyMenusComponent},
            {path:'home', component:HomeComponent},
            {path:'politica-privacidad', component:PoliticaPrivacidadComponent},
            {path:'plans', component:SelectionPlanComponent},
            {path:'buy-now/:period', component:BuyNowComponent},
            {path:'selection-menu-credit/:idPay', component:SelectionMenuCreditComponent},
            {
                path:'menus/app-samari',
                loadChildren:()=> import('./demo-app/demo.routes')
            },
            {path:'account', component:AccountComponent},
            {path: '', redirectTo: '/home' , pathMatch: 'full' }
        ]
    },
    {
        path:'app-samari',
        loadChildren:()=> import('./demo-app/demo.routes')
    },
    
        {
            path:'**',
            redirectTo: '/web/home',
            pathMatch:'full'
        }  
    
    
];

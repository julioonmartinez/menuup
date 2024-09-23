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

export const routes: Routes = [
    {path:'menus/:idCompany',
        component:LayoutRoutingComponent
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
            path:'',
            component:LayoutWelcomeComponent,
            children:[
                {path:'', redirectTo:'/web/search', pathMatch:'full'}
            ]
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
                        {path:'', redirectTo:'/web/feed/menus', pathMatch:'full'}
                    ]
                },
                {path:'menus', component:MyMenusComponent},
                {path:'account', component:AccountComponent},
                {path: '', redirectTo: '/search' , pathMatch: 'full' }
            ]
        },
    
        {
            path:'**',
            redirectTo: '/web/search',
            pathMatch:'full'
        }  
    
    
];

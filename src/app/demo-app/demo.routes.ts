import { Route } from "@angular/router";
import { LayoutAppUserComponent } from "./components/layout-app-user/layout-app-user.component";
import { HomeComponent } from "./pages/home/home.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { CodeQrComponent } from "./pages/code-qr/code-qr.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { ListMenusComponent } from "./pages/list-menus/list-menus.component";
import { SurveysComponent } from "./pages/surveys/surveys.component";
import { CustomInformationComponent } from "./pages/custom-information/custom-information.component";

export default [
  {
    path:'',
    component:LayoutAppUserComponent,
    children:[
      {path:'control/:id', component:HomeComponent},
      {path:'configuration/:id', component:ConfigurationComponent},
      {path:'generate-code-qr/:id', component:CodeQrComponent,},
      {path:'register', component:RegisterComponent},
      // {path:'surveys', component:SurveysComponent},
      {path:'surveys/:id', component:SurveysComponent},
      {path:'custom-information/:id', component:CustomInformationComponent},
      {path:'login', component:LoginComponent},
      {path:'list-menus', component:ListMenusComponent},
      {path:'', redirectTo:'/app-samari/list-menus', pathMatch:'full'}
    ]
  }
    
  ] as Route[
  
  ];
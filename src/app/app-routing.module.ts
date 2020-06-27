import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.gaurd';

const routes = [
    {path:'',component:AuthComponent},
    {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers:[AuthGuard]
  })
export class AppRoutingModule { }

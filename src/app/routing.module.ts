import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes = [
    {path:'',component:AuthComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
  })
  export class RoutingModule {}
import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
           loadComponent: () => import ('./page/user/user.component'),
        
      },
      {
        path:'',
        redirectTo:'/auth',
        pathMatch:'full'
      }
];

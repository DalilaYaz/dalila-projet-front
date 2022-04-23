import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component'
const routes: Routes = [
  
  {
    path:"",
    redirectTo:"entreprises",
    pathMatch:"full"
  },



  {
    path:"entreprises",
    loadChildren: () => import('./entreprise/entreprise.module')
    .then(m => m.EntrepriseModule),
  },


  /*{
    path:"salaries",
    loadChildren: () => import('./salarie/salarie.module')
    .then(m => m.SalarieModule),
   
  },*/


  {
    path:"**",
    component : NotFoundComponent,
  },
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
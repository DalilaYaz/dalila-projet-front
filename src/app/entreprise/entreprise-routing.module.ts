import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntrepriseComponent} from './entreprise.component';
import {EntrepriseListComponent} from './pages/entreprise-list/entreprise-list.component';
import {EntrepriseDetailsComponent} from './pages/entreprise-details/entreprise-details.component';

const routes: Routes = [
    {
      path:"",
      component: EntrepriseComponent,
      children: [
        {
          path:"",
          component: EntrepriseListComponent,
        },
        {
          path:":id",
          component : EntrepriseDetailsComponent,
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }

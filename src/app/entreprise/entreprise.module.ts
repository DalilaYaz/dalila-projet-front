import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { EntrepriseComponent } from './entreprise.component';
import { EntrepriseDetailsComponent } from './pages/entreprise-details/entreprise-details.component';
import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { EntrepriseService } from './services/entreprise.service';
import { EntrepriseListComponent } from './pages/entreprise-list/entreprise-list.component';


@NgModule({
  declarations: [
    EntrepriseComponent,
    EntrepriseDetailsComponent,
    EntrepriseFormComponent,
    EntrepriseListComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [EntrepriseService, MatDatepickerModule, MatNativeDateModule],
}
)
export class EntrepriseModule { }

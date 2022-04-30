import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from './../../../core/models/entreprise'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntrepriseFormComponent } from '../../components/entreprise-form/entreprise-form.component';
import { EntrepriseFormData } from 'src/app/core/models/entrepriseFormData';

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})

export class EntrepriseListComponent implements OnInit {
  entreprises$: Observable<Entreprise[]>;
  columnsToDisplay = ['id', 'companyName', 'companySiret', 'email', 'dateOfCreation', 'salarie'];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _entrepriseService: EntrepriseService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.entreprises$ = this._entrepriseService.getEntreprises();
  }

  showEntrepriseDetails(entreprise: Entreprise) {
    this._router.navigateByUrl('/entreprises/' + entreprise.id);
  }

  createEntreprise() {
    const entrepriseFormData: EntrepriseFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(EntrepriseFormComponent, {
      data: entrepriseFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

    deleteEntreprise(id: number) {
    this._entrepriseService.deleteEntreprise(id).subscribe(() => {
      this.entreprises$ = this._entrepriseService.getEntreprises();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}
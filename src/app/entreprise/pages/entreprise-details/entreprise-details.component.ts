import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/core/models/entreprise';
import { EntrepriseService } from '../../services/entreprise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { EntrepriseFormData } from './../../../core/models/entrepriseFormData';
import { EntrepriseFormComponent } from './../../components/entreprise-form/entreprise-form.component';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.scss']
})

export class EntrepriseDetailsComponent implements OnInit {
  entreprise$: Observable<Entreprise>;
  constructor(
    private _entrepriseService: EntrepriseService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fetchData(params['id']);
    });
  }

  fetchData(id: number) {
    this.entreprise$ = this._entrepriseService.getEntreprise(id);
  }

  updateEntreprise(entreprise: Entreprise) {
    const entrepriseFormData: EntrepriseFormData = {
      isUpdateMode: true,
      entrepriseToUpdate: entreprise,
    };

    const dialogRef = this._dialog.open(EntrepriseFormComponent, {
      data: entrepriseFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deleteEntreprise(id: number) {
    this._entrepriseService.deleteEntreprise(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/entreprises');
    });
  }

  goBack() {
    this._location.back();
  }
}
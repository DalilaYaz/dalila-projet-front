import { EntrepriseService } from './../../services/entreprise.service';
import { EntrepriseFormData } from 'src/app/core/models/entrepriseFormData';
import { Entreprise } from './../../../core/models/entreprise';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})


export class EntrepriseFormComponent implements OnInit {
  isUpdateMode: boolean;
  entrepriseForm: FormGroup;

 
  constructor(
    private _formBuilder: FormBuilder,
    private _entrepriseService: EntrepriseService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EntrepriseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntrepriseFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.entrepriseForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.entrepriseToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      companyName: [
        this.data.isUpdateMode ? this.data.entrepriseToUpdate.companyName : '',
        Validators.required,
      ],
      companySiret: [
        this.data.isUpdateMode ? this.data.entrepriseToUpdate.companySiret : '',
        Validators.required,
      ],
    
      email: [
        this.data.isUpdateMode ? this.data.entrepriseToUpdate.email : '',
        [Validators.required, Validators.email],
      ],
      dateOfCreation: [
        this.data.isUpdateMode ? this.data.entrepriseToUpdate.dateOfCreation : '',
        Validators.required,
      ],
      salarie: [
        this.data.isUpdateMode ? this.data.entrepriseToUpdate.salarie : '',
        Validators.required,
      ],
    });
  }

  closeForm(id?: number) {
    this.entrepriseForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(entreprise: Entreprise) {
    if (this.entrepriseForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._entrepriseService.updateEntreprise(entreprise).subscribe((response) => {
          this.closeForm(entreprise.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._entrepriseService.createEntreprise(entreprise).subscribe((response) => {
          this.closeForm(entreprise.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}
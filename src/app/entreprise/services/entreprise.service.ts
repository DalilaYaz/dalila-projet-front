import { environment } from './../../../environments/environment';
import { Entreprise } from './../../core/models/entreprise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EntrepriseService {
  private readonly entreprisePath: string = '/entreprises';

  constructor(private _http: HttpClient) {}

  getEntreprises(): Observable<Entreprise[]> {
    return this._http.get<Entreprise[]>(
      ${environment.apiBaseUrl}${this.entreprisePath}
    );
  }

  getEntreprise(id: number): Observable<Entreprise> {
    return this._http.get<Entreprise>(
      ${environment.apiBaseUrl}${this.entreprisePath}/${id}
    );
  }

  createEntreprise(entreprise: Entreprise): Observable<string> {
    return this._http.post<string>(
      ${environment.apiBaseUrl}${this.entreprisePath},
      entreprise
    );
  }

  updateEntreprise(entreprise: Entreprise): Observable<string> {
    return this._http.put<string>(
      ${environment.apiBaseUrl}${this.entreprisePath}/${entreprise.id},
      entreprise
    );
  }

  deleteEntreprise(id: number): Observable<string> {
    return this._http.delete<string>(
      ${environment.apiBaseUrl}${this.entreprisePath}/${id}
    );
  }
}


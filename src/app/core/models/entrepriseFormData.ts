import { Entreprise } from './entreprise';

export interface EntrepriseFormData {
  isUpdateMode: boolean;
  entrepriseToUpdate?: Entreprise;
  idToCreate?: number;
}
export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  matricule: string;
  role: string;
  etat: number;
  date_inscription: string;
  date_modification: string;
  date_archivage: string;
}

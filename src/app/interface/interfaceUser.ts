import { Chain } from './interfaceChain';

export interface User {

  id: number;
  iud: string;
  nom: string;
  prenom: string;
  email: string;
  entite: string;
  ismanager: boolean;
  emailmanager: string;
  isadmin: boolean;
  accesauxchaines: string;
  serveurunix: string;
  loginunix: string;
  datedecreation: string;
  auteurcreation: string;
  datedemodification: string;
  auteurdemodification: string;
  refmyaccess: number;
  chain: Chain;
}

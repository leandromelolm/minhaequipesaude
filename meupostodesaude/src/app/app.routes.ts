import { Routes } from '@angular/router';
import { MembrosComponent } from './components/membros/membros.component';
import { BuscaRuasComponent } from './components/busca-ruas/busca-ruas.component';
import { EquipesComponent } from './components/equipes/equipes.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/membros', pathMatch: 'full' },
  { path: '', component: MembrosComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'membros', component: MembrosComponent },
  { path: 'busca-ruas', component: BuscaRuasComponent }
];

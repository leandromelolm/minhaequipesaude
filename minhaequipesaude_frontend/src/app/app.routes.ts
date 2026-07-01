import { Routes } from '@angular/router';
import { ProfissionaisComponent } from './features/profissionais/profissionais.component';
import { EnderecosComponent } from './features/enderecos/enderecos.component';
import { EquipesComponent } from './features/equipes/equipes.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/membros', pathMatch: 'full' },
  { path: '', component: ProfissionaisComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'busca-ruas', component: EnderecosComponent }
];

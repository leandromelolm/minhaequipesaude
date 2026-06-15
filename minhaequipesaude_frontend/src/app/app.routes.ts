import { Routes } from '@angular/router';
import { ProfissionaisComponent } from './features/profissionais/profissionais.component';
import { EnderecosComponent } from './features/enderecos/enderecos.component';
import { EquipesComponent } from './features/equipes/equipes.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/membros', pathMatch: 'full' },
  { path: '', component: EquipesComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'membros', component: ProfissionaisComponent },
  { path: 'busca-ruas', component: EnderecosComponent }
];

import { Routes } from '@angular/router';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import { EquipesComponent } from './components/equipes/equipes.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/membros', pathMatch: 'full' },
  { path: '', component: EquipesComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'membros', component: ProfissionaisComponent },
  { path: 'busca-ruas', component: EnderecosComponent }
];

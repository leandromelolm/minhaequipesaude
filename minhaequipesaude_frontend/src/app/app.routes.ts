import { Routes } from '@angular/router';
import { ProfissionaisComponent } from './features/profissionais/profissionais.component';
import { EnderecosComponent } from './features/enderecos/enderecos.component';
import { EquipesComponent } from './features/equipes/equipes.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'profissionais/4', pathMatch: 'full' }, // problema em produção no firebase. a rota "" não encontra página
  { path: '', component: ProfissionaisComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'profissionais/:equipeApelido', component: ProfissionaisComponent },
  { path: 'busca-ruas', component: EnderecosComponent }
];

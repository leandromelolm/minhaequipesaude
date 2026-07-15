import { Component } from '@angular/core';
import { EquipesComponent } from '../equipes/equipes.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sobre',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss',
})
export class SobreComponent {

}

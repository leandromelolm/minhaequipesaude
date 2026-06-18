import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipe } from './models/equipe.model';
import { ProfissionaisComponent } from '../profissionais/profissionais.component';
import { EquipeService } from './services/equipes.service';

@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [CommonModule, ProfissionaisComponent],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.scss'
})
export class EquipesComponent implements OnInit {
  equipes: Equipe[] = [];
  equipeSelecionada: String | null = "";
  exibirComponenteMembro: boolean = false;
  apelidoEquipeSelecionada = signal('');


  constructor(private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.equipes = this.equipeService.getUnidade();
  }

  selecionarEquipe(equipeApelido: string): void {
    this.equipeSelecionada = equipeApelido;
    this.apelidoEquipeSelecionada.set(equipeApelido);
  }

  abrirComponente(status: boolean): void {
    this.exibirComponenteMembro = status;
  }

}

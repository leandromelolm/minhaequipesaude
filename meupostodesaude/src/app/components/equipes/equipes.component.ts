import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unidade } from '../../models/unidade.model';
import { UnidadeService } from '../../services/unidade.service';
import { MembrosComponent } from '../membros/membros.component';

@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [CommonModule, MembrosComponent],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.scss'
})
export class EquipesComponent implements OnInit {
  equipes: Unidade[] = [];
  equipeSelecionada: String | null = "";
  exibirComponenteMembro: boolean = false;
  apelidoEquipeSelecionada = signal('');


  constructor(private unidadeService: UnidadeService) { }

  ngOnInit(): void {
    this.equipes = this.unidadeService.getUnidade();
  }

  selecionarEquipe(equipeApelido: string): void {
      this.equipeSelecionada = equipeApelido;
      this.apelidoEquipeSelecionada.set(equipeApelido);
  }

  abrirComponente(status: boolean): void {
    this.exibirComponenteMembro = status;
  }

}

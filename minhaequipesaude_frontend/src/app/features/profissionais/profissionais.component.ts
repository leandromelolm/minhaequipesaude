import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profissional } from './models/profissional.model';
import { ProfissionaisService } from './services/profissionais.service';
import { Observable, Subscription } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-profissionais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profissionais.component.html',
  styleUrl: './profissionais.component.css'
})
export class ProfissionaisComponent implements OnInit {

  equipeApelido = input<string>('');
  tituloEquipe: string | null = "";

  private todosMembros = signal<Profissional[]>([]);
  carregando = signal<boolean>(true);
  private sub: Subscription | null = null; // Para evitar vazamento de memória

  membrosFiltrados = computed(() => {
    const apelido = this.equipeApelido();
    if (!apelido) {
      return this.todosMembros();
    }
    return this.todosMembros().filter(membro => String(membro.equipe) === apelido);
  });

  constructor(private profissionalService: ProfissionaisService) {
    effect(() => {
      this.tituloEquipe = this.equipeApelido();
    });
  }

  ngOnInit(): void {
    this.carregando.set(true);
    this.sub = this.profissionalService.getProfissionais().subscribe({
      next: (dados) => {
        this.todosMembros.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar profissionais da API:', err);
        this.carregando.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

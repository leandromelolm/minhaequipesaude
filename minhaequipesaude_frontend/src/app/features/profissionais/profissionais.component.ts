import { Component, computed, inject, input, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Profissional } from './models/profissional.model';
import { ProfissionaisService } from './services/profissionais.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profissionais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profissionais.component.html',
  styleUrl: './profissionais.component.css'
})
export class ProfissionaisComponent implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private profissionalService = inject(ProfissionaisService);

  // preencher o input automaticamente com o valor da URL :equipeApelido
  equipeApelido = input<string>('');

  todosMembros = signal<Profissional[]>([]);
  carregando = signal<boolean>(true);

  private sub: Subscription | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarDados();
    }
  }

  private carregarDados() {
    this.carregando.set(true);
    this.sub = this.profissionalService.getProfissionais().subscribe({
      next: (dados) => {
        this.todosMembros.set(dados || []);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar profissionais:', err);
        this.carregando.set(false);
      }
    });
  }

  membrosFiltrados = computed(() => {
    const apelidoAlvo = String(this.equipeApelido() || '').trim();
    const membros = this.todosMembros();

    if (!apelidoAlvo) {
      return membros;
    }

    return membros.filter(membro => String(membro.equipe).trim() === apelidoAlvo);
  });

  tituloEquipe = computed(() => {
    const apelido = this.equipeApelido();
    return apelido ? `${apelido}` : 'Geral';
  });

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
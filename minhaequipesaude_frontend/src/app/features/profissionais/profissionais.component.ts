import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profissional } from './models/profissional.model';
import { ProfissionaisService } from './services/profissionais.service';

@Component({
  selector: 'app-profissionais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profissionais.component.html',
  styleUrl: './profissionais.component.css'
})
export class ProfissionaisComponent implements OnInit {

  equipeApelido = input<string>('');
  tituloEquipe: String | null = "";

  private todosMembros = signal<Profissional[]>([]);

  membrosFiltrados = computed(() => {
    const apelido = this.equipeApelido();
    if (!apelido) {
      return this.todosMembros();
    }
    return this.todosMembros().filter(membro => membro.equipe === apelido);
  });

  constructor(private profissionalService: ProfissionaisService) {
    effect(() => {
      this.tituloEquipe = this.equipeApelido();
      console.log(this.equipeApelido())
    });
  }

  ngOnInit(): void {
    this.todosMembros.set(this.profissionalService.getProfissionais());
  }
}

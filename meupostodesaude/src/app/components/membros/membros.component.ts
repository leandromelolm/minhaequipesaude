import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membro } from '../../models/membro.model';
import { MembrosService } from '../../services/membros.service';

@Component({
  selector: 'app-membros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membros.component.html',
  styleUrl: './membros.component.css'
})
export class MembrosComponent implements OnInit {

  equipeApelido = input<string>('');
  tituloEquipe: String | null = "";
  
  private todosMembros = signal<Membro[]>([]);

  membrosFiltrados = computed(() => {
    const apelido = this.equipeApelido();
    if (!apelido) {
      return this.todosMembros();
    }
    return this.todosMembros().filter(membro => membro.equipe === apelido);
  });

  constructor(private membrosService: MembrosService) {
    effect(() => {
      this.tituloEquipe = this.equipeApelido();
      console.log(this.equipeApelido())
    });
  }

  ngOnInit(): void {
    this.todosMembros.set(this.membrosService.getMembros());
  }
}

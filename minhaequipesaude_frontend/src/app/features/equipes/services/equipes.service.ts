import { Injectable } from '@angular/core';
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private equipe: Equipe[] = [
    {
      id: 1,
      nome: 'Equipe 1',
      apelido: '1',
      ine: 0,
      registro: '',
      descricao: ''
    },
    {
      id: 2,
      nome: 'Equipe 2',
      apelido: '2',
      registro: '',
      descricao: ''
    },
    {
      id: 3,
      nome: 'Equipe 3',
      apelido: '3',
      registro: '',
      descricao: ''
    },
    {
      id: 4,
      nome: 'Equipe 4',
      apelido: '4',
      registro: '',
      descricao: ''
    }
  ]

  constructor() { }

  getUnidade(): Equipe[] {
    return this.equipe;
  }

  getUnidadeById(id: number): Equipe | undefined {
    return this.equipe.find(m => m.id === id);
  }
}

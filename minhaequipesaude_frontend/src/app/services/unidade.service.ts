import { Injectable } from '@angular/core';
import { Unidade } from '../models/unidade.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private unidade: Unidade[] = [
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

  getUnidade(): Unidade[] {
      return this.unidade;
    }
  
  getUnidadeById(id: number): Unidade | undefined {
      return this.unidade.find(m => m.id === id);
  }
}

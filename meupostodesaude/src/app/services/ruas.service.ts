import { Injectable } from '@angular/core';
import { Rua } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class RuasService {
  private ruas: Rua[] = [
    {
      id: 1,
      logradouro: 'Rua Carlos Pena Filho ',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4',
      observacao: ['', '', '', '']
    },
    {
      id: 2,
      logradouro: 'Rua Lavinia ',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '2'
    },
    {
      id: 3,
      logradouro: 'Rua Luis Pereira de Farias ',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 4,
      logradouro: 'Rua Madressilva',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 5,
      logradouro: 'Rua Arnaldo Pimentel ',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 6,
      logradouro: 'Rua Manoel Lubambo',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 7,
      logradouro: 'Rua Odilon Lima ',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 8,
      logradouro: 'Rua Bezerra de Palma',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 9,
      logradouro: 'Rua Carvalho de Mendoça',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 10,
      logradouro: 'Rua Francisco Porfirio',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 11,
      logradouro: 'Rua Carlos Alberto de Menezes',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 12,
      logradouro: 'Rua Santos Araujo',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    },
    {
      id: 13,
      logradouro: 'Rua Londrina',
      bairro: 'Afogados',
      cidade: 'Recife',
      cep: '50850030',
      complemento: '',
      acs: 'fulano',
      equipe_vinculada: '4'
    }

  ];

  constructor() { }

  getRuas(): Rua[] {
    return this.ruas;
  }

  getRuaById(id: number): Rua | undefined {
    return this.ruas.find(r => r.id === id);
  }

  buscarRuas(termo: string): Rua[] {
    if (!termo.trim()) {
      return this.ruas;
    }
    const termoLower = termo.toLowerCase();
    return this.ruas.filter(r =>
      r.logradouro.toLowerCase().includes(termoLower) ||
      r.bairro.toLowerCase().includes(termoLower) ||
      r.cidade.toLowerCase().includes(termoLower)
    );
  }
}

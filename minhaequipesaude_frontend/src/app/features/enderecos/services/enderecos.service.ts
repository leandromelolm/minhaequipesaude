import { inject, Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface RespostaApi {
  content: Endereco[];
}

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  private enderecos: Endereco[] = [];

  private http = inject(HttpClient);
  private readonly apiUrl = 'https://script.google.com/a/macros/a.recife.ifpe.edu.br/s/AKfycbxMv3JwHDFhOZEcrZBCTDwI3N8o-ilcBR45-BXRItJW7J5Rmrw2BhuoODpI72b8yTc/exec';

  constructor() { }

  getEnderecos(): Observable<Endereco[]> {
    return this.http.get<RespostaApi>(`${this.apiUrl}?action=read&sheetnumber=1`).pipe(
      map(resposta => resposta.content),
      tap(dados => {
        this.enderecos = dados;
        console.log('Dados salvos no service:', this.enderecos);
      })
    )
  }

  getRuaById(id: number): Endereco | undefined {
    return this.enderecos.find(e => e.id === id);
  }

  buscarEndereco(termo: string): Endereco[] {
    if (!termo.trim()) {
      return this.enderecos;
    }
    const termoLower = termo.toLowerCase();
    return this.enderecos.filter(e =>
      e.logradouro.toLowerCase().includes(termoLower) ||
      e.bairro.toLowerCase().includes(termoLower) ||
      e.cidade.toLowerCase().includes(termoLower)
    );
  }
}

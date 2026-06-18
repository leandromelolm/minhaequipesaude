import { inject, Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface RespostaApi {
  content: Endereco[];
}

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  private scriptId = environment.scriptId;
  private enderecos: Endereco[] = [];

  private http = inject(HttpClient);
  private readonly apiUrl = `https://script.google.com/a/macros/a.recife.ifpe.edu.br/s/${this.scriptId}/exec`;

  constructor() { }

  getEnderecos(): Observable<Endereco[]> {
    return this.http.get<RespostaApi>(`${this.apiUrl}?action=read&sheetnumber=1`).pipe(
      map(resposta => resposta.content),
      tap(dados => {
        this.enderecos = dados;
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

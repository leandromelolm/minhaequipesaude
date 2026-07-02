import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface RespostaApi {
  content: Endereco[];
}

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private scriptId = environment.scriptId;
  private readonly apiUrl = `https://script.google.com/a/macros/a.recife.ifpe.edu.br/s/${this.scriptId}/exec`;

  private readonly CACHE_KEY = 'enderecos_data';
  private readonly TIME_KEY = 'enderecos_last_fetch';
  private readonly CACHE_DURATION_MS = 300000; // 5 minutos

  private enderecosSignal = signal<Endereco[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const dadosSalvos = sessionStorage.getItem(this.CACHE_KEY);
      if (dadosSalvos) {
        this.enderecosSignal.set(JSON.parse(dadosSalvos));
      }
    }
  }

  getEnderecos(): Observable<Endereco[]> {

    if (isPlatformBrowser(this.platformId)) {
      const dadosSalvos = sessionStorage.getItem(this.CACHE_KEY);
      const ultimaRequisicao = sessionStorage.getItem(this.TIME_KEY);
      const agora = Date.now();

      if (dadosSalvos && ultimaRequisicao) {
        const tempoDecorrido = agora - parseInt(ultimaRequisicao, 10);
        if (tempoDecorrido < this.CACHE_DURATION_MS) {
          const dados = JSON.parse(dadosSalvos);
          this.enderecosSignal.set(dados);
          return of(dados);
        }
      }
    }

    return this.http.get<RespostaApi>(`${this.apiUrl}?action=read&sheetnumber=1`).pipe(
      map(resposta => resposta.content),
      tap(dados => {
        sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(dados));
        sessionStorage.setItem(this.TIME_KEY, Date.now().toString());
        this.enderecosSignal.set(dados);
      })
    );
  }

  getRuaById(id: number): Endereco | undefined {
    return this.enderecosSignal().find(e => e.id === id);
  }

  buscarEndereco(termo: string): Endereco[] {
    const listaAtual = this.enderecosSignal();
    if (!termo.trim()) {
      return listaAtual;
    }
    const termoLower = termo.toLowerCase();
    return listaAtual.filter(e =>
      e.logradouro.toLowerCase().includes(termoLower) ||
      e.bairro.toLowerCase().includes(termoLower) ||
      e.cidade.toLowerCase().includes(termoLower)
    );
  }
}
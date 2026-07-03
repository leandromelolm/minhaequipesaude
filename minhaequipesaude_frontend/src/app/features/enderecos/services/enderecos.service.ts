import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface RespostaBuscaApi {
  success: boolean;
  data: Endereco | null;
  message?: string;
  error?: string;
}

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

  buscarEnderecoPorLogradouroENumero(inputUsuario: string): Observable<Endereco | null> {
    if (!inputUsuario || !inputUsuario.trim()) {
      return of(null);
    }

    // 1. Tratamento inicial: remove a vírgula caso o usuário coloque "Rua X, 150"
    let textoLimpo = inputUsuario.replace(/,/g, '').trim();

    // 2. Expressão Regular para capturar o número isolado no final da string
    // (\d+\s*[a-zA-Z]?|\bS\/N\b)$ foca em pegar números no fim (Ex: "150", "150A" ou "S/N")
    const regexNumeroNoFim = /(\d+\s*[a-zA-Z]?|\bS\/N\b)$/i;
    const match = textoLimpo.match(regexNumeroNoFim);

    let logradouro = textoLimpo;
    let numero = '';

    if (match) {
      numero = match[0].trim();
      // O logradouro vira tudo que está antes do número capturado
      logradouro = textoLimpo.substring(0, match.index).trim();
    }

    // Se por acaso não achar número nenhum digitado, envia o texto todo como logradouro e número vazio
    if (!numero) {
      logradouro = textoLimpo;
    }

    // 3. Monta a URL sanitizando os parâmetros para Query String (encodeURIComponent)
    const urlBusca = `${this.apiUrl}?action=search&logradouro=${encodeURIComponent(logradouro)}&numero=${encodeURIComponent(numero)}`;

    // 4. Faz a requisição HTTP retornando o objeto retornado pelo Apps Script
    return this.http.get<RespostaBuscaApi>(urlBusca).pipe(
      map(resposta => {
        if (resposta.success && resposta.data) {
          return resposta.data; // Retorna o objeto Endereco encontrado
        }
        return null; // Caso não encontre ou dê erro interno na API
      })
    );
  }
}
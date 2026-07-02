import { inject, Injectable } from '@angular/core';
import { Profissional } from '../models/profissional.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { log } from 'console';

interface RespostaApi {
  content: Profissional[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {

  private scriptId = environment.scriptId;
  private readonly apiUrl = `https://script.google.com/a/macros/a.recife.ifpe.edu.br/s/${this.scriptId}/exec?action=read&sheetnumber=2`;

  private readonly CACHE_KEY = 'profissionais_data';
  private readonly TIME_KEY = 'profissionais_last_fetch';
  private readonly CACHE_DURATION_MS = 300000; // 5 minutos

  constructor(private http: HttpClient) { }

  getProfissionais(): Observable<Profissional[]> {
    const dadosSalvos = sessionStorage.getItem(this.CACHE_KEY);
    const ultimaRequisicao = sessionStorage.getItem(this.TIME_KEY);
    const agora = Date.now();

    if (dadosSalvos && ultimaRequisicao) {
      const tempoDecorrido = agora - parseInt(ultimaRequisicao, 10);

      if (tempoDecorrido < this.CACHE_DURATION_MS) {
        return of(JSON.parse(dadosSalvos));
      }
    }

    return this.http.get<RespostaApi>(this.apiUrl).pipe(
      map(response => response.content),
      tap(profissionais => {
        sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(profissionais));
        sessionStorage.setItem(this.TIME_KEY, agora.toString());
      })
    );
  }

  getProfissionais2(): Observable<Profissional[]> {
    return this.http.get<RespostaApi>(this.apiUrl).pipe(
      map(response => response.content)
    );
  }
}

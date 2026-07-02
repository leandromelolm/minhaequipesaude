import { inject, Injectable } from '@angular/core';
import { Profissional } from '../models/profissional.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getProfissionais(): Observable<Profissional[]> {
    return this.http.get<RespostaApi>(this.apiUrl).pipe(
      map(response => response.content)
    );
  }
}

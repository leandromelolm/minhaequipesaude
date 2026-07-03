import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Endereco } from './models/endereco.model';
import { EnderecosService } from './services/enderecos.service';
import { finalize, Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.css'
})
export class EnderecosComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  termoBusca: string = '';
  enderecoSelecionado: Endereco | null = null;

  private enderecoService = inject(EnderecosService);
  enderecos$!: Observable<Endereco[]>;

  carregandoApi: boolean = false;
  buscaApiSemResultado: boolean = false;

  listaDeEnderecos: Endereco[] = [];
  private sub!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.buscaApiSemResultado = false;
      this.enderecos$ = this.enderecoService.getEnderecos();
    }
  }

  buscar(): void {
    if (!this.termoBusca || !this.termoBusca.trim()) {
      this.carregarDadosIniciais();
      return;
    }
    const resultadoFiltrado = this.enderecoService.buscarEndereco(this.termoBusca);
    this.enderecos$ = of(resultadoFiltrado);
  }

  selecionarRua(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
  }

  fecharDetalhes(): void {
    this.enderecoSelecionado = null;
  }

  buscarEnderecoComNumero(logradouro: string): void {
    if (!logradouro || !logradouro.trim()) return;

    this.carregandoApi = true;
    this.buscaApiSemResultado = false;
    this.enderecoSelecionado = null;

    this.enderecoService.buscarEnderecoPorLogradouroENumero(logradouro)
      .pipe(

        finalize(() => {
          this.carregandoApi = false;
        })
      )
      .subscribe({
        next: (endereco) => {
          if (endereco) {
            // console.log("Endereço encontrado na API:", endereco);
            this.enderecos$ = of([endereco]);
            this.buscaApiSemResultado = false;
          } else {
            // console.log("API retornou null (não encontrado).");
            this.buscaApiSemResultado = true;
            this.enderecos$ = of([]);
          }
        },
        error: (err) => {
          console.error("Erro na requisição da API:", err);
          this.buscaApiSemResultado = true;
          this.enderecos$ = of([]);
        }
      });
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.enderecoSelecionado = null;
    this.buscaApiSemResultado = false;
    this.recargarListaCompleta();
  }

  private recargarListaCompleta(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.enderecos$ = this.enderecoService.getEnderecos();
    }
  }

  getDataTest(): void {
    this.sub = this.enderecoService.getEnderecos().subscribe({
      next: (dados) => {
        this.listaDeEnderecos = dados;
      },
      error: (err) => console.error('Erro ao buscar endereços', err)
    });
  }
}

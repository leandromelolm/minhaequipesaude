import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Endereco } from './models/endereco.model';
import { EnderecosService } from './services/enderecos.service';
import { Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.css'
})
export class EnderecosComponent implements OnInit {
  termoBusca: string = '';
  enderecoSelecionado: Endereco | null = null;

  private enderecoService = inject(EnderecosService);
  enderecos$!: Observable<Endereco[]>;

  listaDeEnderecos: Endereco[] = [];
  private sub!: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.getDataTest()
    this.enderecos$ = this.enderecoService.getEnderecos();
  }

  buscar(): void {
    const resultadoFiltrado = this.enderecoService.buscarEndereco(this.termoBusca);
    this.enderecos$ = of(resultadoFiltrado);
  }

  selecionarRua(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
  }

  fecharDetalhes(): void {
    this.enderecoSelecionado = null;
  }

  getDataTest(): void {
    this.sub = this.enderecoService.getEnderecos().subscribe({
      next: (dados) => {
        this.listaDeEnderecos = dados;
        console.log('Dados recebidos:', this.listaDeEnderecos);
      },
      error: (err) => console.error('Erro ao buscar endereços', err)
    });
  }
}

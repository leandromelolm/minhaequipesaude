import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Endereco } from './models/endereco.model';
import { EnderecosService } from './services/enderecos.service';


@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.css'
})
export class EnderecosComponent implements OnInit {
  termoBusca: string = '';
  ruasFiltradas: Endereco[] = [];
  ruaSelecionada: Endereco | null = null;
  private todosOsEnderecos: Endereco[] = [];

  constructor(private enderecoService: EnderecosService) { }

  ngOnInit(): void {
    this.todosOsEnderecos = this.enderecoService.getEnderecos();
    this.ruasFiltradas = this.todosOsEnderecos;
  }

  buscar(): void {
    this.ruasFiltradas = this.enderecoService.buscarEndereco(this.termoBusca);
  }

  selecionarRua(endereco: Endereco): void {
    this.ruaSelecionada = endereco;
  }

  fecharDetalhes(): void {
    this.ruaSelecionada = null;
  }
}

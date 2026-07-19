import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnderecosService } from '../enderecos/services/enderecos.service';
import { Profissional } from '../profissionais/models/profissional.model';
import { Endereco } from '../enderecos/models/endereco.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profissional-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './profissional-detalhes.component.html',
  styleUrl: './profissional-detalhes.component.scss'
})
export class ProfissionalDetalhesComponent implements OnInit {
  private enderecosService = inject(EnderecosService);

  profissional = input.required<Profissional>();

  ruasFiltradas = signal<Endereco[]>([]);
  carregandoRuas = signal<boolean>(false);
  ruaSelecionada = signal<string>('');

  ngOnInit(): void {
    this.obterERunirEnderecos();
  }

  private obterERunirEnderecos() {
    this.carregandoRuas.set(true);

    this.enderecosService.getEnderecos().subscribe({
      next: (todosEnderecos) => {
        const microProfissional = String(this.profissional().micro || '').trim().toLowerCase();

        const filtradas = todosEnderecos.filter(end =>
          end.micro && String(end.micro).trim().toLowerCase() === microProfissional
        );

        this.ruasFiltradas.set(filtradas);
        this.carregandoRuas.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar ruas para detalhes do profissional:', err);
        this.carregandoRuas.set(false);
      }
    });
  }

  enviarMensagemAcs() {
    const contatoRaw = this.profissional().contato;
    if (!contatoRaw) {
      alert('Este profissional não possui contato cadastrado.');
      return;
    }

    const telefone = String(contatoRaw).replace(/\D/g, '');
    const logradouro = this.ruaSelecionada();

    if (!logradouro) {
      alert('Por favor, selecione uma rua antes de enviar a mensagem.');
      return;
    }

    const textoMensagem = `Olá, sou morador do logradouro *${logradouro}* e gostaria de falar com meu Agente Comunitário de Saúde.`;
    const urlWhatsapp = `https://wa.me/55${telefone}?text=${encodeURIComponent(textoMensagem)}`;

    window.open(urlWhatsapp, '_blank');
  }
}
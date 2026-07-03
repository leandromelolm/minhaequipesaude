export interface Endereco {
  id: number;
  logradouro: string;
  numero?: string | number;
  micro?: string;
  bairro: string;
  cidade: string;
  cep: string;
  complemento: string;
  observacao?: string[];
  acs: string;
  equipe_vinculada?: string;
}

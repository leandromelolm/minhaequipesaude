export interface Rua {
  id: number;
  logradouro: string;
  bairro: string;
  cidade: string;
  cep: string;
  complemento: string;
  observacao?: string[];
  acs: string;
  equipe_vinculada?: string;
}

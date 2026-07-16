export interface Profissional {
  id: number;
  nome: string;
  funcao?: string;
  especialidade: string;
  registro: string;
  descricao: string;
  equipe?: string | number;
  contato?: string | number;
  unidade?: string;
  url_foto?: string;
}

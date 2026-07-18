export interface Profissional {
  id: number;
  nome: string;
  funcao?: string;
  especialidade: string;
  registro: string;
  micro: string;
  equipe?: string | number;
  contato?: string | number;
  unidade?: string;
  url_foto?: string;
}

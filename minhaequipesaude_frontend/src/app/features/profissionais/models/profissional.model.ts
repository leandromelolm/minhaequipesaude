export interface Profissional {
  id: number;
  nome: string;
  funcao?: string;
  especialidade: string;
  registro: string;
  descricao: string;
  equipe?: string | number;
  unidade?: string;
}

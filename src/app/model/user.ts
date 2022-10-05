import { Profissao } from './profissao';
import { Telefone } from './telefone';

export class User {
	id!: Number;
	login!: string;
	senha!: string;
	nome!: string;
	cpf!: string;
	cep!: string;
	dataNascimento!:String;
	telefones = Array<Telefone>();
	profissao: Profissao=new Profissao();
	salario!:DoubleRange;

}


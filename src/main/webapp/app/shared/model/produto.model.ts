import { Moment } from 'moment';

export interface IProduto {
    id?: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    dataVencimento?: Moment;
}

export class Produto implements IProduto {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public preco?: number,
        public dataVencimento?: Moment
    ) {}
}

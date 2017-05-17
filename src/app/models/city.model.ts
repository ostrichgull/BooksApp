import { State } from './state.model';

export class City {
    constructor(
        public id: number, 
        public name: string,
        public countryID: number,
        public state: State
        ){}
}
import { Country } from './country.model';

export class State {
    constructor(
        public id: number, 
        public name: string,
        public countryID: number,
        public country: Country
        ){}
}
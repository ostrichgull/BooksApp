import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { Country } from '../../models/country.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  Action = Action;

  private entities: Country[];
  private entitiesOperation:Observable<Country[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<Country>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("countries");
    this.load();      
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);                          
  }

  edit(action:string, id:string) {

    this.router.navigate([`/countries/details/${action}/${id}`]);

  }

}

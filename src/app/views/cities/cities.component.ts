import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { City } from '../../models/city.model';
import { State } from '../../models/state.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  Action = Action;

  private entities: City[];
  private entitiesOperation:Observable<City[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<City>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("cities");
    this.load();    
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);   
                             
  }

  edit(action:string, id:string) {

    this.router.navigate([`/cities/details/${action}/${id}`]);

  }

}

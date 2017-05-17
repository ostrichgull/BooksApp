import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { State } from '../../models/state.model';
import { Country } from '../../models/country.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  Action = Action;

  private entities: State[];
  private entitiesOperation:Observable<State[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<State>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("states");
    this.load();
    
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);   
                             
  }

  edit(action:string, id:string) {

    this.router.navigate([`/states/details/${action}/${id}`]);

  }

}

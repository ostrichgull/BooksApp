import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { PersonType } from '../../models/person-type.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-person-types',
  templateUrl: './person-types.component.html',
  styleUrls: ['./person-types.component.css']
})
export class PersonTypesComponent implements OnInit {

  Action = Action;

  private entities: PersonType[];
  private entitiesOperation:Observable<PersonType[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<PersonType>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("persontypes");
    this.load();
    
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);   
                             
  }

  edit(action:string, id:string) {

    this.router.navigate([`/persontypes/details/${action}/${id}`]);

  }


}

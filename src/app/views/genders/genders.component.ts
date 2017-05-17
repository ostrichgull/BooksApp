import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { Gender } from '../../models/gender.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent implements OnInit {

  Action = Action;

  private entities: Gender[];
  private entitiesOperation:Observable<Gender[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<Gender>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("genders");
    this.load();
    
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);   
                             
  }

  edit(action:string, id:string) {

    this.router.navigate([`/genders/details/${action}/${id}`]);

  }
}

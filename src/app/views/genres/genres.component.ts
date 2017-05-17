import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { Genre } from '../../models/genre.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  Action = Action;

  private entities: Genre[];
  private entitiesOperation:Observable<Genre[]>;
  
  private err: string;

  constructor(private entitiesService: GenericService<Genre>, private router: Router) { }

  ngOnInit() {        
    this.entitiesService.setUrl("genres");
    this.load();
    
  }

  load() {
  
    this.entitiesOperation = this.entitiesService.getList();

    this.entitiesOperation.subscribe(
                              entities => this.entities = entities,
                              err => this.err = err);   
                             
  }

  edit(action:string, id:string) {

    this.router.navigate([`/genres/details/${action}/${id}`]);

  }

}

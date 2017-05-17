import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { Genre } from '../../../models/genre.model';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.css']
})
export class GenreDetailsComponent implements OnInit {

  Action = Action;

  private entity = new Genre(0, '');
  private entityOperation:Observable<Genre>;

  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private entityService: GenericService<Genre>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();
    this.entityService.setUrl("genres");

    if (this.editId != "0")
      this.load();

  }

  load() {

    this.entityOperation = this.entityService.getItem(this.editId);

    this.entityOperation.subscribe(
                              entity => this.entity = entity,
                              err => {
                                  console.log(err);
                              });
  }

  submit() {

    switch (this.action) {

      case Action[Action.New]:
        this.entityOperation = this.entityService.addItem(this.entity);
        break;

      case Action[Action.Edit]:
        this.entityOperation = this.entityService.updateItem(this.entity);
        break;

      case Action[Action.Delete]:
        this.entityOperation = this.entityService.removeItem(this.editId);
        break; 
    }

    this.entityOperation.subscribe(
                              () => this.router.navigate(['/genres']),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Add New Genre';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit Genre';
        break;

      case Action[Action.Detail]:
        this.title = 'Genre Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this genre?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/genres']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }

}

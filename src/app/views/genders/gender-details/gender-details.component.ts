import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { Gender } from '../../../models/gender.model';
import { GenericService } from '../../../services/generic.service';


@Component({
  selector: 'app-gender-details',
  templateUrl: './gender-details.component.html',
  styleUrls: ['./gender-details.component.css']
})
export class GenderDetailsComponent implements OnInit {

  Action = Action;

  private entity = new Gender(0, '');
  private entityOperation:Observable<Gender>;

  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private entityService: GenericService<Gender>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();
    this.entityService.setUrl("genders");

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
                              () => this.router.navigate(['/genders']),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Add New Gender';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit Gender';
        break;

      case Action[Action.Detail]:
        this.title = 'Gender Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this Gender?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/genders']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }


}

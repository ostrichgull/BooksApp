import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { State } from '../../../models/state.model';
import { Country } from '../../../models/country.model';
import { GenericService } from '../../../services/generic.service';
import { StatesService } from '../../../services/states.service';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css']
})
export class StateDetailsComponent implements OnInit {
  
  Action = Action;

  private country = new Country(0, '');
  private entity = new State(0, '', 0, this.country);

  private countries: Country[];

  private entityOperation:Observable<State>;
  private countriesOperation:Observable<Country[]>;

  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private entityService: StatesService, private countriesService: GenericService<Country>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();
    this.countriesService.setUrl("countries");

    if (this.editId != "0")
      this.load();

    this.loadCountries();
  }

  load() {

    this.entityOperation = this.entityService.getItem(this.editId);

    this.entityOperation.subscribe(
                              entity => this.entity = entity,
                              err => {
                                  console.log(err);
                              });
  }

  loadCountries() {
  
    this.countriesOperation = this.countriesService.getList();

    this.countriesOperation.subscribe(
                              countries => this.countries = countries,
                              err => this.err = err);    
  }

  submit() {

    this.entity.country = this.countries.find(c => c.id === +this.entity.countryID);

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
                              () => this.router.navigate(['/states']),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Add New State';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit State';
        break;

      case Action[Action.Detail]:
        this.title = 'State Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this State?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/states']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }


}

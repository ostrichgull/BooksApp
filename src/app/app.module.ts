import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { GenericService } from './services/generic.service';
import { StatesService } from './services/states.service';

import { AppComponent } from './app.component';
import { GenresComponent } from './views/genres/genres.component';
import { GenreDetailsComponent } from './views/genres/genre-details/genre-details.component';
import { PersonTypesComponent } from './views/person-types/person-types.component';
import { PersonTypeDetailsComponent } from './views/person-types/person-type-details/person-type-details.component';
import { GendersComponent } from './views/genders/genders.component';
import { GenderDetailsComponent } from './views/genders/gender-details/gender-details.component';
import { CountriesComponent } from './views/countries/countries.component';
import { CountryDetailsComponent } from './views/countries/country-details/country-details.component';
import { StatesComponent } from './views/states/states.component';
import { StateDetailsComponent } from './views/states/state-details/state-details.component';
import { CitiesComponent } from './views/cities/cities.component';
import { CityDetailsComponent } from './views/cities/city-details/city-details.component';

const appRoutes: Routes = [
  { path: 'genres', component: GenresComponent },
  { path: 'genres/details/:action/:id', component: GenreDetailsComponent },
  { path: 'persontypes', component: PersonTypesComponent },
  { path: 'persontypes/details/:action/:id', component: PersonTypeDetailsComponent },
  { path: 'genders', component: GendersComponent },
  { path: 'genders/details/:action/:id', component: GenderDetailsComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/details/:action/:id', component: CountryDetailsComponent },
  { path: 'states', component: StatesComponent },
  { path: 'states/details/:action/:id', component: StateDetailsComponent },
  { path: 'cities', component: CitiesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    GenreDetailsComponent,
    PersonTypesComponent,
    PersonTypeDetailsComponent,
    GendersComponent,
    GenderDetailsComponent,
    CountriesComponent,
    CountryDetailsComponent,
    StatesComponent,
    StateDetailsComponent,
    CitiesComponent,
    CityDetailsComponent    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule    
  ],
  providers: [ 
    GenericService,
    StatesService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

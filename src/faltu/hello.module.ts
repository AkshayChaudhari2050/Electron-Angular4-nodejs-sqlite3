import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }        from './app.master.component';
import { HeroDetailComponent } from './hero-detail.component';
import { TwoWayBindingComponent } from './two-way-binding.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    TwoWayBindingComponent
  ],
  bootstrap: [ AppComponent,HeroDetailComponent,TwoWayBindingComponent]
})
export class AppModule { }
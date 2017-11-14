import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import {StudentComponent} from './student.component';
import {StudentService} from './student.service'
@NgModule({
    declarations:[
        StudentComponent
    ],
    imports:[
        CarouselModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers:[StudentService],
    bootstrap:[StudentComponent]
})

export class AppModule{}



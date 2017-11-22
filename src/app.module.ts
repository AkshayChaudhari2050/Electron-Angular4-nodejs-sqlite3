import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ng2-bootstrap/carousel';

import { TaskComponent } from './Task/app.component'
// import { AppComponent } from './faltu/app.master.component';
// import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './app-route'
import { NAppComponent } from './app.component';
import { StudentService } from './student/student.service'
import { TaskService } from './Task/tasks.service'
import { RouterModule } from '@angular/router';
import { StudentDetailComponent } from './app/student-detail/student-detail.component';
import { HellocomponentComponent } from './app/hellocomponent/hellocomponent.component'

@NgModule({
    declarations: [
        StudentComponent,
        TaskComponent,
        NAppComponent,
        StudentDetailComponent,
        HellocomponentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule, BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [StudentService, TaskService],
    bootstrap: [NAppComponent]
})

export class AppModule { }



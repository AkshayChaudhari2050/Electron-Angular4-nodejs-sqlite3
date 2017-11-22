import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent }   from './faltu/app.master.component';
import { TaskComponent } from './Task/app.component';
// import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailComponent } from './app/student-detail/student-detail.component'
import { HellocomponentComponent } from './app/hellocomponent/hellocomponent.component'
const routes: Routes = [
  { path: 'Task', component: TaskComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'StudentDetail', component: StudentDetailComponent}
  ,{ path: 'Hello', component: HellocomponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

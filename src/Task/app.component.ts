import { Component } from '@angular/core';
import { Owner } from './owner';
import { TaskService } from './tasks.service';
import { Task } from './Task'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TaskService]
})
export class AppComponent {

    newTask: Task = new Task();
    constructor(private tasksService: TaskService) {
    }
    
    get tasks() {
        return this.tasksService.getTasklist();
    }
    addTask() {
        this.tasksService.addTask(this.newTask)
        this.newTask = new Task()
    }
    getRdmImage(id: number): String {
        return "assets/img/time" + id + ".jpg";
    }
    removeTask(task){
        this.tasksService.deleteTask(task.id)
    }
    updateTask(id:number){
        this.tasksService.updateTaskById(id,Task)
    }
}

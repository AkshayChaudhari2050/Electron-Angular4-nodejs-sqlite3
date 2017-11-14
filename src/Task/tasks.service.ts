import { Injectable } from '@angular/core'
import { Task } from './task'
import { TASKS } from './mock-tasks';

@Injectable()
export class TaskService {
    taskList: Task[];
    currantId: number;
    constructor() {
        this.taskList = TASKS
        this.currantId = this.taskList.length
    }
    addTask(newTask: Task) {
        let newID = ++this.currantId;
        newTask.id = newID
        this.taskList.push(newTask)
    }
    deleteTask(id: number) {
        this.taskList = this.taskList
            .filter(task => task.id !== id)
    }
    getTasklist(): Task[] {
        return this.taskList;
    }
    getTaskById(id: number) {
        return this.taskList
            .filter(Task => Task.id === id)
            .pop();
    }
    updateTaskById(id: number, value: Object = {}) {
        let Task = this.getTaskById(id)
        Object.assign(Task, value)
        return Task
    }
}

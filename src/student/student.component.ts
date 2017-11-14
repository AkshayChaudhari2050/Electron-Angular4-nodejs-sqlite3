import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Observable } from 'rxjs/Observable';
import { Student } from './student'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { StringDecoder } from 'string_decoder';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    providers: [StudentService]
})
export class StudentComponent implements OnInit {

    Students: any = [];
    Stud: Student[]
    constructor(private studentService: StudentService, public http: Http) { }
    ngOnInit() {
        this.getStudent()
    }
    getStudent() {
        this.studentService.getAllStudent().subscribe(Students => {
            this.Students = Students
        })
    }
    add(grno: number, studentName: string, Std: string, Div: string): void {
        if (!studentName) { return; }
        this.studentService.addStudent({ grno, studentName, Std, Div } as Student)
            .subscribe();
        this.getStudent()
    }

    deleteStudent(studentid:any) {
        var stud=this.Stud
        this.studentService.deleteStudent(studentid).subscribe(data=>{
            if(data.n==1){
                for(var i=0;i<stud.length;i++){
                    if(stud[i].studentid==studentid){
                        stud.slice(i,1)
                    }
                }
            }
        })
        alert("Student deleted Success");
        this.getStudent()
    }
    addStudent(Std: Student) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post('http://127.0.0.1:3000/api/Student', JSON.stringify(Std), { headers: headers }).subscribe();
        alert("Student Detail Inserted");
    }
    // addStudent(grno,studentName,Std,Div) {
    //    let student = { grno: grno, studentName: studentName, Std: Std, Div: Div }
    //     this.studentService.addStudent(this.student).subscribe(
    //         data => {
    //            this.studentService.getAllStudent().subscribe()
    //             return true;
    //         },
    //         error => {
    //             console.error("Error saving food!");
    //             return Observable.throw(error);
    //         }
    //     )
    //}
}




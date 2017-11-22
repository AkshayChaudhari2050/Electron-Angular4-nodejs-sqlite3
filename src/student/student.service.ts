import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Student } from './student'

@Injectable()
export class StudentService {
    constructor(private http: Http) { }
    Student: Student[];
    getAllStudent() {
        return this.http.get('http://127.0.0.1:3000/api/Students')
            .map(res => res.json())
    }

    public addStudent(Student: Student) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(Student);
        return this.http.post('http://127.0.0.1:3000/api/Student', body, options).map((res: Response) => res.json())
    }
    deleteStudent(studentid: number) {
        return this.http.delete('http://127.0.0.1:3000/api/student/' + studentid).map((res: Response) => res.json())
    }
    getStudentById(studentid: number) {
        return this.http.get("http://127.0.0.1:3000/api/student/" + studentid).map((res: Response) => res.json())
    }
    updateStudennt(Student: Student) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(Student);
        return this.http.post("http://127.0.0.1:3000/api/student/" + Student.studentid, body, options).map((res: Response) => res.json())
    }
} 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/student';

@Injectable()
export class StudentsService {

  constructor(private http: HttpClient) { }

  doRegisterStudent(data, index){
    let studentList = JSON.parse(localStorage.getItem('students'));
    let returnData;
    console.log("index", index);
    if(index != null) {


      for (var i = 0; i < studentList.length; i++) {
        if (index != i && studentList[i].address == data.address) {
          returnData = {
            code : 503,
            message : "Address Is Already In Use!!!",
            data : null
          }    
          return returnData;
        }
      }

      studentList[index] = data;
      localStorage.setItem('students',JSON.stringify(studentList));
      returnData = {
        code : 200,
        message : "Student Successfully Updated!!",
        data : JSON.parse(localStorage.getItem('students'))
      }    
    }else{      
      data.id = this.generateRandomID();
      for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].address == data.address) {
          returnData = {
            code : 503,
            message : "Address Is Already In Use!!",
            data : null
          }    
          return returnData;
        }
      }
      studentList.unshift(data);

      localStorage.setItem('students',JSON.stringify(studentList));

      returnData = {
        code : 200,
        message : "Student Successfully Added!!!!",
        data : JSON.parse(localStorage.getItem('students'))
      }    
    }
    return returnData;
  }

  
  getStudentDetails(index:number){
    let studentList = JSON.parse(localStorage.getItem('students'));

    let returnData = {
      code : 200,
      message : "Student Details Fetched!!!!",
      studentData : studentList[index]
    }

    return returnData;
  }

  generateRandomID() {
    var x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }



  rootURL = '/api';

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/add', data);
  }
  createStudent(student: any) {
    let studentList = JSON.parse(localStorage.getItem('students'));
    student.id = this.generateRandomID();
    studentList.unshift(student);
    localStorage.setItem('students',JSON.stringify(studentList));
    return this.http.post('http://localhost:8080/api/student/add', {student});
  }
  updateStudent(student: any, index) {
    let studentList = JSON.parse(localStorage.getItem('students'));
    studentList[index] = student;
    localStorage.setItem('students',JSON.stringify(studentList));
    return this.http.post('http://localhost:8080/api/student/add', {student});
  }
 

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteStudent(id): Observable<any> {
    let studentList = JSON.parse(localStorage.getItem('students'));
    studentList.splice(id, 1);
    localStorage.setItem('students',JSON.stringify(studentList));
    // return this.http.delete('http://localhost:8080/api/deleteStudent');
    // return this.http.delete(`http://localhost:8080/api/deleteStudent/${id}`);
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${baseUrl}?first_name=${name}`);
  }
}

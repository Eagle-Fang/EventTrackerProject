import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Job } from '../models/job';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:8086/';
//  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/jobs';


  constructor( private http: HttpClient, private router: Router) {}


  index() {
    return this.http.get<Job[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('JobService.index() Error');
        })
      );
  }

  create(newJob: Job) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<Job>(this.url, newJob, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log('Error in create' + err);
          return throwError('JobService.create() Error');
        })
      );
  }

  // getJobById(id: number) {
  //   return this.http.get<Job>(this.url + '/' + id).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError('Error in JObService.getJobById()');
  //     })
  //   );
  // }

  update(editJob: Job) {
    const id = editJob.id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put<Job>(this.url + '/' + id, editJob, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log('Error in update' + err);
          return throwError('JobService.update() Error');
        })
      );
  }

  destroy(id: number) {
    return this.http.delete<Job>(this.url + '/' + id)
      .pipe(
        catchError((err: any) => {
          console.log('Error in delete' + err);
          return throwError('JobService.delete() Error');
        })
      );
  }

}





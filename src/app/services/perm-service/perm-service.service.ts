import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PermServiceService {

  constructor(private http: HttpClient) { }

  checkPerm (route: string): Observable<boolean> {
    if (route.match('comp$'))
      return of(true);
    return this.http.post<boolean>('http://localhost:88/Api/CheckPerm', {route}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).pipe(catchError(err => of(false)))
  }
}

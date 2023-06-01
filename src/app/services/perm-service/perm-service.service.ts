import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, catchError, of, share, take } from 'rxjs'

@Injectable()
export class PermServiceService {

  constructor(private http: HttpClient) { }

  roles: string[] | undefined;

  rolesProcess: Observable<any> | undefined;

  clicked = false;

  checkPerm (route: string): Observable<boolean> {
    if (route.match('comp$'))
      return of(true);
    return this.http.post<boolean>('http://localhost:88/Api/CheckPerm', {route}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).pipe(catchError(err => of(false)))
  }

  // Using IIFE to encapsulate roleProcess and subList
  getRoles() : {ready: true, result: string[]} | {ready: false, result?:Observable<any>} {
    if (this.roles)
      return {ready: true, result: this.roles};

    if (!this.rolesProcess)
      return {ready: false};

    return {ready: false, result: this.rolesProcess}
  }
  

  private setRoles() {
    this.rolesProcess = new Observable<any>((sub) => {
      this.http.get('http://localhost:88/Api/CheckPerm').pipe(take(1)).subscribe({ error: (err) => {
      sub.next(['ads']);
    }});
    }).pipe(share())
  }


  // subToRolesProcess ()
}

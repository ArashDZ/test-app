import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, catchError, of, take } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PermServiceService {

  constructor(private http: HttpClient) { }

  roles: string[] | undefined;

  rolesProcess: Observable<any> | undefined;

  checkPerm (route: string): Observable<boolean> {
    if (route.match('comp$'))
      return of(true);
    return this.http.post<boolean>('http://localhost:88/Api/CheckPerm', {route}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).pipe(catchError(err => of(false)))
  }

  // Using IIFE to encapsulate roleProcess and subList
  getRoles: () => {ready: true, result: string[]} | {ready: false, result: Observable<any>} = this.getRolesIIFE(); 
  

  private getRolesIIFE () {

    let rolesProcess: Observable<any> | undefined;
    let subList: Subscriber<any>[] = [];

    return ((): {ready: true, result: string[]} | {ready: false, result: Observable<any>} => {
      if (this.roles)
        return {ready: true, result: this.roles}

      if (rolesProcess)
        return {ready: false, result: rolesProcess}

      subList = [];

      this.http.get('http://localhost:88/Api/CheckPerm').pipe(take(1)).subscribe({ error: (err) => {
        subList.forEach(x => {
          this.roles = ['assd']
          x.next(this.roles);
          x.unsubscribe();
        })

        subList = [];
      }});

      rolesProcess = new Observable<any> ((sub: Subscriber<any>) => {
        subList.push(sub);
        return () => sub.unsubscribe();
      })

      return {ready: false, result: rolesProcess};

    })
  }


  // subToRolesProcess ()
}

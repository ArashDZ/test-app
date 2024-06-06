import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber, Subscription, catchError, of, share, take } from 'rxjs'
import { ExpiredDialogComponent } from 'src/app/expired-dialog/expired-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PermServiceService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  roles: string[] | undefined;

  rolesProcess: Observable<any> | undefined;

  clicked = false;

  checkPerm (route: string): Observable<boolean> {
    if (route.match('comp$'))
      return of(true);
    return this.http.post<boolean>('http://localhost:88/Api/CheckPerm', {route}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).pipe(catchError(err => of(false)))
  }

  getRoles() : {ready: true, result: string[]} | {ready: false, result?:Observable<any>} {
    if (this.roles)
      return {ready: true, result: this.roles};

    if (!this.rolesProcess)
      return {ready: false};

    return {ready: false, result: this.rolesProcess}
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ExpiredDialogComponent, {disableClose: true, direction: 'rtl'});

    dialogRef.afterClosed().subscribe(res => {
      console.log("Idk");
      
    })

    // setTimeout(() => dialogRef.close(), 2000)
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

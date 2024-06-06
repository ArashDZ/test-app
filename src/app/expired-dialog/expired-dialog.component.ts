import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expired-dialog',
  templateUrl: './expired-dialog.component.html',
  styleUrls: ['./expired-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule]
})
export class ExpiredDialogComponent {

  frameSrc = 'https://varzesh3.com';

  constructor(private dialogRef: DialogRef, private router: Router) { }

  changeSrc() {
    switch(Math.floor(Math.random() * 3)) {
      case 0:
        this.frameSrc = 'https://varzesh3.com';
        break;
      case 1:
        this.frameSrc = 'https://tarafdari.com';
        break;
      case 2:
        this.frameSrc = 'https://wikipedia.org';
        break;
    }

    this.router.navigateByUrl('/third-module/third-child');
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

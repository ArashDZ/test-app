import { Component, EnvironmentInjector, HostListener, Inject, inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { map } from 'rxjs';
import { ThirdComponent } from '../third.component';

export const canDeactivateGuard = (component?: any, currentRoute?: any, currentState?: any, nextState?: any) => {
  console.log(component);
  // console.log(inject(ThirdComponent));
    
  if (component?.confirmLeave == false)
    return true;

  
  const dialog = inject(MatDialog)
  const dialogRef = dialog.open<CanDeactivateThirdPopup, any, boolean>(CanDeactivateThirdPopup, {width: '500px', height: 'max-content', autoFocus: 'dialog', data: {from: currentState?.url, to: nextState?.url}});
  return dialogRef.afterClosed().pipe(map(x => x ?? false));
};

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatCommonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          Leaving the Page
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        Do you want to go from "{{data.from}}" to "{{data.to}}"?
      </mat-card-content>
      <mat-card-actions [align]="'end'">
        <button mat-button color="warn" (click)="thisRef.close(false)" > no </button>
        <button mat-button color="primary" (click)="thisRef.close(true)" > yes </button>
      </mat-card-actions>
    </mat-card>
  `
})
class CanDeactivateThirdPopup {
  constructor(
    public thisRef: MatDialogRef<CanDeactivateThirdPopup>,
    @Inject(MAT_DIALOG_DATA) public data: {from: string, to: string},
    ) { }
}
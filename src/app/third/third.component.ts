import { AfterViewInit, Component, HostListener, NgModuleRef, OnInit, ViewChild, inject } from '@angular/core';
import { SecondModuleModule } from '../second-module/second-module.module';
import { SecondService } from '../services/second/second.service';
import { NgForm } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabGroupBaseHeader } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { EMPTY, catchError, firstValueFrom, take } from 'rxjs';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit, AfterViewInit {
 
  txt: string = "";
  index = 1;

  @ViewChild(MatTabGroup) tabs!: MatTabGroup;

  confirmLeave: boolean = true;
 
  constructor(
    private sS: SecondService,
    private http: HttpClient
  ) { }

  // inCha(event: any) {
  //   console.log(event);
  //   setTimeout( () =>
  //   this.index = 0
  //   )
  // }

  ngAfterViewInit(): void {
    this.tabs._handleClick = (tab: MatTab, tabHeader: MatTabGroupBaseHeader, index: number) => {
      console.log("sadad");
      // return;
      // if (confirm("dsadasds"))
      //   MatTabGroup.prototype._handleClick.apply(this.tabs, [tab, tabHeader,index])
      setTimeout(() => MatTabGroup.prototype._handleClick.apply(this.tabs, [tab, tabHeader, index]), 500);
    }

    this.tabs._allTabs
  }
  
  async ngOnInit(): Promise<void> {
    this.sS.log();

    this.http.post('http://localhost:8000/api/login', {username: "ADz", password: "123456"}).pipe(take(1), catchError(err => {console.log(err); return EMPTY})).subscribe( (res) => {

      console.log(res);
    });
    // setTimeout ( () => {
    
  // },500);
  }

  subm(form: NgForm){
    console.log(form.valid);
  }

  @HostListener('window:beforeunload')
  checkLeave() {
    return !this.confirmLeave;  
  }

}

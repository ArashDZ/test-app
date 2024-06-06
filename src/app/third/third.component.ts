import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, HostListener, Injector, NgModuleRef, NgZone, OnInit, ViewChild, inject } from '@angular/core';
import { SecondModuleModule } from '../second-module/second-module.module';
import { SecondService } from '../services/second/second.service';
import { NgForm } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabGroupBaseHeader } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject, catchError, firstValueFrom, interval, take } from 'rxjs';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { MatDialog } from '@angular/material/dialog';
import { ThirdLogService } from './services/third-log.service';
import { ActivatedRoute } from '@angular/router';
import { InjService } from '../services/inj/inj.service';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss'],
  providers: [InjService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdComponent implements OnInit, AfterViewInit, DoCheck {
 
  txt: string = "";
  index = 1;

  @ViewChild(MatTabGroup) tabs!: MatTabGroup;

  confirmLeave: boolean = false;
  protected counter: number = 0;

  constructor(
    // private sS: SecondService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private injector: Injector,
    private injS: InjService,
    private cdr: ChangeDetectorRef,
    zone: NgZone
  ) {
    // let injS = new InjService(sS);
    console.log('3c cons');
    console.log(this);
    
    
    (window as any).inj = injector; (window as any).SS = SecondService;

    let resolver: () => void;
    let int = new Promise<void>((resolve) => resolver = resolve);
    zone.runOutsideAngular( () => {
      setTimeout(() => resolver(), 6000);
    });

    int!.then(res => {
      this.counter++;
      console.log('nexted');
      // cdr.markForCheck();
      // cdr.detectChanges();
    })
  }

  ngDoCheck(): void {
    console.log('third DoCheck');
    
  }

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
    // this.sS.log();

    console.log("frame?", window !== top);

    this.http.post('http://localhost:8000/api/login', {username: "ADz", password: "123456"}).pipe(take(1), catchError(err => {console.log(err); return EMPTY})).subscribe( (res) => {

      console.log(res);
    });

    this.route.fragment.subscribe(res => {
      console.log('frag: ', res)
    })    
  }

  subm(form: NgForm){
    console.log(form.valid);

    canDeactivateGuard();
  }

  @HostListener('window:beforeunload')
  checkLeave() {
    return !this.confirmLeave;
  }

}

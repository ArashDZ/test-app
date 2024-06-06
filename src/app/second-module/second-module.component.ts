import { Component, DoCheck, NgModuleRef, OnDestroy, OnInit } from '@angular/core';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subject, map, throttle, throttleTime } from 'rxjs';
import { SecondService } from '../services/second/second.service';
import { ThirdModule } from '../third/third.module';
import { AbstractLogService } from '../services/second/abstract-log.service';
import { Router } from '@angular/router';
import { PageParams } from '../framework/test-list/test-list.component';
import { InjService } from '../services/inj/inj.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-second-module',
  templateUrl: './second-module.component.html',
  styleUrls: ['./second-module.component.scss'],
  providers: [InjService, HttpClient],
  // providers: [SecondService]
})
export class SecondModuleComponent implements OnDestroy, OnInit, DoCheck {

  obj = {name:'seconds', value: 0};
  
  seconds: number = 0;
  intervalId!: ReturnType<typeof setInterval>;

  /**
   *
   */
  constructor(
    private perms: PermServiceService,
    private route: ActivatedRoute,
    private router: Router,
    // private secondServ: AbstractLogService,
    private sec: SecondService,
    private inj: InjService,
    private htc: HttpClient,
    ) {
    console.log("sec m const");
    (window as any).sCompHtC = htc;
    (window as any).SS = SecondService;
    this.sub.pipe(throttleTime(1000)).subscribe(console.log);

  }

  private sub = new Subject()
  ngDoCheck(): void {
    this.obj.value++;
  }

  id: string | undefined;

  ngOnDestroy(): void {
    // console.log("sec m dest");
    clearInterval(this.intervalId);
  }

  goToHome() {
    this.router.navigate(['third-module/third-child/'], {fragment: 'test', })
  }

  ngOnInit(): void {
    console.log("sec m init");

    this.intervalId = setInterval(() => this.seconds++, 1000);
    console.log(this.intervalId);

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? undefined;
      console.log("route params:");

      params.keys.forEach(key => console.log("key: ", key, " | value: ", params.getAll(key)));
    });

    this.route.queryParamMap.subscribe(qParams => {
      console.log("query params:");

      qParams.keys.forEach(key => console.log("key: ", key, " | value: ", qParams.getAll(key)));
    })

    // this.route.data.subscribe(x=> console.log(x));
    // this.route.queryParams.subscribe(x => console.log(x));
    // this.secondServ.log();
  }

  async getData (params: PageParams): Promise<{data: string[], total: number}> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: Array(params.pageSize).fill('').map((_, i) => `hi ${params.pageNumber * params.pageSize + i + 1}`),
      total: 50,
    };
  }

goToComp() {
  this.router.navigate([{outlets:{popup:'third-module/comp'}}], {relativeTo: this.route});
}
}

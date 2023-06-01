import { Component, NgModuleRef, OnDestroy, OnInit } from '@angular/core';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SecondService } from '../services/second/second.service';
import { ThirdModule } from '../third/third.module';
import { AbstractLogService } from '../services/second/abstract-log.service';

@Component({
  selector: 'app-second-module',
  templateUrl: './second-module.component.html',
  styleUrls: ['./second-module.component.scss'],
  // providers: [SecondService]
})
export class SecondModuleComponent implements OnDestroy, OnInit {

  /**
   *
   */
  constructor(
    private perms: PermServiceService,
    private route: ActivatedRoute,
    private secondServ: AbstractLogService,
    ) {
    console.log("sec m const");
  }

  id: string | undefined;

  ngOnDestroy(): void {
    console.log("sec m dest");
  }
  ngOnInit(): void {
    console.log("sec m init");
    this.route.params.subscribe(x => this.id = x['id']);
    this.secondServ.log();
  }

}

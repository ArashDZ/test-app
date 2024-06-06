import { DoCheck, Injectable, OnInit, Type } from '@angular/core';
import { AbstractLogService } from './abstract-log.service';
import { SecondModuleModule } from 'src/app/second-module/second-module.module';
import { SecondModuleComponent } from 'src/app/second-module/second-module.component';

Type
@Injectable({
  providedIn: 'any'
})
export class SecondService implements DoCheck, OnInit {

  constructor(private logServ: AbstractLogService) {
    console.log("second service constructed...")
   }

   ngOnInit(): void {
     console.log('2s on init');
     
   }

   ngDoCheck(): void {
     console.log('docheck');
     
   }

  log() {
    this.logServ.log();
  }
  
}

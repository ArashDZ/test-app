import { Injectable } from '@angular/core';
import { AbstractLogService } from './abstract-log.service';

@Injectable()
export class SecondService {

  constructor(private logServ: AbstractLogService) {
    console.log("second service constructed.")
   }

  log() {
    this.logServ.log();
  }
  
}

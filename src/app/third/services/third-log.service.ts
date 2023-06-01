import { Injectable } from '@angular/core';
import { AbstractLogService } from 'src/app/services/second/abstract-log.service';

@Injectable()
export class ThirdLogService implements AbstractLogService {

  log(): void {
    console.log("Third Log Service Log")
  }
}

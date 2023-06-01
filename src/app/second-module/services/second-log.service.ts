import { Injectable } from '@angular/core';
import { AbstractLogService } from 'src/app/services/second/abstract-log.service';

@Injectable({
  providedIn: 'root'
})
export class SecondLogService implements AbstractLogService {

  constructor() { }

  log(): void {
    console.log("Second Log Service Log")
  }
}

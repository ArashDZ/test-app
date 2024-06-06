import { Injectable, Injector } from '@angular/core';
import { AbstractLogService } from 'src/app/services/second/abstract-log.service';
import { SecondService } from 'src/app/services/second/second.service';

@Injectable({
  providedIn: 'root'
})
export class SecondLogService implements AbstractLogService {

  constructor(
    // private sS: SecondService
    private injector: Injector
  ) { }

  log(): void {
    console.log("Second Log Service Log")
    let sS = this.injector.get(SecondService);
  }
}

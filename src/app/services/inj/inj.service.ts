import { Injectable } from '@angular/core';
import { SecondService } from '../second/second.service';

@Injectable()
export class InjService {

  constructor(private ss: SecondService) { }
}

import { Component } from '@angular/core';
import { AuthPageComponent } from '../auth-page/auth-page.component';

@Component({
  selector: 'app-second-module',
  templateUrl: './second-module.component.html',
  styleUrls: ['./second-module.component.scss']
})
export class SecondModuleComponent extends AuthPageComponent {

}

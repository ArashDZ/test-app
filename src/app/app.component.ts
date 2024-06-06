import { Component } from '@angular/core';
import { Router } from '@angular/router';
4
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router) {
    (window as any).router = router;   
    
  }
}

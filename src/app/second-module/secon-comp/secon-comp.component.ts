import { Component, NgModuleRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPageComponent } from 'src/app/auth-page/auth-page.component';
import { ThirdModule } from 'src/app/third/third.module';

@Component({
  selector: 'app-secon-comp',
  templateUrl: './secon-comp.component.html',
  styleUrls: ['./secon-comp.component.scss']
})
export class SeconCompComponent extends AuthPageComponent {

  /**
   *
   */
  constructor(private aR: ActivatedRoute) {
    super(aR);
    
  }
}

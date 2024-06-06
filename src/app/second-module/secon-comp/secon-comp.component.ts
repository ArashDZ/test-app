import { Component, HostBinding, Input, NgModuleRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPageComponent } from 'src/app/auth-page/auth-page.component';
import { PermServiceService } from 'src/app/services/perm-service/perm-service.service';
import { ThirdModule } from 'src/app/third/third.module';

@Component({
  selector: 'app-secon-comp',
  templateUrl: './secon-comp.component.html',
  styleUrls: ['./secon-comp.component.scss'],
})
export class SeconCompComponent implements OnInit, OnChanges {

  @Input() obj: {name?: string, value?: number} = {};

  // @HostBinding('trackChange') tC = this.obj;

  /**
   *
   */
  constructor(private aR: ActivatedRoute, private permServ: PermServiceService) {
  }

  ngOnInit(): void {
    console.log('initsec');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['obj']) {
      console.log('obj:', changes['obj'].previousValue, '--->', changes['obj'].currentValue);
    }
    
  }

  opD() {
    this.permServ.openDialog();
  }
}

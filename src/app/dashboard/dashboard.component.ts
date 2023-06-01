import { Component, Inject, OnInit, Optional } from '@angular/core';
import { PermServiceService } from '../services/perm-service/perm-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'test-app';

  b = '4';

  constructor (@Optional() private peServ: PermServiceService | null) {this.cB()}
  
  ngOnInit(): void {
    if (this.peServ)
      console.log("Permission Service Provided and Available.");
    
    else
      console.log("Permission service not provided.");    
  }


  roles: string[] = []

  cB() {
    this.b= '';
    this.b = '23';
  }

  
}

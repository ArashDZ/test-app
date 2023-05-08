import { Component } from '@angular/core';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'test-app';

  constructor (private peServ: PermServiceService) {}

  roles: string[] = []

  getRoles() {
    console.log("gRComp");

    let ar = [];
    
    for (let i of [1,2,3,4,5]) {
      let roles = this.peServ.getRoles();

      ar.push(roles)

      if (roles.ready) 
        this.roles = roles.result;

      else
        roles.result.subscribe( (res) => {
          console.log("nexted ", i, res);
          
          }
        )
    }

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  access = false; 

  ngOnInit(): void {
    
  }
  route: ActivatedRoute
  constructor (route: ActivatedRoute) {
    this.route = route;
    this.route.data.subscribe((res) => {    
      this.access = res['access'];
      console.log('access',this.access)  
    })
  }
  ngOnDestroy(): void {
    console.log("aupa destroy");
    
  }

}

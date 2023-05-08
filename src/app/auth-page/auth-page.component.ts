import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  access = true; 

  ngOnInit(): void {
    
  }

  constructor (public route: ActivatedRoute) {
    this.route.data.subscribe((res) => {    
      this.access = res['access'];
      console.log('access',this.access)  
    })
  }

}

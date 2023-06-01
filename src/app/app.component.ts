import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, Routes, } from '@angular/router';
import { Observable, isObservable } from 'rxjs';
import { SecondModuleModule } from './second-module/second-module.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor (private router: Router) {
    // this.getRoutes(this.config)
    console.log("app const");
    
    
    
  }

  ngOnDestroy(): void {
    console.log("app destroy");
    
  }

  ngOnInit(): void {
    console.log("app init");
    
  }

  config = this.router.config;

  getRoutes (config: Routes, basePath = '/') {
    
    for (let route of config) {
    let currentPath = basePath + route.path;
      if (route.children && route.children.length > 0)
        this.getRoutes(route.children, currentPath);
      else if (route.loadChildren) {
        let res = route.loadChildren();
        console.log(res);
        
        if (isObservable(res))
          res.subscribe((child) => {
            console.log(child);
          })

        else if (res instanceof Promise)
          res.then( (child: SecondModuleModule) => {
            console.log(child);
            
          })
        
    }
        
      else
        console.log(currentPath);
    }
  }
}

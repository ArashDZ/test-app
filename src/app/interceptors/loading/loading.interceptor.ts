import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogLoadingInterceptor implements HttpInterceptor {

  constructor() {}

  counter = 0;

  loadingH: HTMLHeadingElement | undefined;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.counter++;
    // this.loading.show$.next(true);

    if (!this.loadingH) {
      this.loadingH = document.createElement('h1');
      this.loadingH.innerText = "Loading...";
      document.body.appendChild(this.loadingH);
    }

    console.log("Loading...");
    

    return next.handle(request).pipe(tap({
      next: (res) => {
        if (res.type == HttpEventType.Response && --this.counter == 0) {
          document.body.removeChild(this.loadingH!);
          this.loadingH = undefined;
          console.log("Finished loading");
          
        }
      },
      error: (err) => {
        if (--this.counter == 0) {
          document.body.removeChild(this.loadingH!);
          this.loadingH = undefined;
          console.log("Finished loading");
        }
      }
    }));
  }
}

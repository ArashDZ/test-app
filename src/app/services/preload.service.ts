import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationSkipped, NavigationStart, PreloadingStrategy, Route, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { EMPTY, MonoTypeOperatorFunction, Observable, OperatorFunction, catchError, concatWith, count, debounce, defaultIfEmpty, defer, first, identity, ignoreElements, last, map, noop, of, onErrorResumeNextWith, pipe, sample, share, switchMap, take, tap, throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService implements PreloadingStrategy {

  private timeoutId?: ReturnType<typeof setTimeout>;
  private readonly loader: HTMLDivElement;

  private lastInQueue: Observable<any> = EMPTY;

  private debug = false;

  constructor(router: Router) {
    this.loader = document.createElement('div');
    this.setLoaderStyles();
    this.setupLoadingEvents(router);
  }

  private setupLoadingEvents(router: Router) {
    router.events.subscribe(event => {

      /** Show Loading */
      if (event instanceof NavigationStart) {
        this.timeoutId = setTimeout(() => document.body.appendChild(this.loader), 100);
      }

      /** Hide Loading */
      if (event instanceof NavigationCancel || event instanceof NavigationEnd || event instanceof NavigationError) {
        clearTimeout(this.timeoutId);
        setTimeout(() => {
          document.body.contains(this.loader) && document.body.removeChild(this.loader!);
        }, 30);
      }
    });
  }

  private setLoaderStyles(): void {
    this.loader.style.display = 'flex';
    this.loader.style.justifyContent = 'center';
    this.loader.style.alignItems = 'center';
    this.loader.style.position = 'absolute';
    this.loader.style.width = '100vw';
    this.loader.style.height = '100vh';
    this.loader.style.backgroundColor = 'gray';
    this.loader.style.color = 'black';
    this.loader.style.opacity = '0.7';
    this.loader.style.left = '0';
    this.loader.style.top = '0';
    this.loader.innerText = "Loading...";
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (this.debug) {
      console.log("preloading ", route.path, "?");
      debugger
    }

    // either
    return this.useQueue(route, load);
    // ,
    return this.useConditionalPreload(route, load);
    // or just
    return load();

  }

  private useConditionalPreload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload'] === true)
      return load();

    return of(null);
  }

  private useQueue(route: Route, load: () => Observable<any>): Observable<any> {

    /** operator */
    function logProgress<T> (output: { log: typeof console.log }): MonoTypeOperatorFunction<T> {
      return tap<T> ({
        subscribe: () => output.log("starting", route.path),
        complete: () => output.log(route.path, " complete.")
      });
    }

    const startLoad = defer(() => load().pipe<any>(
      this.debug ? logProgress(console) : identity,
    ));

    return this.lastInQueue = this.lastInQueue.pipe(ignoreElements(), onErrorResumeNextWith(startLoad), share());

  }
}

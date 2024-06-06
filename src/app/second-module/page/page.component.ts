import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  seconds: number = 0;
  intervalId: number = -1;

  constructor(
    private htc: HttpClient
  ) {

  }
  
  ngOnInit(): void {
    this.intervalId = window.setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}

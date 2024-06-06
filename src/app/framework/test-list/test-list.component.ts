import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatList, MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListComponent implements OnInit {

  @Input() label: string = 'List';

  @Input('dataSource') getData: (params: PageParams) => Promise<{data: string[], total: number}> = async () => ({data: [], total:0});

  @Input() pageSize: number = 10;

  @Input() initialPages: number = 1;
  
  items: string[] = [];

  total: number = 0;

  currentPage: number = 0;

  loadingData: boolean = false;

  constructor (
    // private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.loadingData = true;
    // this.cd.detectChanges();
    this.getData({pageNumber: 0, pageSize: this.initialPages * this.pageSize}).then(res => {
      ({total: this.total, data: this.items} = res);
      this.loadingData = false;
      setTimeout (() => this.nextPage())
    });
    this.currentPage = this.initialPages;
  }

  async nextPage (event?: {target: EventTarget | null}) {
    
    if (this.loadingData || (this.currentPage) * this.pageSize >= this.total)
      return;
    
    let list: HTMLElement;
    if (event)
      list = (event?.target) as HTMLElement;

    else
      list = document.getElementById('mat-list')!;

    // console.log("page: ", this.currentPage);
    // console.log("list.scrollTop: ", list.scrollTop);
    // console.log("list.clientHeight: ", list.clientHeight);
    // console.log("list.scrollHeight: ", list.scrollHeight);
    
    if (list.scrollTop + list.clientHeight >= list.scrollHeight) {  // Hit bottom
      this.loadingData = true;
      const {data, total} = await this.getData({pageNumber: this.currentPage++, pageSize: this.pageSize});
      this.items = [...this.items, ...data];
      this.total = total;
      this.loadingData = false;
      setTimeout (() => this.nextPage())
    }
  }
}

export type PageParams = {pageNumber: number, pageSize: number};
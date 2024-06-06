import { AfterViewChecked, AfterViewInit, Component, Inject, OnChanges, OnInit, Optional, SecurityContext, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { NgForm } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { InputWrapComponent } from '../framework/input-wrap/input-wrap.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnChanges {
  title = 'test-app';

  b = '4';
  inp = '';

  sWrp = true;

  src: string | null = '';

  val: any = "2";

  @ViewChild('dT') dT!: TemplateRef<any>;
  @ViewChild('inpwrp') inpwrp!: InputWrapComponent;

  constructor (
    @Optional() private peServ: PermServiceService | null,
    private san: DomSanitizer,
  ) {this.cB()}
  
  ngOnInit(): void {
    this.src = this.san.sanitize(SecurityContext.URL, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII');
        // this.src = this.sanitizer.bypassSecurityTrustScript('javascript: console.log("exe")') ;
    // if (this.peServ)
      // console.log("Permission Service Provided and Available.");
    
    // else
      // console.log("Permission service not provided.");

  }

  log(e: any) {
    console.log(e);
  }

  toggleWrp() {
    this.sWrp = !this.sWrp;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['inpwrp']) {
      // console.log('fds');
  }

  ngDoCheck () {
    // console.log("dc");
    
  }

  ngAfterViewInit(): void {
    // console.log("view check");
    
    // console.log(this.inpwrp)

  }

  roles: string[] = []

  cB() {
    this.b= '';
    this.b = '23';
  }

  clear(form: NgForm) {
    // form.form.markAsPristine();
    // form.form.markAsUntouched();
    // form.form.reset();
    // form.form.updateValueAndValidity();
    // console.log("touch");
    
    // form.form.markAllAsTouched();
    // form.form.updateValueAndValidity();
    // form.form.reset();
    form.resetForm();
    form.form.markAsPristine();
    form.form.markAsUntouched();

    this.peServ?.openDialog();
  }

  checkInp(event: KeyboardEvent) {
    // return console.log(event);
    // const inp: HTMLInputElement = event.target as HTMLInputElement;
    // if (!inp)
    //   return;
    // let value = (inp.value ?? "") + event.key;

    // const digit = '[0-9]'
    // return Boolean(value.match(new RegExp(`^[0-9]{1,3}(?:\\.[0-9]{1,3}){0,2}(?:\\.[0-9]{0,3})?$`)))
  }
    
  
}

import { Component, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-smart-input',
  templateUrl: './smart-input.component.html',
  styleUrls: ['./smart-input.component.scss']
})
export class SmartInputComponent implements OnChanges, ControlValueAccessor {

  @Input() label: string = "Input";

  @Input() denyPattern: {pattern: RegExp, message: string}[] = [];
  validations: {pattern: RegExp, message: string, hintClass: 'active' | 'inactive'}[] = [];

  currentValue: string = "";

  errorMessage: string | null = null;

  inputControl = new FormControl("")

  constructor(
    @Optional() control?: NgControl,
  ) {
    if(control)
      control.valueAccessor = this;

    else
      console.warn("No ngControl :(") 
  }

  onChange?: (newValue: string) => void;
  onTouched?: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['denyPattern'])
      this.validations = this.denyPattern.map(pattern => ({...pattern, hintClass: 'inactive'}));

  }

  onInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    if (this.isValid(target.value)) {
      this.currentValue = target.value;
      this.onChange && this.onChange(this.currentValue);
    }

    else {
      target.value = this.currentValue;
      this.inputControl.setValue(this.currentValue);
    }
  }

  isValid(value: string): boolean {
    for (let validation of this.validations) {
      if (!validation.pattern.test(value)) {
        this.showMessage(validation);
        return false;
      }
    }

    this.errorMessage = null;
    return true;
  }

  showMessage(validation: {pattern: RegExp, message: string, hintClass: 'active' | 'inactive'}): void {
    if (validation.hintClass == 'active')
      return;
    validation.hintClass = 'active';
    setTimeout(() => validation.hintClass = 'inactive', 1500)
  }

  writeValue(obj: any): void {
    let newValue = String(obj);
    if (this.isValid(newValue)) {
      this.currentValue = newValue;
      this.inputControl.setValue(newValue);
    }
  }

}

import { AfterViewInit, Component, forwardRef, Input, Optional, Self, ViewChild } from '@angular/core';
import { Block } from '../model/block';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InputWrapComponent } from '../input-wrap/input-wrap.component';

@Component({
  selector: 'app-block-text-area',
  templateUrl: './block-text-area.component.html',
  styleUrls: ['./block-text-area.component.scss'],
})
export class BlockTextAreaComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild(InputWrapComponent) inputWrap!: InputWrapComponent;

  @Input() items: Block[] = [];

  onChange = (value: string | null) => {};
  onTouched = () => {};

  formControl = new FormControl<string | null>(null);

  constructor(
    @Optional() @Self() ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.formControl.disable();
    else this.formControl.enable();
  }

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(value => this.onChange(value));
  }

  protected addItem(item: Block) {
    this.inputWrap.addBlock(item);
  }
}

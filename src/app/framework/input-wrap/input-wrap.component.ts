
import { AfterViewInit, Component, ElementRef, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, NgControl, NgForm } from '@angular/forms';

const OBJECT_HTML =  ` <span contenteditable="false" style="background-color: #dd73ba; color: white; border-radius: 2px; box-shadow: 1px 1px 2px 1px gray;" >DB Link</span> `;

@Component({
  selector: 'app-input-wrap',
  templateUrl: './input-wrap.component.html',
  styleUrls: ['./input-wrap.component.scss'],
  standalone: true
})
export class InputWrapComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('input') input!: ElementRef;

  disabled: boolean = false;

  onChange = (value: string) => {}

  onTouched = () => {}

  constructor(
    @Self() @Optional() private ngControl:  NgControl | null,
    ) {
      if (!ngControl) {
        console.warn("Input Wrap Component Used Outside of a Form");
        return;
      }
        
      ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
        
  }

  ngAfterViewInit(): void {
    if (!this.ngControl?.control) {
      return;
    }

    // const inputElement = this.input.nativeElement as HTMLElement;
    // inputElement.addEventListener('input', function(event: Event) {
    //   console.log(event);
    //   console.log(this);
      
    // })

    /*
    // (Monkey Patch) Propagate Untouch to children
    const markAsUntouchedOriginal = this.ngControl.control.markAsUntouched;
    this.ngControl.control.markAsUntouched = () => {
      markAsUntouchedOriginal.apply(this.ngControl?.control);
      this.input.control.markAsUntouched();
    }

    // (Monkey Patch) Propagate pristine to children
    const markAsPristineOriginal = this.ngControl.control.markAsPristine;
    this.ngControl.control.markAsPristine = () => {
      markAsPristineOriginal.apply(this.ngControl?.control);
      console.log('pris')
      this.input.control.markAsPristine();
    }
    */

  }

  writeValue(newValue: string | null): void {
    const inputElement = this.input.nativeElement as HTMLDivElement;
    inputElement.innerHTML = newValue ?? "";
    this.onInput({target: inputElement});
  }

  registerOnChange(fn: (velue: string) => void): void {
    this.onChange = fn;
  }

  informChange(target: EventTarget | null) {
    this.onChange((target as HTMLInputElement)?.value ?? "")
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private revertStr(inner: string): string {
    // console.log("REVERT------------------");
    // console.log(inner);

    let sp = inner.replaceAll(/(?:&nbsp;|\xa0)/g, ' ');

    // console.log(sp);
    // console.log(sp.includes(OBJECT_HTML));

    const cleanHtml = this.cleanHtml(OBJECT_HTML);
    
    // console.log('"'+OBJECT_HTML+'"');
    // console.log('"'+cleanHtml+'"');
    

    let result = sp.replaceAll(cleanHtml, '###');
    
    // console.log(result);
    
    // console.log("------------------");

    return result;

    
  }

  private getPosition (input: HTMLInputElement): {node: number, offset: number} {
    
    const sel = window.getSelection();

    const inner = input.innerHTML.replaceAll(/(?:&nbsp|\xa0)/g, ' ');

    // console.log(inner);
    
    const initialOffset = sel!.focusOffset;

    // console.log(initialOffset);    
    
    let spans = inner.substring(0, initialOffset).match(/(?:\s|^)###(?:\s|$)/);

    // console.log(spans);
    // console.log(spans?.at(-1));
    
    let a: RegExpMatchArray
    if (!spans || spans.length == 0)
      return {node: 0, offset: initialOffset};

    let offset = initialOffset - Number((spans as any).index) -4

    let node = spans.length * 2;

    return {offset, node};
  }

  private setPosition(initialPos: {node: number, offset: number}, input: HTMLElement) {
    const sel = window.getSelection();
      if (sel) {
        // console.log(input.childNodes);
        // console.log(initialPos);
  
        try {
          const range = document.createRange();
          range.setStart(input.childNodes[initialPos.node], initialPos.offset);
          // range.setEnd(input.childNodes[0], offset);
          range.collapse(true);

          sel.removeAllRanges();
          sel.addRange(range);

          range.detach(); 
        }
        catch (ex) {
          console.error(ex);
        }
      }
  }

  private cleanHtml (html: string): string {
    const temp = document.createElement('template');
    temp.innerHTML = html.trim();
    return temp.innerHTML;
  }

  onInput(event: InputEvent | {target: HTMLElement} ) {
    const input = event.target as HTMLInputElement;

    // console.log(input.value);
    // console.log(input.innerHTML);
    // console.log(input.innerText);
    // console.log(event);

    const selStart = input.selectionStart;

    let inner = input.innerHTML.replaceAll(/(?:\xA0|&nbsp;)/g, ' ');
    let reverted = this.revertStr(inner);
    let cleanHtml = this.cleanHtml(OBJECT_HTML);

    let newHtml = reverted.replaceAll(/(?<=\s|^)###(?=\s|$)/g, cleanHtml);
    
    if (inner != newHtml) {
      
      const initialPos = this.getPosition(input);
      
      // console.log(input.childNodes);
      // console.log(initialPos);

      // console.log(input.childNodes[0]);
      // console.log(node);
      // console.log(node?.nextSibling);

      input.innerHTML = reverted.replaceAll(/(?<=\s|^)###(?=\s|$)/g, cleanHtml);

      // console.log(input.innerHTML);
      
      this.setPosition(initialPos, input);

      // sel?.selectAllChildren(input);
      // sel?.collapseToEnd();
    }

    this.onChange(this.revertStr(input.innerHTML));
  }

}

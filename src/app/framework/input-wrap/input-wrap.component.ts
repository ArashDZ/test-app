
import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { Block } from '../model/block';

@Component({
  selector: 'app-input-wrap',
  templateUrl: './input-wrap.component.html',
  styleUrls: ['./input-wrap.component.scss'],
  standalone: true
})
export class InputWrapComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('input') input!: ElementRef<HTMLDivElement>;

  @Input() items: Block[] = [];

  disabled: boolean = false;

  private pendingValue: string | null = null;

  onChange = (value: string | undefined) => {}

  onTouched = () => {}

  constructor(
    @Self() @Optional() ngControl:  NgControl | null,
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
    if (this.pendingValue != null) {
      this.onInput(this.pendingValue);
      this.pendingValue = null;
      return;
    }
  }

  writeValue(newValue: string | null): void {
    if (!this.input) {
      this.pendingValue = newValue;
      return;
    }

    this.onInput(newValue || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public addBlock(block: Block) {
    const currentValue = this.removeBlocks(this.input.nativeElement.innerHTML);
    const carretPosition = this.getCaretPosition();

    if (carretPosition == null) {
      this.onInput(currentValue + block.value);
      return;
    };

    this.onInput(currentValue.slice(0, carretPosition) + block.value + currentValue.slice(carretPosition))
  }

  private getBlock ({title, color, value}: Block): string {
    return this.cleanHtml(
      `<span contenteditable="false" id="block-${value}" style="background-color: ${color};" class="block" >${title}</span>`
    );
  }

  private removeBlocks(html: string): string {
    html = html.replace(/(?:&nbsp;|\xa0)/g, ' ');

    for (const item of this.items) {
      // const blockHtml = this.getBlock(item);
      const blockRegex = new RegExp(`<span[^>]*id="block-${item.value}"[^>]*>[\s\n\r]*${item.title}[\s\n\r]*</span>`, 'gs');
      html = html.replace(blockRegex, item.value);
    }
    
    return html;
  }

  private setBlocks(html: string) {
    html = this.removeBlocks(html);

    for (const item of this.items) {
      const blockHtml = this.getBlock(item);

      html = html.replaceAll(item.value, blockHtml);
    }

    return html;
  }


  private setSelectionRange(node: Node, offset: number): void {
    const sel = window.getSelection();
    if (sel == null) return;

    const range = document.createRange();
    range.setStart(node, offset);

    sel.removeAllRanges();
    sel.addRange(range);

    range.detach();
    return;
  }

  private setPosition(position: number) {
    let carretPosition = 0;
    const childNodes = Array.from(this.input.nativeElement.childNodes);

    for (const [index, node] of childNodes.entries()) {
      if (node instanceof HTMLDivElement) {
        childNodes.splice(index + 1, 0, ...Array.from(node.childNodes));
        continue;
      }

      if (node instanceof HTMLSpanElement) {
        if (position === carretPosition) {
          this.setSelectionRange(this.input.nativeElement, index);
          return;
        }
        const blockValue = node.id.match(/(?<=block-).*/s)?.at(0) || '';

        carretPosition += blockValue.length;
        continue;
      }

      if (!(node instanceof Text)) continue;
      
      if (carretPosition + node.length >= position) {
        let offset = position > carretPosition
          ? position - carretPosition
          : 0;

        this.setSelectionRange(node, offset);
        return;
      }

      carretPosition += node.length;
    }

    this.setSelectionRange(this.input.nativeElement, this.input.nativeElement.childNodes.length);
  }

  private cleanHtml (html: string): string {
    const temp = document.createElement('template');
    temp.innerHTML = html.trim();
    return temp.innerHTML;
  }

  private getCaretPosition(): number | null {
    const selection = getSelection();
    if (selection == null) return null;

    let carretPosition = 0;

    const childNodes = Array.from(this.input.nativeElement.childNodes);

    for (const [index, node] of childNodes.entries()) {
        if (node === selection.anchorNode){
            carretPosition += selection.anchorOffset;
            return carretPosition;
        }

        if (node instanceof Text) {
          carretPosition += node.length;
          continue;
        }

        if (node instanceof HTMLDivElement) {
          childNodes.splice(index + 1, 0, ...Array.from(node.childNodes));
          continue;
        }
    
        if (node instanceof HTMLSpanElement) {
          if (
            selection.anchorNode === this.input.nativeElement &&
            selection.anchorOffset === index
          ) {
            return carretPosition;
          }

          const blockValue = node.id.match(/(?<=block-).*/s)?.at(0) || '';

          carretPosition += blockValue.length;

          continue;
        }
        
    }

    return null;
  }

  private convertHtlmToString(html: string): string | undefined {
    // Extract lines from pattern:
    //
    //   {{line 1}}
    //   <div> {{line 2}} </div>
    //   <div> <br> </div>  <!-- (empty line) -->
    //   <div> {{line 4}} </div>
    //   ...
    const lines = html
      .replaceAll('<br>', '')
      .match(/(?:^(?:(?!<div>).)*(?=(?:<div>)|$)|(?<=<div>)(?:(?!<div>).)*(?=<\/div))/g);

    return lines?.join('\n');
  }

  private notifyChange() {
    const html = this.removeBlocks(this.input.nativeElement.innerHTML);
    const string = this.convertHtlmToString(html);

    this.onChange(string);
  }

  onInput(input?: string) {
    let currentValue = this.input.nativeElement.innerHTML.replaceAll(/(?:\xA0|&nbsp;)/g, ' ');

    let newValue = input ?? currentValue;

    let newHtml = this.setBlocks(newValue);

    if (currentValue != newHtml) {

      const initialPos = this.getCaretPosition() ?? 0;

      this.input.nativeElement.innerHTML = newHtml;

      this.setPosition(initialPos);
    }

    this.notifyChange();
  }
}

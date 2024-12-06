
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Block } from '../model/block';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-input-wrap',
  templateUrl: './input-wrap.component.html',
  styleUrls: ['./input-wrap.component.scss'],
  imports: [
    NgFor,
    NgStyle,
    NgIf,
    NgClass,
  ],
  standalone: true
})
export class InputWrapComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('input') input!: ElementRef<HTMLDivElement>;
  @ViewChild('suggestedBoxRef') suggestedBoxRef!: ElementRef<HTMLDivElement>;

  @Input() items: Block[] = [];

  disabled: boolean = false;

  private pendingValue: string | null = null;

  protected top = '10px';
  protected right = '50px';
  protected bottom = 'unset';
  protected left = 'unset';
  protected suggestedBlocks: Block[] | null = null;
  protected suggestedIndex = 0;

  onChange = (value: string | undefined) => {}

  onTouched = () => {}

  constructor(
    @Self() @Optional() ngControl:  NgControl | null,
    private cdr: ChangeDetectorRef,
  ) {
    if (!ngControl) {
      console.warn("Input Wrap Component Used Outside of a Form");
      return;
    }
      
    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    document.addEventListener('selectionchange', _ => {
      if (document.activeElement !== this.input?.nativeElement) {
        this.suggestedBlocks = null;
        return;
      }

      this.setSuggestionPosition();
    });
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
    this.suggestedBlocks = null;

    const currentValue = this.convertHtlmToString(this.removeBlocks(this.input.nativeElement.innerHTML));
    if (currentValue == null) return;
    let carretPosition = this.getCaretPosition();

    let newValue: string;

    if (carretPosition == null) {
      carretPosition = 0;
      newValue = currentValue + block.value;
    } else {
      const lastWordLength = this.getLastWord()?.length ?? 0;

      newValue = currentValue.slice(0, carretPosition - lastWordLength) + block.value + currentValue.slice(carretPosition);
      carretPosition -= lastWordLength;
    }

    this.onInput(newValue, carretPosition + block.value.length);
  }

  private getBlock ({title, color, value}: Block): string {
    return this.cleanHtml(
      `<span contenteditable="false" id="block-${value}" style="background-color: ${color};" class="block" >${title}</span>`
    );
  }

  protected handleKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === ' ') {
      this.suggestedBlocks = this.items;
      this.suggestedIndex = 0;
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.suggestedBlocks?.length) return;

    switch (event.key) {

      case ('ArrowDown'): {
        this.suggestedIndex = mod((this.suggestedIndex + 1), this.suggestedBlocks.length);
        event.preventDefault();
        event.stopPropagation();
        break;
      }

      case ('ArrowUp'): {
        this.suggestedIndex = mod((this.suggestedIndex - 1), this.suggestedBlocks.length);
        event.preventDefault();
        event.stopPropagation();  
        break;
      }

      case ('Enter'):
      case ('Tab'): {
        this.addBlock(this.suggestedBlocks[this.suggestedIndex]);
        event.preventDefault();
        event.stopPropagation();  
        break
      }

      case('Escape'): {
        this.suggestedBlocks = null;
        event.preventDefault();
        event.stopPropagation();
        break;
      }
    }
  }
  private removeBlocks(html: string): string {

    for (const item of this.items) {
      const blockRegex = new RegExp(`<span[^>]*id="block-${item.value}"[^>]*>[\s\n\r]*${item.title}[\s\n\r]*</span>`, 'gs');
      html = html.replace(blockRegex, item.value);
    }
    
    return html;
  }

  private setBlocks(html: string) {
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
        carretPosition++;
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
      
      if (carretPosition + node.length > position) {
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

    if (selection.anchorNode === this.input?.nativeElement) {
      childNodes.splice(selection.anchorOffset);
    }

    for (const [index, node] of childNodes.entries()) {
      if (node instanceof HTMLDivElement || node instanceof HTMLBRElement) {
        carretPosition++;
      }

      if (node === selection.anchorNode){
          carretPosition += selection.anchorOffset;
          return carretPosition;
      }

      if (node instanceof Text) {
        carretPosition += node.length;
        continue;
      }

      if (node instanceof HTMLDivElement) {
        const divChildNodes = Array.from(node.childNodes).filter(node => node instanceof HTMLBRElement == false);
        childNodes.splice(index + 1, 0, ...divChildNodes);
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

    if (selection.anchorNode === this.input?.nativeElement) {
      return carretPosition;
    }

    return null;
  }

  private convertHtlmToString(html: string): string | undefined {
    html = this.removeBlocks(html);
    html = html?.replaceAll(/(?:\xA0|&nbsp;)/g, ' ');

    const lines = html
      ?.replaceAll('<div><br></div>', '<div></div>')
      .replaceAll('<br>', '<div></div>')
      .match(/(?:^(?:(?!<div>).)*(?=(?:<div>)|$)|(?<=<div>)(?:(?!<div>).)*(?=<\/div))/g);

    return lines?.join('\n');
  }

  private convertStringToHtml (string: string) {
    string = string.replaceAll(' ', '&nbsp;');
    const lines = string.split('\n');

    const html = lines[0] + lines
      .slice(1)
      .map(line => `<div>${line || '<br>'}</div>`)
      .join('');

    return this.cleanHtml(html);
  }

  private notifyChange() {
    const html = this.removeBlocks(this.input.nativeElement.innerHTML);
    const string = this.convertHtlmToString(html);

    this.onChange(string);
  }

  onInput(input?: string, finalPosition?: number) {
    
    let currentValue = this.input.nativeElement.innerHTML;
    
    let newValue = input ?? this.convertHtlmToString(currentValue)!;
    
    let newHtml = this.setBlocks(this.convertStringToHtml(newValue));
    
    if (currentValue != newHtml) {
      
      const position = finalPosition ?? this.getCaretPosition() ?? 0;
      
      this.input.nativeElement.innerHTML = newHtml;
      
      this.setPosition(position);
    }

    this.notifyChange();
  }

  private getLastWord(): string | null {
    const innerHTML = this.input?.nativeElement.innerHTML.replaceAll(/(?:\xA0|&nbsp;)/g, ' ');
    
    const value = this.convertHtlmToString(innerHTML);
    if (!value) return null;

    const position = this.getCaretPosition();

    if (position == null) return null;
    
    let lastWord = '';
    for (let seek = position - 1; seek >= 0; seek--) {
      const char = value[seek];
      
      if (char.match(/\s/)) {
        return lastWord;
      }

      lastWord = char + lastWord;
    }

    return lastWord;
  }

  private setSuggestionList() {
    const lastWord = this.getLastWord();
    if (!lastWord) {
      this.suggestedBlocks = null;
      return;
    }

    if (this.items.some(block => block.value === lastWord)) {
      this.suggestedBlocks = null;
      return;
    }

    this.suggestedBlocks = this.items.filter(block => block.value.startsWith(lastWord));
    this.suggestedIndex = 0;
  }

  protected setSuggestionPosition() {
    this.setSuggestionList();

    this.cdr.detectChanges();

    let range: Range | undefined;

    try {
      range = window.getSelection()?.getRangeAt(0);
    }
    catch {
      this.suggestedBlocks = null;
      return;
    }

    if (range == null) return;

    const rect = range.getClientRects()[0];

    if (rect == null) return;

    if (this.suggestedBoxRef?.nativeElement.scrollHeight + rect.bottom > window.innerHeight) {
      this.bottom = `${window.innerHeight - rect.top}px`;
      this.top = 'unset';
    } else {
      this.top = `${rect.bottom}px`;
      this.bottom = 'unset';
    }

    if (this.suggestedBoxRef?.nativeElement.scrollWidth + rect.right > window.innerWidth) {
      this.right = `${window.innerWidth - rect.left}px`;
      this.left = 'unset';
    } else {
      this.left = `${rect.right}px`;
      this.right = 'unset';
    }
  }
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <input class="todo-input"
           #inputElementRef
           placeholder="{{placeholder}}"
           [value]="textValue"
           (keyup.enter)="submitValue($event.target.value)">

    <button class="btn"
            (click)="submitValue(inputElementRef.value)">
      Save
    </button>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @ViewChild('inputElementRef') input: ElementRef;
  placeholder = 'Input title here';
  textValue = '';
  constructor() { }
  ngOnInit() { }
  submitValue(newTitle: string) {
    this.submit.emit(newTitle);
    this.input.nativeElement.value = '';
  }
}

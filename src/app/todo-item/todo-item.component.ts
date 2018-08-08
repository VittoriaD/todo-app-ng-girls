import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div>
        <input type="checkbox"
               class="todo-checkbox"
               (change)="completeItem()"/>
        <span class="todo-title"
              [ngClass]="{'todo-complete':  item.completed}"
              (click)="triggerEdit()"
              *ngIf="!showEdit">
          {{ item.title }}
        </span>
      </div>
      <app-input-button-unit (submit)="updateTitle($event)" *ngIf="showEdit"></app-input-button-unit>
      <button class="btn btn-red" (click)="removeItem()">
        remove
      </button>
    </div>
  `,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  showEdit: boolean;
  constructor() { }
  ngOnInit() { }
  removeItem() {
    this.remove.emit(this.item);
  }
  completeItem() {
    this.update.emit({
      item: this.item,
      changes: { completed: !this.item.completed }
    });
  }
  triggerEdit() {
    this.showEdit = !this.showEdit;
  }
  updateTitle(title: string) {
    this.update.emit({
      item: this.item,
      changes: { title: title }
    });
    this.triggerEdit();
  }
}

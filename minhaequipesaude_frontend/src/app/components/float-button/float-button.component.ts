import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-float-button',
  imports: [],
  templateUrl: './float-button.component.html',
  styleUrl: './float-button.component.scss'
})
export class FloatButtonComponent {

  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-float-button',
  imports: [],
  templateUrl: './float-button.component.html',
  styleUrl: './float-button.component.scss'
})
export class FloatButtonComponent {

  @Output() buttonClick = new EventEmitter<void>();

  @Input() bottom: string | number = '24px';

  get bottomStyle(): string {
    return typeof this.bottom === 'number' ? `${this.bottom}px` : this.bottom;
  }

  onClick() {
    this.buttonClick.emit();
  }

}

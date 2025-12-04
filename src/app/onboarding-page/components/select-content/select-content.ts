import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-content',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './select-content.html',
  styleUrl: './select-content.scss',
})
export class SelectContent {
  @Input() name: string = '';
  // @Input() symbol: string = '';
  // @Input() color: string = '';
  @Input() selected: boolean = false;
  @Output() toggleSelect = new EventEmitter<void>();

  onToggle(): void {
    this.toggleSelect.emit();
  }

}

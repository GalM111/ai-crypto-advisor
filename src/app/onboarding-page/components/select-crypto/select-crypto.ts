import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-crypto',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './select-crypto.html',
  styleUrl: './select-crypto.scss',
})
export class SelectCrypto {
  @Input() symbol: string = '';
  @Input() name: string = '';
  @Input() color: string = '';
  @Input() selected: boolean = false;
  @Output() toggleSelect = new EventEmitter<void>();

  onToggle(): void {
    this.toggleSelect.emit();
  }
}

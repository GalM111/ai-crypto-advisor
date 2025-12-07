import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-investor-type',
  imports: [CommonModule],
  templateUrl: './select-investor-type.html',
  styleUrl: './select-investor-type.scss',
})
export class SelectInvestorType {
  @Input() investorType: string = '';
  @Input() selected: boolean = false;
  @Output() toggleSelect = new EventEmitter<void>();

  public onToggle(): void {
    this.toggleSelect.emit();
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() message: string | undefined = '';
  @Input() type:undefined |  'success' | 'error' | 'warning' = 'success';

  get icon() {
    switch (this.type) {
      case 'success':
        return 'check';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  get backgroundColor() {
    switch (this.type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      default:
        return '#2196f3';
    }
  }
}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({ severity: 'success', detail: message });
  }

  error(message: string, submessage?: string) {
    if (!submessage) {
      this.messageService.add({ severity: 'error', detail: message });
    } else {
      this.messageService.add({
        severity: 'error',
        detail: message,
        summary: submessage,
      });
    }
  }

  clear() {
    this.messageService.clear();
  }
}

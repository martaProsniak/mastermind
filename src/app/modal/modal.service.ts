import { EventEmitter } from '@angular/core';

export class ModalService {
  isOpen = true;
  onModalChange = new EventEmitter<boolean>();

  openModal() {
    this.isOpen = true;
    this.onModalChange.emit(this.isOpen);
  }

  closeModal() {
    this.isOpen = false;
    this.onModalChange.emit(this.isOpen);
  }
}

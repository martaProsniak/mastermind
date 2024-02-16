import { ConfettiService } from './../confetti.service';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable()
export class ModalService {
  isOpen = true;
  onModalChange = new EventEmitter<boolean>();

  constructor(private confettiService: ConfettiService) {}

  openModal() {
    this.isOpen = true;
    this.onModalChange.emit(this.isOpen);
  }

  closeModal() {
    this.isOpen = false;
    this.onModalChange.emit(this.isOpen);
    this.confettiService.clear();
  }
}

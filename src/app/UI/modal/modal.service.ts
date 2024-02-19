import { ConfettiService } from '../../confetti.service';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ModalService {
  isOpen = false;
  onModalChange = new Subject<boolean>();

  constructor(private confettiService: ConfettiService) {}

  openModal() {
    this.isOpen = true;
    this.onModalChange.next(this.isOpen);
  }

  closeModal() {
    this.isOpen = false;
    this.onModalChange.next(this.isOpen);
    this.confettiService.clear();
  }
}

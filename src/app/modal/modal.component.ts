import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen: boolean;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isOpen = this.modalService.isOpen;
    this.modalService.onModalChange.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  onClose() {
    this.modalService.closeModal();
  }
}

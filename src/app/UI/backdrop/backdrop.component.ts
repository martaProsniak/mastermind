import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'backdrop',
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.css',
})
export class BackdropComponent implements OnInit {
  isOpen: boolean;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isOpen = this.modalService.isOpen;
    this.modalService.onModalChange.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
}

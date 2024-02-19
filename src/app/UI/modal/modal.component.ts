import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalService } from './modal.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  isOpen: boolean;
  private modalSubscription: Subscription

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isOpen = this.modalService.isOpen;
    this.modalSubscription = this.modalService.onModalChange.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  onClose() {
    this.modalService.closeModal();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalService } from './modal.service';
import {Subscription} from "rxjs";
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    standalone: true,
    imports: [BackdropComponent],
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

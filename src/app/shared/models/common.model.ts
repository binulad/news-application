export class ConfirmationModal {
  title: string;
  content: any;
  constructor(title: string, content: any) {
    this.title = title;
    this.content = content;
  }
}

export class Modal {
  modalTitle: string;
  content: any;
  modalFooter?: any;
  constructor(modalTitle: string, content: any, modalFooter: any) {
    this.modalTitle = modalTitle;
    this.content = content;
    this.modalFooter = modalFooter;
  }
}

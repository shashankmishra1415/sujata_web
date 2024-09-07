export class CustomAlertOptions {
  title: string = "";
  message: string = "";
  icon: 'no-icon' | 'success' | 'error' | 'warning' = 'no-icon';
  OkButtonText: string = 'OK';
  dialogSize: 'sm' |'md' | 'lg' | 'xl' | undefined = undefined;
  isShowHeaderCloseButton: boolean = true;
  isKeyboardEvents: boolean = false;
  containerSelector?: string = undefined;

  OkCallback: Function | null = null;
  DismissCallback: Function | null = null;

  constructor() {
  }
}
export class CustomConfirmOptions {
  title: string = "";
  message: string = "";
  icon: 'no-icon' | 'success' | 'error' | 'warning' = 'no-icon';
  OkButtonText: string = 'OK';
  CancelButtonText: string = 'Cancel';
  dialogSize: 'sm' |'md' | 'lg' | 'xl' | undefined = undefined;
  isShowHeaderCloseButton: boolean = true;
  isKeyboardEvents: boolean = false;
  containerSelector?: string = undefined;

  OkCallback: Function | null = null;
  CancelCallback: Function | null = null;
  DismissCallback: Function | null = null;

  constructor() {
  }
}
export class CustomModalOptions {
  title: string = "";
  message: string = "";
  btnOkText: string = 'OK';
  btnSubmitText: string = 'Submit';
  btnCancelText: string = 'Cancel';
  dialogSize: 'sm' | 'lg' | 'xl' | undefined = undefined;
  isShowHeaderCloseButton: boolean = true;
  isShowProgressWhenSubmit: boolean = false;
  isKeyboardEvents: boolean = true;
  containerSelector?: string = undefined;
  DataFields: CustomModalField[] = [];

  OkCallback: Function | null = null;
  CancelCallback: Function | null = null;
  DismissCallback: Function | null = null;
  SubmitCallback: Function | null = null;

  constructor() {
  }
}

export class CustomPromptOptions {
  title: string = "";
  message: string = "";
  icon: 'no-icon' | 'success' | 'error' | 'warning' = 'no-icon';
  OkButtonText: string = 'OK';
  CancelButtonText: string = 'Cancel';
  dialogSize: 'sm' | 'lg' | 'xl' | undefined = undefined;
  isShowHeaderCloseButton: boolean = true;
  isShowProgressWhenSubmit: boolean = false;
  isKeyboardEvents: boolean = false;
  containerSelector?: string = undefined;
  DataFields: CustomModalField[] = [];

  OkCallback: Function | null = null;
  CancelCallback: Function | null = null;
  DismissCallback: Function | null = null;

  constructor() {
  }
}
export class CustomPromptFileOptions {
  title: string = "";
  message: string = "";
  OkButtonText: string = 'OK';
  dialogSize: 'sm' | 'md' | 'lg' | 'xl' | undefined = undefined;
  isShowHeaderCloseButton: boolean = true;
  isKeyboardEvents: boolean = false;
  containerSelector?: string = undefined;
  isShowDownloadButton: boolean = false;
  isMultipleFiles: boolean = false;

  OkCallback: Function | null = null;
  DownloadCallback: Function | null = null;
  DismissCallback: Function | null = null;

  constructor() {
  }
}

export class CustomModalField {
  title: string = '';
  type: 'text' | 'password' | 'checkbox'| 'textarea' = 'text';
  value: string | boolean = '';
  validations: ('required' | 'email' | 'trimOnChange' | 'phone')[] | undefined = undefined;
  colClass: 'col-md-3' |'col-md-6'|'col-md-9'|'col-md-12'|string = 'col-md-6';
}

export enum CustomModalButtons {
  SubmitCancel,
  Ok,
  OkCancel,
  YesNoCancel
}

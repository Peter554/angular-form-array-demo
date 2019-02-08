import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Page, PageElement } from '../models/page';
import { FormGroupFactoryService } from '../services/form-group-factory.service';
import { ValidationHelperService } from '../services/validation-helper.service';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit
{
  @Input()
  initialData: Page = null;

  @Output()
  pageSubmit = new EventEmitter<Page>();

  constructor(
    private formGroupFactoryService: FormGroupFactoryService,
    private validationHelper: ValidationHelperService
    ) { }

  form: FormGroup;
  showElement = 0;

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.showElement = 0;

    this.form = this.formGroupFactoryService.getBlankPageForm();

    if (this.initialData) {
      this.initialData.elements.forEach(element => {
        this.addElement(element);
      })
      this.showElement = 0;
    } else {
      this.addBlankElement();
    }    
  }

  addBlankElement(): void {
    this.elements.push(this.formGroupFactoryService.getBlankElementForm());
    this.navToElement(this.elements.length - 1);
  }

  addElement(element: PageElement): void {
    this.elements.push(this.formGroupFactoryService.getElementForm(element));
    this.navToElement(this.elements.length - 1);
  }

  deleteElement(idx: number) {
    this.elements.removeAt(idx);
    this.showElement = Math.max(this.showElement - 1, 0);
  }

  get elements(): FormArray {
    return this.form.get('elements') as FormArray;
  }

  get selectedElement(): FormGroup {
    return this.elements.at(this.showElement) as FormGroup;
  }

  navToElement(i: number): void {
    if (i != this.showElement) {
      this.validationHelper.touchAllControls(this.selectedElement);
      this.showElement = i;
    }
  }

  elementIsInvalid(element: FormGroup): boolean {
    return !element.valid && this.validationHelper.allControlsAreTouched(element);
  }

  reorderElements(dragDropEvent: CdkDragDrop<any>): void {
    const fromIdx = dragDropEvent.previousIndex;
    const toIdx = dragDropEvent.currentIndex;
    const elementToMove = this.elements.at(fromIdx);

    this.elements.removeAt(fromIdx);
    this.elements.insert(toIdx, elementToMove);
    
    if (fromIdx == this.showElement) {
      this.showElement = toIdx;
    } else if (fromIdx < this.showElement && toIdx >= this.showElement) {
      this.showElement = this.showElement - 1;
    } else if (fromIdx > this.showElement && toIdx <= this.showElement) {
      this.showElement = this.showElement + 1;
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      this.pageSubmit.emit(this.form.value);
    } else {
      this.validationHelper.touchAllControls(this.form);
    }
  }

  get formValueAsString(): string {
    return JSON.stringify(this.form.value, null ,2);
  }

  getPreview(text: string): string {
    return text.length > 20 ? text.substring(0, 18) + '...' : text;
  }
}
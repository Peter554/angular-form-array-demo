import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Page, PageElement } from '../models/page';
import { from } from 'rxjs';

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

  constructor(private fb: FormBuilder) { }

  form: FormGroup;
  showElement = 0;

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.showElement = 0;

    this.form = this.fb.group({
      elements: this.fb.array([])
    })

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
    const elementForm = this.fb.group({
      elementType: ['', [Validators.required]],
      elementText: ['', [Validators.required, Validators.minLength(5)]],
      elementNotes: this.fb.array([])
    })

    this.elements.push(elementForm);
    this.navToElement(this.elements.length - 1);
  }

  addElement(element: PageElement): void {
    const elementNoteForms = element.elementNotes.map(note => {
        return this.fb.group({
          noteText: [note.noteText, [Validators.required]]
        })
    })

    const elementForm = this.fb.group({
      elementType: [element.elementType, [Validators.required]],
      elementText: [element.elementText, [Validators.required, Validators.minLength(5)]],
      elementNotes: this.fb.array(elementNoteForms)
    })

    this.elements.push(elementForm);
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
      this.touchAllControls(this.selectedElement);
      this.showElement = i;
    }
  }

  allControlsAreTouched(fg: FormGroup): boolean {
    for(let i in fg.controls) {
      if (!fg.controls[i].touched) {
        return false;
      }
    }
    
    return true;
  }

  touchAllControls(fg: FormGroup): void {
    fg.markAsTouched();

    // A bit hacky but works.
    // Recurse down controls and mark as touched.
    for(let key in fg.controls) {
      const control = fg.controls[key] as any;
      control.markAsTouched();
      if (control.controls) {
        this.touchAllControls(control);
      }
    }
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
    this.pageSubmit.emit(this.form.value);
  }

  get formValueAsString(): string {
    return JSON.stringify(this.form.value, null ,2);
  }

  getPreview(text: string): string {
    return text.length > 20 ? text.substring(0, 18) + '...' : text;
  }
}
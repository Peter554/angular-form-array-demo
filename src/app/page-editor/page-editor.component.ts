import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Page, PageElement } from '../models/page';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit
{
  @Input()
  initialData: Page;

  constructor(private fb: FormBuilder) { }

  form: FormGroup;
  showElement = 0;

  ngOnInit() {
    this.resetForm();
  }

  resetForm(): void {
    this.showElement = 0;

    this.form = this.fb.group({
      elements: this.fb.array([])
    })

    this.addElement();
  }
  
  getBlankElement(): FormGroup {
    return this.fb.group({
      elementType: ['', [Validators.required]],
      elementText: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  addElement(): void {
    const newElement = this.getBlankElement();
    this.elements.push(newElement);
    this.navToElement(this.elements.length - 1);
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
      for(let i in fg.controls) {
        fg.controls[i].markAsTouched();
      }
  }

  submitForm(): void {
    console.log(this.formValue);
  }

  get formValue(): string {
    return JSON.stringify(this.form.value, null ,2);
  }
}
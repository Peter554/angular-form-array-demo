import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { DummyDatabaseService } from '../services/dummy-database.service';

@Component({
  selector: 'page-element-editor',
  templateUrl: './page-element-editor.component.html',
})
export class PageElementEditorComponent implements OnInit
{
  @Input()
  element = new FormGroup({});

  @Output()
  deleteRequest = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private dummyDatabase: DummyDatabaseService) { }

  ngOnInit() {
  }

  get elementTypes(): string[] {
    return this.dummyDatabase.elementTypes;
  };

  get questions(): string[] {
    return this.dummyDatabase.questions;
  }

  get operators(): string[] {
    return this.dummyDatabase.operators;
  }

  get rules(): FormArray {
    return this.element.get('elementRules') as FormArray;
  }

  makeDeleteRequest() {
    this.deleteRequest.emit();
  }

  addRule(): void {
    const emptyRule = this.fb.group({
      question: [this.questions[0], [Validators.required]],
      operator: [this.operators[0], [Validators.required]],
      keyScore: [5, [Validators.required]],
    })

    this.rules.push(emptyRule);
  }

  deleteRule(idx: number): void {
    this.rules.removeAt(idx);
  }
}
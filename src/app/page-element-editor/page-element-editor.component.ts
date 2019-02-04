import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

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

  elementTypes = ['Basic text', 'Link'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.notes);
  }

  get notes(): FormArray {
    return this.element.get('elementNotes') as FormArray;
  }

  makeDeleteRequest() {
    this.deleteRequest.emit();
  }

  addNote(): void {
    const emptyNote = this.fb.group({
      noteText: ['', [Validators.required]]
    })

    this.notes.push(emptyNote);
  }

  deleteNote(idx: number): void {
    this.notes.removeAt(idx);
  }
}
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'page-element-editor',
  templateUrl: './page-element-editor.component.html',
})
export class PageElementEditorComponent
{
  @Input()
  element = new FormGroup({});

  elementTypes = ['Basic text', 'Link'];
}
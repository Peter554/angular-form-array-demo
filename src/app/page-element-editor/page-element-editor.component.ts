import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DummyDatabaseService } from '../_services/dummy-database.service';
import { Subscription } from 'rxjs';
import { FormGroupFactoryService } from '../_services/form-group-factory.service';
import { ValidationHelperService } from '../_services/validation-helper.service';

@Component({
  selector: 'page-element-editor',
  templateUrl: './page-element-editor.component.html',
})
export class PageElementEditorComponent implements OnChanges
{
  @Input()
  element = new FormGroup({});

  @Output()
  deleteRequest = new EventEmitter<void>();

  cachedElementType: string = '';
  elementTypeSubscription: Subscription;

  constructor(
    private dummyDatabase: DummyDatabaseService,
    private formGroupFactoryService: FormGroupFactoryService,
    private validationHelper: ValidationHelperService
  ) { }

  ngOnChanges() {
    // if inputs changed we want to resubscribe
    if (this.elementTypeSubscription) {
      this.elementTypeSubscription.unsubscribe();
    }

    // manage change of element type
    this.elementTypeSubscription = this.element.get('elementType').valueChanges.subscribe(newElementType => {
      this.handleTypeChange(newElementType);
    })
  }

  get elementTypes(): string[] {
    return this.dummyDatabase.elementTypes;
  };

  get variables(): string[] {
    return this.dummyDatabase.variables;
  }

  get operators(): string[] {
    return this.dummyDatabase.operators;
  }

  get contentDataStore(): string[] {
    return this.dummyDatabase.contentDataStore;
  }

  get elementType(): string {
    return this.element.get('elementType').value;
  }

  get rules(): FormArray {
    return this.element.get('elementRules') as FormArray;
  }

  makeDeleteRequest() {
    this.deleteRequest.emit();
  }

  addRule(): void {
    this.rules.push(this.formGroupFactoryService.getBlankRuleForm());
  }

  deleteRule(idx: number): void {
    this.rules.removeAt(idx);
  }

  handleTypeChange(newElementType): void {
    if (this.cachedElementType == 'Prebuilt content') {
      this.element.get('elementText').setValue('');
    } else if (newElementType == 'Prebuilt content') {
      this.element.get('elementText').setValue(this.contentDataStore[0]);
    }

    this.element.get('elementVisualizationVariableOne').setValue('');
    this.element.get('elementVisualizationVariableTwo').setValue('');

    this.validationHelper.makeAllControlsUntouched(this.element);
    this.cachedElementType = newElementType;
  }
}
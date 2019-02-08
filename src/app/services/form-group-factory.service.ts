import { Injectable } from '@angular/core';
import { DummyDatabaseService } from './dummy-database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageElementRule, PageElement } from '../models/page';
import { ValidationHelperService } from './validation-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FormGroupFactoryService {

  constructor(
    private dummyDatabase: DummyDatabaseService,
    private fb: FormBuilder,
    private validationHelper: ValidationHelperService
  ) { }

  getBlankPageForm(): FormGroup {
    return this.fb.group({
      elements: this.fb.array([])
    })
  }

  getBlankElementForm(): FormGroup {
    return this.fb.group({
      elementType: ['', [Validators.required]],
      elementText: ['', [Validators.required, Validators.minLength(5)]],
      elementVisualizationVariableOne: [''],
      elementVisualizationVariableTwo: [''],
      elementRules: this.fb.array([])
    }, {validator: this.validationHelper.visualizationValidator})
  }

  getElementForm(element: PageElement) {
    const elementRuleForms = element.elementRules.map(rule => {this.getRuleForm(rule)})

    return this.fb.group({
      elementType: [element.elementType, [Validators.required]],
      elementText: [element.elementText, [Validators.required, Validators.minLength(5)]],
      elementVisualizationVariableOne: [element.elementVisualizationVariableOne],
      elementVisualizationVariableTwo: [element.elementVisualizationVariableTwo],
      elementRules: this.fb.array(elementRuleForms)
    }, {validator: this.validationHelper.visualizationValidator})
  }



  getBlankRuleForm(): FormGroup {
    const variables = this.dummyDatabase.variables;
    const operators = this.dummyDatabase.operators;

    return this.fb.group({
      variable: [variables[0], [Validators.required]],
      operator: [operators[0], [Validators.required]],
      keyScore: [5, [Validators.required]],
    })
  }

  getRuleForm(rule: PageElementRule) {
    return this.fb.group({
      variable: [rule.variable, [Validators.required]],
      operator: [rule.operator, [Validators.required]],
      keyScore: [rule.keyScore, [Validators.required]],
    })
  }
}

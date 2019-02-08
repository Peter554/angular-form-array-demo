import { Component } from '@angular/core';
import { Page, PageElement } from './models/page';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  initialData: Page = {
    elements: [
      {
        elementType: 'Basic text',
        elementText: 'Hello Page Editor!',
        elementVisualizationVariableOne: '',
        elementVisualizationVariableTwo: '',
        elementRules: []
      },
      {
        elementType: 'Link',
        elementText: 'www.google.com',
        elementVisualizationVariableOne: '',
        elementVisualizationVariableTwo: '',
        elementRules: []
      }
    ]
  }

  post(data: Page) {
    console.log('Form submission detected.');
    console.log(data);
  }
}

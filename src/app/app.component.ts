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
        elementNotes: [
          {
            noteText: 'A simple text note.'
          }
        ]
      },
      {
        elementType: 'Link',
        elementText: 'www.google.com',
        elementNotes: []
      }
    ]
  }

  post(data: Page) {
    console.log('Form submission detected.');
    console.log(data);
  }
}

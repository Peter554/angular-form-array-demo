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
        elementType: 'Text',
        elementText: 'Hello Page Editor!'
      },
      {
        elementType: 'Link',
        elementText: 'www.google.com'
      }
    ]
  }

  post(data: Page) {
    console.log(data);
  }
}

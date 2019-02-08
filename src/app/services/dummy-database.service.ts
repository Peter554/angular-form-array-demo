import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDatabaseService {

  elementTypes = ['Basic text', 'Link', 'Prebuilt content'];

  questions = [
    'Your age?',
    'Your shoe size?',
    'Your IQ?'
  ]

  operators = [
    '=',
    '<',
    '>',
  ]

  contentDataStore = [
    'Spicy jalapeno bacon ipsum dolor amet drumstick shankle porchetta short loin strip steak, salami kielbasa cupim corned beef frankfurter. Tri-tip frankfurter ball tip jowl, pig ribeye kevin beef ribs jerky buffalo spare ribs salami ground round. Ball tip flank burgdoggen rump corned beef pancetta. Ball tip tenderloin burgdoggen, meatball venison hamburger fatback kielbasa cupim sausage capicola.',
    'Prosciutto doner pancetta, meatball ball tip turkey beef ribs. Short loin salami brisket burgdoggen prosciutto beef ribs picanha pig cow landjaeger. Capicola sausage rump beef tenderloin. Pork short ribs salami filet mignon swine corned beef bacon doner hamburger prosciutto. Filet mignon bresaola tail ham hock.',
    'Shankle beef cow bresaola pork chop salami beef ribs doner pork belly meatloaf filet mignon t-bone ball tip jowl. Ball tip buffalo spare ribs boudin leberkas picanha bresaola shoulder chuck biltong corned beef drumstick ham hock. Buffalo ball tip turkey strip steak jerky. Tri-tip swine shank tongue chuck. Pastrami filet mignon tri-tip alcatra shank buffalo ball tip leberkas andouille beef t-bone cupim shankle burgdoggen bresaola.'
  ]
}

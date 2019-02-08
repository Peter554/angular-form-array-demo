import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDatabaseService {

  elementTypes = ['Basic text', 'Link'];

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
}

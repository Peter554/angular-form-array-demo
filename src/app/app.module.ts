import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { PageElementEditorComponent } from './page-element-editor/page-element-editor.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, DragDropModule ],
  declarations: [ AppComponent, PageEditorComponent, PageElementEditorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

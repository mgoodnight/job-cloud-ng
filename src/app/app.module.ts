import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CloudFormComponent } from './components/cloud-form/cloud-form.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CloudFormComponent,
    ImageContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessageComponent
  ]
})
export class SharedModule { }

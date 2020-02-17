import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { MomentPipe } from './_pipe/moment.pipe';

@NgModule({
  declarations: [
    MessageComponent,
    MomentPipe,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessageComponent,
    MomentPipe,
  ]
})
export class SharedModule { }

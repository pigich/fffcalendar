import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    MessageComponent,
    JwPaginationComponent,
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
    MessageComponent,
    JwPaginationComponent
  ]
})
export class SharedModule { }

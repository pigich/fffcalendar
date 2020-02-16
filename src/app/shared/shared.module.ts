import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { MomentPipe } from './_pipe/moment.pipe';

@NgModule({
  declarations: [
    MessageComponent,
    JwPaginationComponent,
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
    JwPaginationComponent,
    MomentPipe,
  ]
})
export class SharedModule { }

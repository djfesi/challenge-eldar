import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class CustomFormModule {}

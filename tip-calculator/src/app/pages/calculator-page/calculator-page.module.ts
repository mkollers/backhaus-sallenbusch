import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TextMaskModule } from 'angular2-text-mask';

import { CalculatorPageRoutingModule } from './calculator-page-routing.module';
import { CalculatorPageComponent } from './calculator-page.component';

@NgModule({
  declarations: [CalculatorPageComponent],
  imports: [
    CommonModule,
    CalculatorPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    TextMaskModule,

    // Material
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class CalculatorPageModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorPageComponent } from './calculator-page.component';

const routes: Routes = [{
  path: '', component: CalculatorPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorPageRoutingModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { debounce, map, startWith, filter, tap } from 'rxjs/operators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fg: FormGroup;
  salesBilling$: Observable<number>;
  gratuityCharge$: Observable<number>;

  // First, you need to create the `numberMask` with your desired configurations
  numberMask = createNumberMask({
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    prefix: ''
  });

  constructor(
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      group1: fb.control('0,00', [Validators.required]),
      expenses: fb.control('0,00', [Validators.required])
    });

    this.salesBilling$ = this.fg.valueChanges.pipe(
      debounce(() => timer(10)),
      map(this.tranformInputs),
      map(value => value.group1),
      startWith(0)
    );

    this.gratuityCharge$ = this.fg.valueChanges.pipe(
      debounce(() => timer(10)),
      map(this.tranformInputs),
      map(value => (value.group1 + value.expenses) * 0.015 + 0.3 * value.expenses),
      startWith(0)
    );
  }

  private tranformInputs(value: { group1: string, expenses: string }) {
    try {
      const group1 = +value.group1.replace('.', '').replace(',', '.');
      const expenses = +value.expenses.replace('.', '').replace(',', '.');
      return { group1, expenses };
    } catch (err) {
      return { group1: -1, expenses: -1 };
    }
  }
}

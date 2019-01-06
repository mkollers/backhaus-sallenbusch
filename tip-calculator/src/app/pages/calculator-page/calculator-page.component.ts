import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { debounce, map, startWith } from 'rxjs/operators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss']
})
export class CalculatorPageComponent {
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

    const valueChanges$ = this.fg.valueChanges.pipe(
      debounce(() => timer(10)),
      map(this.tranformInputs)
    );

    this.salesBilling$ = valueChanges$.pipe(
      map(value => value.group1),
      startWith(0)
    );

    this.gratuityCharge$ = valueChanges$.pipe(
      map(value => (value.group1 + value.expenses) * 0.015 + 0.3 * value.expenses),
      startWith(0)
    );
  }

  /**
   * Transforms formgroup values from string to numbers, because text-mask works with strings.
   * These strings must be transformed, because they are localized.
   * @param value FormGroup value
   */
  private tranformInputs(value: { group1: string, expenses: string }) {
    try {
      const group1 = +value.group1.replace('.', '').replace(',', '.');
      const expenses = +value.expenses.replace('.', '').replace(',', '.');
      return { group1, expenses };
    } catch (err) {
      return { group1: -1, expenses: -1 };
    }
  }

  select($event) {
    $event.target.select();
    setTimeout(() => { // Safari hack
      $event.target.select();
    }, 0);
  }

}

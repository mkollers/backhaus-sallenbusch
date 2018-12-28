import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { debounce, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fg: FormGroup;
  salesBilling$: Observable<number>;
  gratuityCharge$: Observable<number>;

  constructor(
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      group1: fb.control(0.00, [Validators.required, Validators.min(0)]),
      expenses: fb.control(0.00, [Validators.required, Validators.min(0)])
    });

    this.salesBilling$ = this.fg.valueChanges.pipe(
      debounce(() => timer(10)),
      map(value => value.group1),
      startWith(0)
    );

    this.gratuityCharge$ = this.fg.valueChanges.pipe(
      debounce(() => timer(10)),
      map(value => (value.group1 + value.expenses) * 0.015 + 0.3 * value.expenses),
      startWith(0)
    );
  }
}

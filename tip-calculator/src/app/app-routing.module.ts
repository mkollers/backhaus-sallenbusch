import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/calculator-page/calculator-page.module#CalculatorPageModule'
    },
    {
        path: 'imprint',
        loadChildren: './pages/imprint-page/imprint-page.module#ImprintPageModule'
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsUiComponent } from './pages/sports-ui/sports-ui.component';

const routes: Routes = [
  {
    path: 'sports',
    component: SportsUiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

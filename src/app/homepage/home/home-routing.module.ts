import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../homepage.component'

const Homeroutes: Routes = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(Homeroutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

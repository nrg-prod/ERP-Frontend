import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermgtaddComponent } from './usermgtadd/usermgtadd.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'usermgtadd', component: UsermgtaddComponent },

];



@NgModule({
  declarations: [UsermgtaddComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class UsermgtModule { }

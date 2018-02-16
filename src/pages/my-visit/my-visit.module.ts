import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVisitPage } from './my-visit';

@NgModule({
  declarations: [
    MyVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVisitPage),
  ],
})
export class MyVisitPageModule {}

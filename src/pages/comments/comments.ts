import { Component } from '@angular/core';
import {  NavController, NavParams ,PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-comment',
  templateUrl: 'comments.html',
})
export class commentPage implements OnInit {


    constructor(public navCtrl: NavController, public navParams: NavParams , public popoverCtrl: PopoverController, private _dataservice: DataServiceProvider) {
      
    }

    ngOnInit() { 
     
    }

    goBack() {
      this.navCtrl.pop();   
    }

   
}

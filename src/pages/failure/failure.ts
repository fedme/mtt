import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';


@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-failure',
  templateUrl: 'failure.html',
})
export class FailurePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public stimuli: Stimuli
  ) {
    //
  }

  ionViewDidLoad() {
    // If run inside an iframe, send data as Post Message to parent window
    if (window.parent) {
      window.parent.postMessage({
        'state': 'failure',
        'data': {
          'fail': true
        }
      }, '*');
    }
  }

  next() {
     // If run inside an iframe, send data as Post Message to parent window
     if (window.parent) {
      window.parent.postMessage({
        'state': 'failure-ack',
        'data': {}
      }, '*');
    }
  }


}

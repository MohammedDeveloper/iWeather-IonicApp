import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  /// base values
  city: string;
  state: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {

       /// set the city and state
    /// get the location value set in ionic storage module - Promise
    this.storage.get("location")
    .then((val) => {

      /// check for val
      if (val !== null) {

        /// parse the value
        let location = JSON.parse(val);
        this.city = location.city;
        this.state = location.state;
      }
      else {

        /// default values
        this.city = "Waukegan";
        this.state = "IL";
      }
    });
  }

  /// store location
  storeLocation() {

    /// set the location in IONIC local storage
    this.storage.set("location", JSON.stringify({
      city: this.city,
      state: this.state
    }));

    /// redirect
    this.navCtrl.push(HomePage);
  }
}

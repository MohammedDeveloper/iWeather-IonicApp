import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /// basic variables
  weather: any;
  location: any;

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {

  }

  ionViewWillEnter() {

    /// get the location value set in ionic storage module - Promise
    this.storage.get("location")
      .then((val) => {

        /// check for val
        if (val !== null) {

          /// parse the value
          this.location = JSON.parse(val);
        } else {

          /// set the default location
          this.location = {
            city: "Waukegan",
            state: "IL"
          }
        }

        /// get the weather details - observable
        this.weatherProvider.getWeather(this.location)
          .subscribe(weather => {
            this.weather = weather.current_observation;
          });
      });

  }
}

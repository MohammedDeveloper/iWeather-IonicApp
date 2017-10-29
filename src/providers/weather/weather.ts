import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = "";
  apiUrl = ""; /// http://api.wunderground.com/api/${this.apiKey}/conditions/q/CA/San_Francisco.json

  constructor(public http: Http) {

    /// set the API key
    this.apiKey = "c145e561531fd4ca";
    this.apiUrl = `https://api.wunderground.com/api/${this.apiKey}/conditions/q/`;
  }

  /// get weather - returns observable and use the subscribe in calling method
  getWeather(location) {

    /// get the location's weather
    /// use Reactive JS - observable and map
    return this.http.get(this.apiUrl + location.state + "/" + location.city + ".json")
      .map(res => res.json());
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weather } from '../models/Weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
    form!: FormGroup
    city!: string;

    OPEN_WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
    model= new Weather("Singapore", 0,0,0,"",0,0); 
    constructor(private fb: FormBuilder, 
        private weatherSvc : WeatherService){

    }

    ngOnInit(): void {
        this.form = this.createForm();
    }

    searchWeather(){
      console.log("search weather");
      this.city = this.form.value["city"];
      console.log(this.city);
      // this.weatherSvc.getWeather(this.city, this.OPEN_WEATHER_API_KEY)
      //     .then((result)=>{
      //       console.log(result);
      //       this.model = new Weather(
      //         this.city, result.main.temp,
      //         result.main.pressure,
      //         result.main.humidity,
      //         result.weather[0].description,
      //         result.wind.degree,
      //         result.wind.speed
      //       )
      //     }).catch((error)=>{
      //       console.error(error);
      //     });
      this.weatherSvc.getWeatherUsingObservable(this.city, this.OPEN_WEATHER_API_KEY)
          .subscribe((data: any) => {
            console.log(data);
            this.model = new Weather(
                this.city, data.main.temp,
                data.main.pressure,
                data.main.humidity,
                data.weather[0].description,
                data.wind.degree,
                data.wind.speed
              )
          });
    }

    private createForm(): FormGroup {
      return this.fb.group({city: this.fb.control<string>('', [Validators.required])})
    }
}

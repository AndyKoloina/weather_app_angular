import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = 'VOTRE_CLE_API'; // À remplacer

  getWeather(city: string): Observable<Weather> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
      .pipe(
        map(res => ({
          city: res.city.name,
          temp: Math.round(res.list[0].main.temp),
          condition: res.list[0].weather[0].main,
          icon: res.list[0].weather[0].icon,
          forecast: res.list.slice(0, 8).map((i: any) => ({
            date: i.dt_txt.split(' ')[1].substring(0, 5),
            temp: Math.round(i.main.temp)
          }))
        }))
      );
  }
}
import { Component, inject } from '@angular/core';
import { WeatherStore } from './store/weather.store';
import { ForecastChartComponent } from './components/forecast-chart.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ForecastChartComponent],
  template: `
    <div class="min-h-screen bg-slate-900 p-8 text-white font-sans">
      <div class="max-w-2xl mx-auto">
        <input #cityInput (keyup.enter)="store.updateWeather(cityInput.value)"
               placeholder="Rechercher une ville..."
               class="w-full p-4 rounded-2xl bg-slate-800 border-none text-white focus:ring-2 ring-indigo-500 mb-8 shadow-2xl">

        @if (store.loading()) {
          <div class="flex justify-center py-10"><div class="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>
        } @else if (store.weather(); as w) {
          <div class="bg-indigo-600 p-8 rounded-3xl shadow-2xl mb-8 transition-all scale-100">
            <h1 class="text-3xl font-bold">{{ w.city }}</h1>
            <div class="flex items-center justify-between mt-4">
              <span class="text-7xl font-black">{{ w.temp }}°C</span>
              <span class="text-xl opacity-80 uppercase tracking-widest">{{ w.condition }}</span>
            </div>
          </div>

          @defer (on timer(500ms)) {
            <div class="bg-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 class="text-gray-400 mb-4 uppercase text-sm font-bold tracking-widest">Prévisions 24h</h3>
              <app-forecast-chart [data]="store.chartData()" [labels]="store.chartLabels()" />
            </div>
          }
        }
      </div>
    </div>
  `
})
export class WeatherComponent {
  readonly store = inject(WeatherStore);
}
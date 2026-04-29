import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Weather } from '../../../core/models/weather.model';

export const WeatherStore = signalStore(
  { providedIn: 'root' },
  withState({
    weather: null as Weather | null,
    loading: false,
    error: null as string | null
  }),
  withComputed((store) => ({
    chartLabels: computed(() => store.weather()?.forecast.map(f => f.date) ?? []),
    chartData: computed(() => store.weather()?.forecast.map(f => f.temp) ?? [])
  })),
  withMethods((store, weatherService = inject(WeatherService)) => ({
    async updateWeather(city: string) {
      patchState(store, { loading: true, error: null });
      weatherService.getWeather(city).subscribe({
        next: (weather) => patchState(store, { weather, loading: false }),
        error: () => patchState(store, { error: 'Ville introuvable', loading: false })
      });
    }
  }))
);
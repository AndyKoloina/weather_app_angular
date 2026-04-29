import { Component, input, effect, viewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  template: `<canvas #chartCanvas></canvas>`,
  styles: [`canvas { height: 250px !important; }`]
})
export class ForecastChartComponent {
  data = input.required<number[]>();
  labels = input.required<string[]>();
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart?: Chart;

  constructor() {
    effect(() => {
      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.canvas().nativeElement, {
        type: 'line',
        data: {
          labels: this.labels(),
          datasets: [{
            label: 'Température °C',
            data: this.data(),
            borderColor: '#6366f1',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.1)'
          }]
        }
      });
    });
  }
}
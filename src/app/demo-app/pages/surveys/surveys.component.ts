import { Component, OnInit } from '@angular/core';


import { DemoService } from '../../../shared/services/demo.service';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { Survey } from '../../../shared/interfaces/survey';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, CommonModule, MatCardModule],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent implements OnInit {

  promedioServicio: number = 4.2; // Simulación de datos
  promedioCalidadComida: number = 4.5;
  porcentajeTiempoEspera: number = 80; // 80% de "Sí" al tiempo de espera
  porcentajeRecomendacion: number = 90; // 90% recomendarían
  sugerencias: string[] = [
    // 'Más opciones vegetarianas', 'Mejorar el servicio de bebidas'
  ];
  totalEncuestas: number = 120;

  surveys: Survey[] = [];
  business!: BusinessInformation; 

  constructor(
    private activatedRouter : ActivatedRoute,
    private menuService : DemoService
  ){

    this.activatedRouter.params.subscribe(params=>{
      const idBu = params['id']
      
     if(idBu){
      this.menuService.getBussiness(idBu).subscribe(data=>{
        this.business = data;
      })
      this.menuService.getSurveys(idBu).subscribe(data=>{
        this.surveys = data;
        this.totalEncuestas = this.surveys.length

        this.promedioServicio = this.calcularPromedioServicio();
        this.promedioCalidadComida = this.calcularPromedioCalidadComida();
        this.porcentajeTiempoEspera = this.calcularPorcentajeTiempoEspera();
        this.porcentajeRecomendacion = this.calcularPorcentajeRecomendacion()
        this.surveys.forEach(sur=>{
          if(sur){
            this.sugerencias.push(sur.sugerencias)
          }
        })
      })
     }

      
    })
    

  }
  ngOnInit(): void {
    this.renderChart();
  }

  calcularPromedioServicio(): number {
    const total = this.surveys.reduce((acc, survey) => acc + survey.servicio, 0);
    return this.surveys.length ? total / this.surveys.length : 0;
  }

  // Promedio de calidad de comida
  calcularPromedioCalidadComida(): number {
    const total = this.surveys.reduce((acc, survey) => acc + survey.calidadComida, 0);
    return this.surveys.length ? total / this.surveys.length : 0;
  }

  // Porcentaje de tiempo de espera adecuado
  calcularPorcentajeTiempoEspera(): number {
    const totalAdecuado = this.surveys.filter(survey => survey.tiempoEspera === 'si').length;
    return this.surveys.length ? (totalAdecuado / this.surveys.length) * 100 : 0;
  }

  // Porcentaje de recomendación del restaurante
  calcularPorcentajeRecomendacion(): number {
    const totalRecomendaciones = this.surveys.filter(survey => survey.recomendacion === 'si').length;
    return this.surveys.length ? (totalRecomendaciones / this.surveys.length) * 100 : 0;
  }

  // Obtener sugerencias de los clientes
  obtenerSugerencias(): string[] {
    return this.surveys
      .map(survey => survey.sugerencias)
      .filter(sugerencia => sugerencia && sugerencia.trim() !== ''); // Elimina sugerencias vacías
  }

  // Total de encuestas completadas
  totalEncuestasCompletadas(): number {
    return this.surveys.length;
  }

  renderChart() {
    // Registrar los controladores y elementos que vas a utilizar
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
          datasets: [{
            label: 'Encuestas Completadas',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }



}

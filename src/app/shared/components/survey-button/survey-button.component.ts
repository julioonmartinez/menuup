import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-survey-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './survey-button.component.html',
  styleUrl: './survey-button.component.scss'
})
export class SurveyButtonComponent {

}

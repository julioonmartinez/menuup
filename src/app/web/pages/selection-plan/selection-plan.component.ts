import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-selection-plan',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './selection-plan.component.html',
  styleUrl: './selection-plan.component.scss'
})
export class SelectionPlanComponent {

  period : 'month' | 'year' = 'month';

  selectionPeriod(per: 'month' | 'year' ){
    this.period = per
  }

}

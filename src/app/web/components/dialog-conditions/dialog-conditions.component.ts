import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-conditions',
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule],
  templateUrl: './dialog-conditions.component.html',
  styleUrl: './dialog-conditions.component.scss'
})
export class DialogConditionsComponent {

  data: string = inject(MAT_DIALOG_DATA)

}

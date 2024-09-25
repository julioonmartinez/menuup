import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-business',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions],
  templateUrl: './dialog-delete-business.component.html',
  styleUrl: './dialog-delete-business.component.scss'
})
export class DialogDeleteBusinessComponent {

}

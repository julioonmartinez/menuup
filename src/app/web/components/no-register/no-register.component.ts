import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-no-register',
  standalone: true,
  imports: [MatButtonModule, MatIconButton],
  templateUrl: './no-register.component.html',
  styleUrl: './no-register.component.scss'
})
export class NoRegisterComponent {

}

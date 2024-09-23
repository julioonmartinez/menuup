import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoRegisterComponent } from '../../components/no-register/no-register.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NoRegisterComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  currenUser: boolean | null = null;

}

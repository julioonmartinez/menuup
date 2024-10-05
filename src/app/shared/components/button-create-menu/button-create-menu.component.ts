import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-create-menu',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './button-create-menu.component.html',
  styleUrl: './button-create-menu.component.scss'
})
export class ButtonCreateMenuComponent {

}

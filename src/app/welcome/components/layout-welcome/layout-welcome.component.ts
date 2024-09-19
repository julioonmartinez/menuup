import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-welcome',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-welcome.component.html',
  styleUrl: './layout-welcome.component.scss'
})
export class LayoutWelcomeComponent {

}

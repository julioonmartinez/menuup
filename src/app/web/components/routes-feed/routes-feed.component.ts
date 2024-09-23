import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-routes-feed',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, MatButtonModule],
  templateUrl: './routes-feed.component.html',
  styleUrl: './routes-feed.component.scss'
})
export class RoutesFeedComponent {

}

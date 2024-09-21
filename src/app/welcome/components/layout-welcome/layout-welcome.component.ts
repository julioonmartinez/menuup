import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-welcome',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './layout-welcome.component.html',
  styleUrl: './layout-welcome.component.scss'
})
export class LayoutWelcomeComponent implements OnInit {

  public loading: boolean = true;
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false
    }, 1500)
  }

 

}

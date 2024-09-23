import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent {

  @Input() maxRating: number = 5;
  rating: number = 0;
  stars: boolean[] = Array(this.maxRating).fill(false);

  private onChange: any = () => {};
  private onTouched: any = () => {};

  // Escribe la calificación
  writeValue(value: number): void {
    this.rating = value || 0;
    this.updateStars();
  }

  // Registra el cambio de valor
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra el toque
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Actualiza el array de estrellas
  updateStars() {
    this.stars = Array(this.maxRating).fill(false).map((_, index) => index < this.rating);
  }

  // Establece la calificación
  setRating(index: number) {
    this.rating = index + 1;
    this.updateStars();
    this.onChange(this.rating);
    this.onTouched();
  }

}

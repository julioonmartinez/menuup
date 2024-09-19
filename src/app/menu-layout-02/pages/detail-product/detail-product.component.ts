import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {

  constructor(
    private activatedRouter : ActivatedRoute,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {product: Product}
  ){

  }
  ngOnInit(): void {
    console.log(this.data.product)
  }



}

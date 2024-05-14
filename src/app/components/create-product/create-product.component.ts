import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  product: Product = {
    id: 0,
    handle: '',
    title: '',
    description: '',
    sku: 0,
    grams: 0,
    stock: 0,
    price: 0,
    comparePrice: 0,
    barcode: 0,
  };

  constructor(
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  saveChanges() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.product.id = data[data.length - 1].id + 1;
        this._productService.createProduct(this.product).subscribe({
          next: () => {
            this.router.navigate([`/dashboard/${this.product.id}`]);
          },
          error: (e) => {
            this.toastr.error(
              'Ocurrio un error, intentelo más tarde.',
              'Error'
            );
            this.router.navigate(['/dashboard']);
          },
        });
      },
      error: (e) => {
        this.toastr.error('Ocurrio un error, intentelo más tarde.', 'Error');
        this.router.navigate(['/dashboard']);
      },
    });
  }
}

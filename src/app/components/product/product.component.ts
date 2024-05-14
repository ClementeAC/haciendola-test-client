import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
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
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProduct(productId);
    }
  }

  getProduct(id: string) {
    this._productService.getProductById(id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        console.error('Failed to fetch product', error);
      }
    );
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveChanges() {
    this._productService.updateProduct(this.product).subscribe({
      next: () => {
        this.isEditing = false;
      },
      error: (e) => {
        this.toastr.error('Ocurrio un error, intentelo más tarde.', 'Error');
        this.router.navigate(['/dashboard']);
      },
    });
    this.isEditing = false;
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this._productService.deleteProduct(this.product.id).subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Failed to delete product', error);
        }
      );
    }
  }
}

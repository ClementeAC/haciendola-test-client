import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  productList: Product[] = [];

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.toastr.error('No autorizado.', 'Error');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Ocurrio un error, intentelo más tarde.', 'Error');
          this.router.navigate(['/login']);
        }
      },
    });
  }

  viewProduct(id: number) {
    this.router.navigate([`/dashboard/${id}`]);
  }
}

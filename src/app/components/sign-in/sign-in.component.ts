import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [FormsModule, RouterModule, SpinnerComponent, CommonModule],
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
  ) {}

  addUser() {
    if (
      this.username == '' ||
      this.password == '' ||
      this.confirmPassword == ''
    ) {
      console.log('hola');
      this.toastr.error('Por favor, llene todos los campos.', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden.', 'Error');
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('Usuario creado exitosamente', 'Bienvenido/a');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.loading = false;
        if (e.error.msg) {
          this.toastr.error(e.error.msg, 'Error');
        } else {
          this.toastr.error('Ocurrio un error', 'Error');
        }
      },
    });
  }
}

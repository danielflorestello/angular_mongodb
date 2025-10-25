import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string | undefined;
  password: any;
  errorMessage: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  login(): void {
    if (!this.username) {
      this.errorMessage = 'Ingrese usuario, por favor.'
      alert(this.errorMessage);

    } else if (!this.password) {
      this.errorMessage = 'Ingrese contraseña, por favor.'
      alert(this.errorMessage);

    } else {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.authService.saveData(response.id, response.user, this.password);
          this.router.navigate(['principal']);
        },

        error: (e) => {
          console.error(e);
          this.errorMessage = 'Los datos ingresados son erróneos.';
          alert(this.errorMessage);
        },
      })
    }
  }
}

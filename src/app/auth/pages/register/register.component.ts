import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario : FormGroup = this.fb.group({
    nombre: ['Piero', [Validators.required]],
    email: ['piero@aldaves.com', [Validators.required, Validators.email]],
    password: ['piero123', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { nombre, email, password } = this.miFormulario.value;

    this.authService.registro(nombre,email,password).subscribe( ok => {
      if (ok === true) {

        this.router.navigateByUrl('/dashboard');
        
      } else{
        console.log(ok);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok
        })
      }
    })




  }

}

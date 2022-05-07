import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario : FormGroup = this.formBuilder.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { email, password} = this.miFormulario.value

    this.authService.login(email, password).subscribe( ok => {
      if ( ok === true ) {
        
        this.router.navigateByUrl('/dashboard');
      }
      else {
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent {

  constructor(
    private router: Router,
  ) { }
  openTypePage(value: string): void {

    if (value === 'admin') {
      const url = '/home/admin'
      this.router.navigate([url])
    } else {
      const url2 = '/home/user'
      this.router.navigate([url2])
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {OnInit,OnDestroy} from '@angular/core'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/about']);
  }

  ngOnInit() {
    document.body.classList.add('home-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('home-page');
  }
  navigateToAbout() {
    this.router.navigate(['/about']);
  }

 navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToFAQs() {
    this.router.navigate(['/faqs']).then(() => {
      window.scrollTo(0,0);
    })
  }
}

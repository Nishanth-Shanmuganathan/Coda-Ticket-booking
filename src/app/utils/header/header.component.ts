import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn;
  constructor(
    private route:Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(res=>{
      this.loggedIn = !!res
    })
  }

  logout(){
    localStorage.removeItem('token')
    this.authService.loggedIn.next(null)
    this.route.navigate(['/'])
  }
}

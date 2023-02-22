import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.checkAuthenticated()) this.router.navigate(['/']);
    else {
      console.log('redirect login');
      this.router.navigate(['/login']);
    }
  }

  private checkAuthenticated(): boolean {
    let unparsed = localStorage.getItem('user');
    if(unparsed !== null) {
      try{
        localStorage.removeItem('user');
        let user = JSON.parse(unparsed);
        console.log(user);
        return true;
      }catch (e) {
        return false;
      }
    }
    return false;
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  readonly APIUrl = "http://localhost:58241/api";
  users: any;
  subscription: Subscription;
 
  constructor(private service: HttpClient ) { }

  ngOnInit(): void {
    this.subscription = this.service.get<any>(this.APIUrl + '/user').subscribe(resp=>{
      this.users = resp; 
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

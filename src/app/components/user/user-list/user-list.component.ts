import { Component, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { DataService } from 'src/app/services/data.service';
import { User } from '../../../models/user.model'


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: Array<User>;
  public userIdToDelete: number;
  private showButtonLoadMore: boolean = true;
  private skip: number = 0;
  private take: number = 10;

  constructor(private dataStorageService: DataStorageService
    , private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataStorageService.getAll('user').subscribe(res => {
      this.users = res;
    });
  }

  loadMore() {
    this.dataStorageService.getAll('user').subscribe(res => {
      this.users = res;
    });
  }

  onEdit(user: User) {
    console.log(user);
    this.dataService.selectedUser = user;
  }

  setUserIdToDelete(id: number) {
    this.userIdToDelete = id;
  }
  onDelete(id: number) {
    this.dataStorageService.deleteById('user', id).subscribe(res => {
      this.loadData();
    });
  }

  onAssign(user: User) {
    this.dataService.selectedUser = user;
    console.log(user);
  }
}

import { Component, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';
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

  constructor(private service: DataStorageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll('user').subscribe(res => {
      this.users = res;
    });
  }

  loadMore() {
    this.service.getAll('user').subscribe(res => {
      this.users = res;
    });
  }

  onAdd() {

  }

  onEdit() {

  }

  setUserIdToDelete(id: number) {
    this.userIdToDelete = id;
  }
  onDelete(id: number) {
    this.service.deleteById('user', id).subscribe(res => {
      this.loadData();
    });
  }

  onAssign() {

  }
}

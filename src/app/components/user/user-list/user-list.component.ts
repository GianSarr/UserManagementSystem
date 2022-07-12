import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  public usersToShow: Array<User>;
  public userIdToDelete: number;
  public search: string;
  private _search: Subject<any> = new Subject();
  public usersCount: number = 0;
  private skip: number = 0;
  private take: number = 10;
  public orderColumn = 'userId';
  public orderDirection = 'asc';
  public currentPage = 1;

  constructor(private dataStorageService: DataStorageService
    , private dataService: DataService) {
  }

  ngOnInit(): void {
    this._search.pipe(debounceTime(500)).subscribe(() => {
      if (this.search.trim().length > 0) {
        this.loadData(this.search);
      }
    });
    this.loadData();
  }

  loadData(filter?: string) {
    if (filter) {
      this.dataStorageService.getAll('user/' + filter)
        .subscribe(res => {
          this.users = res;
          this.usersCount = (this.users.length / 10) < 1 ?
            1 : Math.ceil(this.users.length / 10);
          this.getUsersToShow();
        });
    } else {
      this.dataStorageService.getAll('user').subscribe(res => {
        this.users = res;
        this.usersCount = (this.users.length / 10) < 1 ?
          1 : Math.ceil(this.users.length / 10);
        this.getUsersToShow();
      });
    }
  }

  onEdit(user: User) {
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
  }

  //#region Pagination

  getUsersToShow() {
    this.usersToShow = this.users.splice(this.skip, this.take);
  }

  nextPage(nextPage: number) {
    this.currentPage = nextPage;
    this.skip = 10 * (nextPage - 1);
    this.loadData();
  }

  getDisabledButton(currentPage: number) {
    return this.currentPage == currentPage ? true : false;
  }

  //#endregion Pagination


  //#region Filtering and sorting

  filterUserList() {
    if (this.search) {
      if (this.search.trim().length > 0) {
        this._search.next();
      }
    }
    else {
      this.loadData();
    }
  }

  sort(column: string) {
    if (this.orderColumn === column) {
      this.orderColumn = column;
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.orderColumn = column;
      this.orderDirection == 'asc';
    }
  }

  //#endregion Filtering and sorting

}

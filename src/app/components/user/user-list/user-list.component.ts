import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

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
  public search: string;
  private _search: Subject<any> = new Subject();
  private showButtonLoadMore: boolean = true;
  private skip: number = 0;
  private take: number = 10;
  public orderColumn = 'userId';
  public orderDirection = 'asc'

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
      this.dataStorageService.getAll('user/' + filter.trim())
        .subscribe(res => { this.users = res })
    } else {
      this.dataStorageService.getAll('user').subscribe(res => {
        this.users = res;
      });
    }
  }

  loadMore() {
    this.dataStorageService.getAll('user').subscribe(res => {
      this.users = res;
    });
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

  //#region "Filtering and sorting"

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

  //#endregion "Filtering and sorting"

}

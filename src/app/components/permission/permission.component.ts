import { Component, OnInit } from '@angular/core';

import { Permission } from 'src/app/models/permission.model';
import { UserPermission } from 'src/app/models/userPermission.model';
import { User } from 'src/app/models/user.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  user: User = new User();
  userPermissions: Array<Permission>
  permissions: Array<Permission>;

  constructor(private dataStorageService: DataStorageService
    , private httpClient: HttpClient
    , private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.dataService.selectedUser;
    this.loadData();
  }

  loadData() {
    this.dataStorageService.permissionsByUserId(this.user.userId).subscribe(res => {
      this.userPermissions = res;
    })

    this.dataStorageService.getAll('permission').subscribe(res => {
      this.permissions = res;
    });
  }

  onAdd(item: Permission) {
    let obj = new UserPermission(this.user.userId, item.permissionId);
    this.dataStorageService.post('userPermission', obj).subscribe(res => {
      this.loadData();
    });
  }

  onDelete(permissionId: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: this.user.userId,
        permissionId: permissionId,
      },
    };
    this.dataStorageService.delete('userPermission', options)
      .subscribe(res => {
        this.loadData();
      }, () => {
      });
  }


  getDisabledPermission(permissionId: number) {
    if (!this.userPermissions == null && this.userPermissions.length == 0) {
      return false;
    }
    if (this.userPermissions?.find(p => p.permissionId == permissionId))
      return true;
    return false;
  }
}

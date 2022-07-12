import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { User } from 'src/app/models/user.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  formTitle: 'Add user' | 'Edit user';
  actionMode: 'Add' | 'Edit';
  public model: User = new User();

  constructor(private service: DataStorageService
    , private dataService: DataService
    , private router: Router) { }
  ngOnInit(): void {
    if (this.dataService.selectedUser) {
      this.formTitle = 'Edit user';
      this.actionMode = 'Edit';
      this.model = this.dataService.selectedUser;
    } else {
      this.formTitle = 'Add user';
      this.actionMode = 'Add';
    }
  }

  onSave() {
    if (this.actionMode === 'Add') {
      this.service.post('user', this.model).subscribe(res => {
        this.router.navigate(['']);
      });
    } else {
      this.service.put('user', this.model.userId, this.model).subscribe(res => {
        this.router.navigate(['']);
      });
    }
  }

  onCancel() {
    this.dataService.selectedUser = null;
  }
}

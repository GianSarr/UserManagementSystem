import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public actionMode: 'List' | 'Add' | 'Edit' = 'List';

  constructor(private service: DataStorageService
    , private route: ActivatedRoute) {
    this.actionMode = this.route.snapshot.data['actionMode'];
  }

  ngOnInit(): void {
  }

  get visibleUserList() {
    return this.actionMode === 'List';
  }

  get visibleUserAddEdit() {
    return this.actionMode === 'Add'
      || this.actionMode === 'Edit';
  }
}

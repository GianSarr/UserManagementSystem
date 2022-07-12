import { Injectable } from '@angular/core';

import { User } from '../models/user.model'
import { Permission } from '../models/permission.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public selectedUser: User;
  public selectedPermission: Permission;


  constructor() { }
}

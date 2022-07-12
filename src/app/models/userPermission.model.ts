import { User } from '../models/user.model';
import { Permission } from '../models/permission.model';

export class UserPermission {
  public userId?: number;
  public permissionId?: number;
  public permissions?: Array<Permission>

  constructor(private _userId?: number,
    private _permissionId?: number,
    private _permissions?: Array<Permission>) {
    this.userId = _userId;
    this.permissionId = _permissionId;
    this.permissions = _permissions;

  }
}

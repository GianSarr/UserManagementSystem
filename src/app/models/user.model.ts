import { Permission } from '../models/permission.model';

export class User {
  public userId?: number;
  public firstName?: string;
  public lastName?: string;
  public userName?: string;
  public email?: string;
  public password?: string;
  public status?: string;
  public permission?: Array<Permission>;

  constructor(private _userId?: number
    , private _firstName?: string
    , private _lastName?: string
    , private _userName?: string
    , private _email?: string
    , private _password?: string
    , private _status?: string
    , private _permission?: Array<Permission>) {
    this.userId = _userId;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.userName = _userName;
    this.email = _email;
    this.status = _status;
    this.permission = _permission;
  }
}

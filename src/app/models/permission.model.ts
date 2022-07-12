import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Permission {
  public permissionId?: number;
  public code?: string;
  public description?: string;

  constructor(private _permissionId?: number
    , private _code?: string
    , private _description?: string) {
    this.permissionId = _permissionId;
    this.code = _code;
    this.description = _description;
  }
}

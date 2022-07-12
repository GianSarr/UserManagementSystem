import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly APIUrl = "http://localhost:58241/api/";

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns list of objects (type of controllerName)
   * @param controllerName part of URL(controller)
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  getAll(controllerName: string): Observable<any> {
    return this.httpClient.get<any>(this.APIUrl + `${controllerName}`)
      .pipe
      (
        map(res => { return res })
        , catchError(err => { return throwError(err) })
      );
  }

  /**
   * POST method sends data to a server to create resource. 
   * @param controllerName  part of URL(controller)
   * @param obj Object to add
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  post<T>(controllerName: string, obj: T): Observable<any> {
    let result;
    try {
      result = this.httpClient.post(this.APIUrl + `${controllerName}`, obj)
        .pipe
        (
          map(res => { return res })
          , catchError(err => { return throwError(err) })
        );
    } catch (ex) {
      return empty();
    }
    return result;
  }

  /**
  * PUT method sends data to a server to update resource.
  * @param controllerName  part of URL(controller)
  * @param id Object id
  * @param obj Object to update
  * @returns An Observable of the HTTPResponse for the request, with a response body in the requested type.
  */
  put<T>(controllerName: string, id: number, obj: T): Observable<any> {
    return this.httpClient.put<any>(this.APIUrl + `${controllerName}/${id}`, obj)
      .pipe
      (
        map(res => { return res })
        , catchError(err => { return throwError(err) })
      );
  }

  /**
   * Delete method for objects with composite key.
   * @param controllerName  part of URL(controller)
   * @param obj Object to delete
   * @returns An Observable of the response, with the response body of type Object.
   */
  delete<T>(controllerName: string, obj: T): Observable<any> {
    return this.httpClient.delete(this.APIUrl + `${controllerName}`, obj)
      .pipe
      (
        map(res => { return res })
        , catchError(err => { return throwError(err) })
      );
  }

  /**
   * Deletes the resource if the id param is the same as the id of the obj param
   * @param controllerName  part of URL(controller)
   * @param id Object id
   * @param obj Object to update
   * @returns An Observable of the HTTPResponse for the request, with a response body in the requested type.
   */
  deleteById(controllerName: string, id: number): Observable<any> {
    return this.httpClient.delete(this.APIUrl + `${controllerName}/${id}`,)
      .pipe
      (
        map(res => { return res })
        , catchError(err => { return throwError(err) })
      );
  }

  /**
   * Returns list of userPermission objects 
   * @param id User id
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  permissionsByUserId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.APIUrl + `permission/${id}`,)
      .pipe
      (
        map(res => { return res })
        , catchError(err => { return throwError(err) })
      );
  }
}

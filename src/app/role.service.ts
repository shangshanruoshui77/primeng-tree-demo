import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {Role} from "./role";

@Injectable()
export class RoleService extends BaseService {
  private apiUrl: string = "/api/roles";

  constructor(private http: Http) {
    super();
  }

  getRoles(): Promise<Role[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(res => res.json().data as Role[])
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}

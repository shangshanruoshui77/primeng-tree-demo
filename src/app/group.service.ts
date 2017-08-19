import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Group} from "./group";
import "rxjs/add/operator/toPromise";
import {BaseService} from "./base.service";

@Injectable()
export class GroupService extends BaseService {
  private apiUrl: string = "/api/groups";

  constructor(private http: Http) {
    super();
  }

  getGroups(): Promise<Group[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(res => res.json().data as Group[])
      .catch(this.handleError);
  }

  create(groupName: string): Promise<Group> {
    return this.http
      .post(this.apiUrl, JSON.stringify({groupName: groupName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Group)
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

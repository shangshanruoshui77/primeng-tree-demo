import {Headers} from "@angular/http";

export abstract class BaseService {
  protected headers = new Headers({'Content-Type': 'application/json'});

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  abstract delete(id: number): Promise<void>;
}

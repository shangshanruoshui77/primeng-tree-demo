import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const groups = [
      {
        "id": 1,
        "groupName": "Group 1"
      },
      {
        "id": 2,
        "groupName": "Group 2"
      },
      {
        "id": 3,
        "groupName": "Group 3"
      },
      {
        "id": 4,
        "groupName": "Group 4"
      },
      {
        "id": 5,
        "groupName": "Group 5"
      }
    ];

    const roles = [
      {
        "id": 1,
        "roleName": "Role 1",
        "parentId": 1
      },
      {
        "id": 2,
        "roleName": "Role 2",
        "parentId": 1
      },
      {
        "id": 3,
        "roleName": "Role 3",
        "parentId": 2
      },
      {
        "id": 4,
        "roleName": "Role 4",
        "parentId": 2
      },
      {
        "id": 5,
        "roleName": "Role 5",
        "parentId": 3
      },
      {
        "id": 6,
        "roleName": "Role 5",
        "parentId": 3
      },
      {
        "id": 7,
        "roleName": "Role 5",
        "parentId": 4
      },
      {
        "id": 8,
        "roleName": "Role 5",
        "parentId": 5
      }
    ];

    return {groups, roles};
  }
}

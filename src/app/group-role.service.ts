import {Injectable} from '@angular/core';
import {GroupService} from "./group.service";
import {RoleService} from "./role.service";
import {TreeNode} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/zip";
import {Group} from "./group";
import {Role} from "./role";

@Injectable()
export class GroupRoleService {

  constructor(private groupService: GroupService,
              private roleService: RoleService) {
  }

  private static isExpanded(oldTreeNodes: TreeNode[], group: Group): boolean {
    for (let i = 0; i < oldTreeNodes.length; i++) {
      let node: TreeNode = oldTreeNodes[i];
      if (node.data.id == group.id) {
        return node.expanded;
      }
    }

    return false;
  }

  private static combineTreeNodes(groups: Group[], roles: Role[], oldTreeNodes: TreeNode[]): TreeNode[] {
    let treeNodes: TreeNode[] = [];
    for (let i = 0; i < groups.length; i++) {
      let groupNode: TreeNode = {};
      let group: Group = groups[i];
      groupNode.label = group.groupName;
      groupNode.data = group;
      groupNode.children = [];

      if (oldTreeNodes) {
        groupNode.expanded = GroupRoleService.isExpanded(oldTreeNodes, group);
      }

      for (let j = 0; j < roles.length; j++) {
        let role: Role = roles[j];
        if (role.parentId == group.id) {
          let roleNode: TreeNode = {};
          roleNode.label = role.roleName;
          roleNode.data = role;
          roleNode.icon = 'fa-user';
          groupNode.children.push(roleNode);
        }
      }

      treeNodes.push(groupNode);
    }

    return treeNodes;
  }

  getTreeNodes(): Promise<TreeNode[]> {
    return Observable.zip(
      this.groupService.getGroups(),
      this.roleService.getRoles(),
      (groups, roles) => GroupRoleService.combineTreeNodes(groups, roles, null)).toPromise();
  }

  getTreeNodesEx(treeNodes: TreeNode[]): Promise<TreeNode[]> {
    return Observable.zip(
      this.groupService.getGroups(),
      this.roleService.getRoles(),
      (groups, roles) => GroupRoleService.combineTreeNodes(groups, roles, treeNodes)).toPromise();
  }
}

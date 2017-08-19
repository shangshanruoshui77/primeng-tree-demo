import {Component, OnInit} from '@angular/core';
import {MenuItem, Message, TreeNode} from "primeng/primeng";
import {GroupRoleService} from "./group-role.service";
import {GroupService} from "./group.service";
import {RoleService} from "./role.service";
import {Group} from "./group";
import {BaseService} from "./base.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GroupRoleService, GroupService, RoleService]
})
export class AppComponent implements OnInit {
  selectedNode: TreeNode;
  items: MenuItem[];
  nodeTree: TreeNode[];
  msgs: Message[];
  groupName: string;

  constructor(private groupRoleService: GroupRoleService,
              private groupService: GroupService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'View', icon: 'fa-search', command: (event) => this.showSelectedNode(this.selectedNode)},
      {label: 'Delete', icon: 'fa-remove', command: (event) => this.deleteNode()}
    ];

    this.updateTreeNodes();
  }

  addGroup(): void {
    if (this.groupName) {
      this.groupService.create(this.groupName).then(node => {
        this.selectedNode = null;
        this.updateTreeNodes();
        this.showAddedGroup(node);
      });
    }
  }

  private updateTreeNodes(): void {
    this.groupRoleService.getTreeNodesEx(this.nodeTree).then(nodes => {
      this.nodeTree = nodes;
      console.log(nodes);
    });
  }

  private showAddedGroup(group: Group): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Node Added', detail: group.groupName});
  }

  private showSelectedNode(node: TreeNode): void {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Selected', detail: node.label});
  }

  private showDeletedNode(node: TreeNode): void {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Node Deleted', detail: node.label});
  }

  private deleteNode(): void {
    let node: TreeNode = this.selectedNode;
    if (node.data.hasOwnProperty('groupName')) {
      // TODO: delete special group owner roles?
      this.delete(this.groupService, node);
    } else if (node.data.hasOwnProperty('roleName')) {
      this.delete(this.roleService, node);
    }
  }

  private delete(service: BaseService, node: TreeNode): void {
    service.delete(node.data.id).then(() => {
      this.updateTreeNodes();
      this.showDeletedNode(node);
      this.selectedNode = null;
    });
  }
}

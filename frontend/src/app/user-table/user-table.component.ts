import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
// import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    console.log("called");
    
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log("users", users);
      
    });
  }

  editUser(user: User) {
    this.editingUser = { ...user };
    this.userService.setEditingUser(this.editingUser);
  }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }

  generatePDF() {
    this.userService.generatePDF().subscribe(blob => {
      // saveAs(blob, 'users.pdf');
    });
  }
}

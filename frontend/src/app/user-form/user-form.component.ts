import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: Partial<User> = {};
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getEditingUser().subscribe(editingUser => {
      if (editingUser) {
        this.user = editingUser;
        this.isEditing = true;
      } else {
        this.resetForm();
        this.isEditing = false;
      }
    });
  }

  onSubmit() {
    console.log(this.user);
    
    if (this.isEditing) {
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.resetForm();
        this.isEditing = false;
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.user = {};
    this.userService.setEditingUser(null);
  }
}

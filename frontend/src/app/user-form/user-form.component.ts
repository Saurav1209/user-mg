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
  isOpen = false;
  isEditMode = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    
    this.userService.getEditingUser().subscribe(editingUser => {
      if (editingUser) {
        this.user = editingUser;
        this.isEditing = true;
       this.isEditMode =true ;
      } else {
        this.resetForm();
        this.isEditing = false;
       this.isEditMode = false;
      }
      
    });
  }
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.resetForm();
    this.isOpen = false;
    this.isEditMode = false;
  }
  onSubmit() {
    if (this.isEditing) {
      this.userService.updateUser(this.user.id, this.user).subscribe(updatedUser => {
        // Update the user in the table
        const index = this.userService.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.userService.users[index] = updatedUser;
        }

        this.resetForm();
        this.isEditing = false;
      }, error => {
        console.error('Error updating user:', error);
      });
    } else {
      this.userService.createUser(this.user).subscribe(createdUser => {
        // Add the new user to the table
        this.userService.users.push(createdUser);

        this.resetForm();
        this.userService.getAllUsers();
      }, error => {
        console.error('Error creating user:', error);
      });
    }
    this.closeModal();

  }

  resetForm() {
    this.user = {};
    this.userService.setEditingUser(null);
  }
}

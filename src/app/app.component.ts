// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';

export interface IUser {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  city: string;
  hobbies: string[];
  address: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public usersStream$: Observable<IUser[]>;

  public myForm: FormGroup;

  public operationType: 'Create' | 'Update' = 'Create';

  public searchText = new FormControl('');

  private allUsers = [{
    name: 'Arpit',
    email: 'abc@gmail.com',
    mobile: '1234567890',
    gender: 'M',
    city: 'Indore',
    hobbies: ['game'],
    address: 'Indore'
  },
  {
    name: 'Mustafa',
    email: 'abc@gmail.com',
    mobile: '1234567890',
    gender: 'M',
    city: 'Indore',
    hobbies: ['game'],
    address: 'Indore'
  }];

  constructor(
    private fb: FormBuilder,
    private _userService: UserService
  ) {
    this.myForm = this.createUserForm();
  }

  ngOnInit() {
    this.usersStream$ = Observable.of(this.allUsers);

    this.searchText.valueChanges.subscribe(value => {
      const filteredUsers = this.allUsers.filter((user) => user.name.toLowerCase().includes(value));
      this.usersStream$ = Observable.of(filteredUsers);
    });
  }

  private createUserForm() {
    return this.fb.group({
      name: ['', Validators.required],
      email: '',
      mobile: '',
      gender: '',
      city: '',
      hobbies: '',
      address: '',
    });
  }

  public onSubmit(data) {
    console.log('the form data is :', data);
    this._userService.createUser(data.value).subscribe((res) => {
      console.log('the response is :', res);
    });
  }

  public onUpdateUser(user) {
    this.operationType = 'Update';
    this.myForm = this.fb.group(user);
    console.log('the user is :', user);
  }

  public onDeleteUser(user) {
    console.log('the user is :', user);
  }
}

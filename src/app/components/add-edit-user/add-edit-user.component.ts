import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Role} from "../../models/user.model";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent implements OnInit {

  public form: FormGroup;
  public roles$!: Observable<Role[]>;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.roles$ = this.appService.getRoles();

    this.form = this.fb.group({
      id: [null, [Validators.required]],
      fullName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.appService.getUserById(this.route.snapshot.params['id']).subscribe( res => {
        this.form.patchValue(res);
        this.form.controls['id'].disable()
      });
    }
  }

  edit(): void {
    this.form.value.id = this.route.snapshot.params['id'].toString()

    this.appService.editUser(this.form.value).subscribe(res => {
      this.toastr.success('Zedytowano użytkownika')
      this.router.navigate(['/users'])
    }, error => {
      this.toastr.error('Coś poszło nie tak')
    })
  }

  save(): void {
    this.form.patchValue({id: this.form.value.id.toString()})

    this.appService.createUser(this.form.value).subscribe( res => {
      this.toastr.success('Dodano użytkownika')
      this.router.navigate(['/users'])
    }, error => {
      this.toastr.error('Coś poszło nie tak')
    })
  }

}

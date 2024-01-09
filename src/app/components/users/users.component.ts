import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../services/app.service";
import {Role, User} from "../../models/user.model";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatPaginatorModule],
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  public users!: User[];
  public dataSource!: MatTableDataSource<User>;
  public roles$!: Observable<Role[]>;
  public displayedColumns: string[] = ['lp', 'id', 'fullName', 'role', 'status', 'actions'];
  public searchControl = new FormControl('');
  public role = new FormControl('');


  constructor(
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.roles$ = this.appService.getRoles();
  }

  getUsers(): void {
    this.appService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit-user/' + id])
  }

  deleteUser(id: number): void {
    this.appService.deleteUser(id).subscribe(res => {
      this.toastr.success('Usunięto użytkownika');
      this.getUsers();
    }, error => {
      this.toastr.error('Coś poszło nie tak')
    })
  }

  search(): void {
    if (typeof this.searchControl.value === "string") {
      this.dataSource.filter = this.searchControl.value
    }
  }
}

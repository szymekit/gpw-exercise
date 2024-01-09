import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {HeaderComponent} from "./header/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent
  ],
  exports: [
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule
  ]
})
export class LayoutModule { }

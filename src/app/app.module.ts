import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserAddEditComponent } from './components/user/user-add-edit/user-add-edit.component';
import { PermissionComponent } from './components/permission/permission.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataStorageService } from './services/data-storage.service';
import { DataService } from './services/data.service';
import { OrderByPipe } from './pipes/order-by.pipe'


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    UserAddEditComponent,
    PermissionComponent,
    OrderByPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DataStorageService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

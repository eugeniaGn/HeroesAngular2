import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {HttpClientModule} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { EditarComponent } from './pages/editar/editar.component';
import { MessagesModule } from 'primeng/messages';
import { AsignarPermisosComponent } from './pages/asignarPermisos/asignarPermisos.component';
import {PickListModule} from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { EditarPermisoComponent } from './pages/editar-permiso/editar-permiso.component';
import { AgregarPermisoComponent } from './pages/agregar-permiso/agregar-permiso.component';
// import { CdkDragDrop } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    EditarComponent,
    AsignarPermisosComponent,
    PermisosComponent,
    EditarPermisoComponent,
    AgregarPermisoComponent
  ],
  imports: [
    CalendarModule,
    DialogModule,
    TableModule,
    InputTextModule,
    RatingModule,
    ToolbarModule,
    FileUploadModule,
    DynamicDialogModule,
    ToastModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    MessagesModule,
    MessagesModule,
    PickListModule,
    DragDropModule,
    // CdkDragDrop,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [MessageService]
})
export class AuthModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicioService } from 'src/app/provider/servicio.service';
import { EditarPermisoComponent } from '../editar-permiso/editar-permiso.component';
import { AgregarPermisoComponent } from '../agregar-permiso/agregar-permiso.component';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
  providers: [ MessageService, DialogService]
})
export class PermisosComponent implements OnInit {

  display: boolean = false;
  display2: boolean = false;
  eliminarId: any = 0;

  productNames2: any[] = [];

  permisosSeleccionados: any = [];
  loading = false;
  Total = 0;

  ref: DynamicDialogRef | undefined;

  Formulario: FormGroup  = this.fb.group({
    nombre: ['', Validators.required],
    calve: ['', Validators.required],
    accion: ['', Validators.required]
  });

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public service: ServicioService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
  }

  showDialog(idHeroe: any) {
    this.display = true;
    this.eliminarId = idHeroe;
}

showDialog2() {
  this.display2 = true;
}

buscarPermisos(event: LazyLoadEvent){
  this.loading = true;
  this.service.postHeroes('buscarPermisos', event).subscribe((data: any) => {
    this.productNames2 = data.data;
    this.Total = data.count;
    this.loading = false;
    if(data){
    }
    else {
      console.log("Error");
    }
  });
}

editarPermiso(permiso: any){
  this.ref = this.dialogService.open(EditarPermisoComponent, {
    header: 'Editar permiso',
    data: permiso
  });
  this.ref.onClose.subscribe((dataReturn: any) => {
  });
}

eliminarPermiso(eliminar: boolean){

  if(eliminar == true){
      this.service.deleteHeroes('deletePermiso', this.eliminarId).subscribe((data: any) => {
        this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Eliminado correctamente', life: 3000 });
        this.eliminarId = 0;
        window.location.reload();
      });
    }

    this.display = false;
  }

  eliminarSeleccion(eliminar: boolean){
    if (eliminar == true){
      this.permisosSeleccionados.forEach((heroe: any) => {
        this.service.deleteHeroes('deletePermiso', heroe.id).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Eliminado correctamente', life: 3000 });
          window.location.reload();
        });
      });
    }

    this.display2 = false;
  }

  showComponent(){
    this.ref = this.dialogService.open(AgregarPermisoComponent, {
      header: 'Agregar permiso',
      data: { sendData: "Hola mundo"}
    });
    this.ref.onClose.subscribe((dataReturn: any) => {
    });
  }

  filterSearch(event: any){
    return event.target.value;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-agregar-permiso',
  templateUrl: './agregar-permiso.component.html',
  styleUrls: ['./agregar-permiso.component.scss']
})
export class AgregarPermisoComponent implements OnInit {
  submitted = false;

  Formulario: FormGroup  = this.fb.group({
    nombre: ['', Validators.required],
    clave: ['', Validators.required],
    accion: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: ServicioService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  agregarPermiso(){
    this.service.postHeroes('insertPermiso', this.Formulario.value).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Agregado correctamente', life: 3000 });
      window.location.reload();
    });
    this.hideDialog();
  }

  hideDialog(){
    this.ref.close();
    this.submitted = false;
  }

}

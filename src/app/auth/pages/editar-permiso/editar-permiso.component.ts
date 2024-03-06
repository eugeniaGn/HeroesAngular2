import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss']
})
export class EditarPermisoComponent implements OnInit {
  submitted = false;

  Formulario: FormGroup  = this.fb.group({
    id: ['', Validators.required],
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
    this.Formulario.patchValue({
      id: this.config.data.id,
      nombre: this.config.data.nombre,
      clave: this.config.data.clave,
      accion: this.config.data.accion,
    });
  }

  hideDialog(){
    this.ref.close();
    this.submitted = false;
  }

  editarPermiso(){
    this.service.putHeroes('updatePermiso', this.Formulario.value, this.Formulario.controls['id'].value).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Editado correctamente', life: 3000 });
      this.ref.close();
      window.location.reload();
    });
  }

}

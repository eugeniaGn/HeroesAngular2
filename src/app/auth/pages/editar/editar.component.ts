import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  submitted = false;

  categorias = ['DC Comics', 'Marvel Comics', 'TMNT'];

  Formulario: FormGroup  = this.fb.group({
    id: ['', Validators.required],
    nombre: ['', Validators.required],
    genero: ['', Validators.required],
    descripcion: ['', Validators.required],
    url: ['', Validators.required],
    categoria: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: ServicioService,
    public messageService: MessageService
    ) {
    }

  ngOnInit(): void {
    this.Formulario.patchValue({
      id: this.config.data.id,
      nombre: this.config.data.nombre,
      genero: this.config.data.genero,
      descripcion: this.config.data.descripcion,
      url: this.config.data.url,
      categoria: this.config.data.categoria
    });

  }

  hideDialog(){
    this.ref.close();
    this.submitted = false;
  }

  editarHeroe(){
    let params = {
      id: this.Formulario.controls['id'].value,
      nombre: this.Formulario.controls['nombre'].value,
      genero: this.Formulario.controls['genero'].value,
      descripcion: this.Formulario.controls['descripcion'].value,
      url: this.Formulario.controls['url'].value,
      categoria: this.Formulario.controls['categoria'].value,
    }

    this.service.putHeroes('EditarHeroe', params, this.Formulario.controls['id'].value).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Editado correctamente', life: 3000 });
      this.ref.close();
      window.location.reload();
    });
  }

}

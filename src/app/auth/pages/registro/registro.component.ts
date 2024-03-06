import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
  submitted = false;
  products = [];
  categorias = [
    { name: 'DC Comics'},
    { name: 'Marvel Comics'},
    { name: 'TMNT'},
  ];
  generoSeleccionado: any;

  Formulario: FormGroup  = this.fb.group({
    nombre: ['', Validators.required],
    genero: ['', Validators.required],
    descripcion: ['', Validators.required],
    url: ['', Validators.required],
    categoria: ['', Validators.required],
  });

  // @Inject(DIALOG_DATA) public dataReceived: any
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: ServicioService,
    public messageService: MessageService
    ) {
      console.log(this.config.data);
    }

  ngOnInit(): void {
  }

  agregarHeroe(){
    let params = {
      nombre: this.Formulario.controls['nombre'].value,
      genero: this.Formulario.controls['genero'].value,
      descripcion: this.Formulario.controls['descripcion'].value,
      url: this.Formulario.controls['url'].value,
      categoria: this.Formulario.controls['categoria'].value.name
    };

    this.service.postHeroes('AgregarHeroe', params).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Agregado correctamente', life: 3000 });
      window.location.reload();
    });
    this.hideDialog();
  }

  hideDialog(){
    this.ref.close();
    this.submitted = false;
  }

  saveProduct(){
    const data = { message: 'Información devuelta desde el hijo.'};
    this.ref.close(data);
    this.submitted = true;
    this.products = this.products;
    this.submitted = false;
  }

}

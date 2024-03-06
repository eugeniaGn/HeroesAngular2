
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../provider/servicio.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LazyLoadEvent, MessageService, Message, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistroComponent } from '../registro/registro.component';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ MessageService, DialogService]
})

export class LoginComponent implements OnInit {
  // status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];


    productNames2: any[] = [];

    display: boolean = false;
    display2: boolean = false;
    eliminarId: any = 0;
    mensajeAccion: boolean = false;

    msgs1: any = [
      {severity:'success', summary:'Se realizó con éxito'},
  ];;

  product: any;
  selectedProducts: any = [];
  submitted2: boolean = false;
  loading = false;
  Total = 0;

  ref: DynamicDialogRef | undefined;


  Formulario: FormGroup  = this.fb.group({
    nombre: ['', Validators.required],
    genero: ['', Validators.required],
    descripcion: ['', Validators.required],
    url: ['', Validators.required],
    categoria: ['', Validators.required],
  });

  submitted = false;
  modelo = 'login';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public service: ServicioService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.CrearFormulario();
  }

  ngOnInit() {
  }

  showDialog(idHeroe: any) {
    this.display = true;
    this.eliminarId = idHeroe;
}

  showDialog2() {
    this.display2 = true;
}

  heroes(event: LazyLoadEvent){
    this.loading = true;
    this.service.postHeroes('heroes', event).subscribe((data: any) => {
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

  editarHeroe(heroe: any){
    this.ref = this.dialogService.open(EditarComponent, {
      header: 'Editar Heroe',
      data: heroe
    });
    this.ref.onClose.subscribe((dataReturn: any) => {
    });
  }


  eliminarHeroe(eliminar: boolean){

    if(eliminar == true){
        this.service.deleteHeroes('EliminarHeroe', this.eliminarId).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Eliminado correctamente', life: 3000 });
          this.eliminarId = 0;
          window.location.reload();
        });
      }

      this.display = false;
    }


    eliminarSeleccion(eliminar: boolean){
      if (eliminar == true){
        this.selectedProducts.forEach((heroe: any) => {
          this.service.deleteHeroes('EliminarHeroe', heroe.id).subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Eliminado correctamente', life: 3000 });
            window.location.reload();
          });
        });
      }

      this.display2 = false;
    }


  showComponent(){
    this.ref = this.dialogService.open(RegistroComponent, {
      header: 'Registro Heroe',
      data: { sendData: "Hola mundo"}
    });
    this.ref.onClose.subscribe((dataReturn: any) => {
    });
  }

  onLoggedin() {
    this.submitted = true;
    if (this.Formulario.invalid) {
      return;
    }
    this.service.BD_Service_Post(this.modelo, this.Formulario.value, 'login').subscribe((data: any) => {
      if (data) {
        console.log('Loggeado');
        this.router.navigate(['/principal']);
      } else {
        console.log('Error');
      }
    });

  }

  CrearFormulario() {
    this.Formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  filterSearch(event: any){
    return event.target.value;
  }





  getProductsSmall() {
    // return this.http.get<any>('assets/products-small.json')
    // .toPromise()
    // .then(res => <Product[]>res.data)
    // .then(data => { return data; });
}

getProducts() {
    // return this.http.get<any>('assets/products.json')
    // .toPromise()
    // .then(res => <Product[]>res.data)
    // .then(data => { return data; });
}

getProductsWithOrdersSmall() {
    // return this.http.get<any>('assets/products-orders-small.json')
    // .toPromise()
    // .then(res => <Product[]>res.data)
    // .then(data => { return data; });
}

generatePrduct() {
//     const product: Product =  {
//         id: this.generateId(),
//         name: this.generateName(),
//         description: "Product Description",
//         price: this.generatePrice(),
//         quantity: this.generateQuantity(),
//         category: "Product Category",
//         inventoryStatus: this.generateStatus(),
//         rating: this.generateRating()
//     };

//     product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
//     return product;
}

generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// generateName() {
//     return this.productNames[Math.floor(Math.random() * Math.floor(30))];
// }

generatePrice() {
    return Math.floor(Math.random() * Math.floor(299)+1);
}

generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75)+1);
}

// generateStatus() {
//     return this.status[Math.floor(Math.random() * Math.floor(3))];
// }

generateRating() {
    return Math.floor(Math.random() * Math.floor(5)+1);
}

}

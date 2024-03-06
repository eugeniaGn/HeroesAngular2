import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './asignarPermisos.component.html',
  styleUrls: ['./asignarPermisos.component.scss']
})
export class AsignarPermisosComponent implements OnInit {
  permisosDisponibles: any = [];
  permisosAsignados: any = [];

  usuarios: any = [];
  usuarioSeleccionado: any =[];

  constructor(
    private primengConfig: PrimeNGConfig,
    public service: ServicioService,
    ) {
    }

    ngOnInit(): void {
      this.traerUsuarios();
    }

    traerUsuarios(){
      this.service.gett('getUsuarios').subscribe((data: any) => {

        if(data){
          this.usuarios = data;
        }
        else {
          console.log("Error");
        }
    });
  }

  traerPermisosDisponibles(id: any){
    this.service.getHeroesId('permisosDisponiblesUser', id).subscribe((data: any) => {
      if(data){
        this.permisosDisponibles = data;
        console.log(this.permisosDisponibles);
      }
      else {
        console.log("Error");
      }
    });
  }

  traerPermisosAsignados(id: any){
    this.service.getHeroesId('permisosAsignadosUser', id).subscribe((data: any) => {

      if(data){
        this.permisosAsignados = data;
        console.log(this.permisosAsignados);
      }
      else {
        console.log("Error");
      }
    });
  }

  asignarPermisos(){
    this.service.postHeroes('asignarPermiso', this.permisosAsignados).subscribe((data: any) => {
    });
  }

  quitarPermisos(){
    this.service.postHeroes('quitarPermiso', this.permisosDisponibles).subscribe((data: any) => {
    });
  }

  seleccionarUsuario(event: any) {
    this.traerPermisosDisponibles(this.usuarioSeleccionado.id);
    this.traerPermisosAsignados(this.usuarioSeleccionado.id);
    console.log('Disponibles: ', this.permisosDisponibles);
    console.log('Asignados: ', this.permisosAsignados);
  }

  guardarSeleccion(): void {
    console.log('Disponibles: ', this.permisosDisponibles);
    console.log('Asignados: ', this.permisosAsignados);
    this.asignarPermisos();
    this.quitarPermisos();

  }

}

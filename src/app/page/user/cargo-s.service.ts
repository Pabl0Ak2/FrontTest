import { Injectable } from '@angular/core';
import { Empleado } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class CargoSService {
  listaEmpleados: Empleado[] = [
    {
      nombreCompleto: 'Juan Pérez',
      fechaNacimiento: '1990-05-15',
      edad: 32,
      estatus: 'Activo',
      tipoCargo: 'Gerente',
      editando: false
    },
    {
      nombreCompleto: 'María López',
      fechaNacimiento: '1985-12-10',
      edad: 36,
      estatus: 'Activo',
      tipoCargo: 'Coordinador',
      editando: false
    },
    {
      nombreCompleto: 'Pedro Gómez',
      fechaNacimiento: '1995-07-20',
      edad: 26,
      estatus: 'Activo',
      tipoCargo: 'Subdirector',
      editando: false
    },
    {
      nombreCompleto: 'María López',
      fechaNacimiento: '1985-12-10',
      edad: 36,
      estatus: 'Activo',
      tipoCargo: 'Coordinador',
      editando: false
    },
    {
      nombreCompleto: 'Pedro Gómez',
      fechaNacimiento: '1995-07-20',
      edad: 26,
      estatus: 'Activo',
      tipoCargo: 'Subdirector',
      editando: false
    },
    {
      nombreCompleto: 'María López',
      fechaNacimiento: '1985-12-10',
      edad: 36,
      estatus: 'Activo',
      tipoCargo: 'Coordinador',
      editando: false
    },
    {
      nombreCompleto: 'Pedro Gómez',
      fechaNacimiento: '1995-07-20',
      edad: 26,
      estatus: 'Activo',
      tipoCargo: 'Subdirector',
      editando: false
    }
  ];

  constructor() { }

  cambiarEstatus(empleado: Empleado): void {
    if (empleado.estatus === 'Inactivo') {
      empleado.estatus = 'Activo';
    } else {
      empleado.estatus = 'Inactivo';
    }
  }

  editarEmpleado(empleado: Empleado): void {
    if (empleado.estatus === 'Inactivo') {
      empleado.editando = true;
    } else {
      empleado.editando = false;
    }
  }

  eliminarEmpleado(empleado: Empleado) {
    const emp = this.listaEmpleados.indexOf(empleado);
    if (emp !== -1) {
      this.listaEmpleados.splice(emp, 1);
    }  
  }
}

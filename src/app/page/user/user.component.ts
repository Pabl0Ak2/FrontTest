import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from './user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  empleadoForm!: FormGroup;
  currentPage = 1;
  pageSize = 10;
  searchTerm: string = '';
  filteredEmpleados: Empleado[] = [];
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

  constructor(private fb: FormBuilder) {
    this.filteredEmpleados = this.listaEmpleados;
   }

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      estatus: ['Activo'],
      tipoCargo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const empleado: Empleado = this.empleadoForm.value;
      this.listaEmpleados.push(empleado);
      console.log(empleado);
      console.log(this.listaEmpleados);
      this.empleadoForm.reset();
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

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

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todos los empleados
      this.filteredEmpleados = this.listaEmpleados;
    } else {
      // Filtrar empleados por término de búsqueda
      this.filteredEmpleados = this.listaEmpleados.filter(empleado =>
        empleado.nombreCompleto.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        // Puedes agregar más condiciones de búsqueda si es necesario
      );
    }
    // Volver a la primera página después de realizar una búsqueda
    this.currentPage = 1;
  }

  get paginatedEmpleados(): Empleado[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredEmpleados.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmpleados.length / this.pageSize);
  }

}

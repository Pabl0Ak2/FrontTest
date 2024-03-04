import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from './user.model';
import { CommonModule } from '@angular/common';
import { CargoSService } from './cargo-s.service';

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

  constructor(private fb: FormBuilder, private cargos: CargoSService) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      estatus: ['Activo'],
      tipoCargo: ['', Validators.required]
    });

    this.filteredEmpleados = this.cargos.listaEmpleados;
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const empleado: Empleado = this.empleadoForm.value;
      this.cargos.listaEmpleados.push(empleado);
      this.empleadoForm.reset();
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  cambiarEstatus(empleado: Empleado): void {
    this.cargos.cambiarEstatus(empleado);
  }

  editarEmpleado(empleado: Empleado): void {
    this.cargos.editarEmpleado(empleado);
  }

  eliminarEmpleado(empleado: Empleado) {
    this.cargos.eliminarEmpleado(empleado);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // si no busco nada no muestra bada
      this.filteredEmpleados = this.cargos.listaEmpleados;
    } else {
      // aqui busco los empleados 
      this.filteredEmpleados = this.cargos.listaEmpleados.filter(empleado =>
        empleado.nombreCompleto.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    // me rgresa a la pag despues de hacer la busqueda
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

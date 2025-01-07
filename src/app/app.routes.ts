import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListaComponent } from './customers/clientes-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { LoginComponent } from './login/login.component'; // Importa LoginComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'clientes', component: ClientesListaComponent },
  { path: 'crear-cliente', component: ClienteFormComponent },
  { path: 'editar-cliente/:id', component: ClienteFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
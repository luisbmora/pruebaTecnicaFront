import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideForms(),
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule
    )
  ],
  standaloneComponents: [CustomerFormComponent] // Registrar el componente aquí
};

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importe ReactiveFormsModule aqui
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';

// Importações do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // Adicione ReactiveFormsModule aos imports
    MatFormFieldModule, // Adicione MatFormFieldModule aos imports
    MatInputModule, // Adicione MatInputModule aos imports
    MatSelectModule, // Adicione MatSelectModule aos imports
    MatButtonModule // Adicione MatButtonModule aos imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

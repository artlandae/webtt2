import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { VentanaModalComponent } from './app/ventana-modal/ventana-modal.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

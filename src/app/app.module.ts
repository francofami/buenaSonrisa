import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule} from '@angular/fire/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';

import { JwtModule } from "@auth0/angular-jwt";

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatExpansionModule} from '@angular/material/expansion';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { RecaptchaModule } from 'ng-recaptcha';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { CalendarioComponent } from './calendario/calendario.component';
import { PedirTurnoComponent } from './tareasCliente/pedir-turno/pedir-turno.component';
import { VerTurnosComponent } from './tareasCliente/ver-turnos/ver-turnos.component';
import { RealizarEncuestaComponent } from './tareasCliente/realizar-encuesta/realizar-encuesta.component';
import { VerResenasComponent } from './tareasCliente/ver-resenas/ver-resenas.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { FechaPipe } from './pipes/fecha.pipe';
import { PedirTurnoRecepComponent } from './tareasRecepcionista/pedir-turno-recep/pedir-turno-recep.component';
import { CancelarTurnoComponent } from './tareasRecepcionista/cancelar-turno/cancelar-turno.component';
import { VerConsultorioOcupadoComponent } from './tareasRecepcionista/ver-consultorio-ocupado/ver-consultorio-ocupado.component';
import { VerConsultorioProximoAOcuparComponent } from './tareasRecepcionista/ver-consultorio-proximo-aocupar/ver-consultorio-proximo-aocupar.component';
import { VerTurnosEspecialistaComponent } from './tareasEspecialista/ver-turnos-especialista/ver-turnos-especialista.component';
import { DialogoEspecialistaComponent } from './tareasEspecialista/dialogo-especialista/dialogo-especialista.component';
import { AltasComponent } from './tareasAdmin/altas/altas.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { EstadisticasComponent } from './tareasAdmin/estadisticas/estadisticas.component';

import { GoogleChartsModule } from 'angular-google-charts';

import { NgxSpinnerModule } from "ngx-spinner";
import { MuchoPocoPipe } from './pipes/mucho-poco.pipe';
import { PreCancelarComponent } from './tareasRecepcionista/pre-cancelar/pre-cancelar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    SafeHtmlPipe,
    CalendarioComponent,
    PedirTurnoComponent,
    VerTurnosComponent,
    RealizarEncuestaComponent,
    VerResenasComponent,
    FechaPipe,
    PedirTurnoRecepComponent,
    CancelarTurnoComponent,
    VerConsultorioOcupadoComponent,
    VerConsultorioProximoAOcuparComponent,
    VerTurnosEspecialistaComponent,
    DialogoEspecialistaComponent,
    AltasComponent,
    CaptchaComponent,
    EstadisticasComponent,
    MuchoPocoPipe,
    PreCancelarComponent,
    
  ],
  entryComponents: [DialogoEspecialistaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,

    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatSliderModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableExporterModule,
    MatExpansionModule,

    GoogleChartsModule.forRoot(),

    JwtModule,

    RecaptchaModule,

    FullCalendarModule,

    ReactiveFormsModule,

    NgxSpinnerModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }

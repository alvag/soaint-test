import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from './components/data-table/data-table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { InterceptorService } from './services/interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalsModule } from './components/modals/modals.module';

@NgModule( {
    declarations: [
        AppComponent,
        DataTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ModalsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,

    ],
    providers: [
        DataService,
        {
            provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
        }
    ],
    bootstrap: [AppComponent]
} )
export class AppModule {}

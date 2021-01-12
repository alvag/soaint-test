import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule( {
    declarations: [ConfirmModalComponent, ItemModalComponent],
    entryComponents: [ConfirmModalComponent, ItemModalComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ]
} )
export class ModalsModule {}

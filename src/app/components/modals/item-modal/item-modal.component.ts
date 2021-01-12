import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemInterface } from '../../../interfaces/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
    selector: 'app-item-modal',
    templateUrl: './item-modal.component.html',
    styleUrls: ['./item-modal.component.scss']
} )
export class ItemModalComponent implements OnInit {

    form: FormGroup;

    constructor( public dialogRef: MatDialogRef<ItemModalComponent>,
                 @Inject( MAT_DIALOG_DATA ) public item: ItemInterface,
                 private fb: FormBuilder ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group( {
            id: this.item?.id,
            _about: [this.item?._about, Validators.required],
            accessURL: [this.item?.accessURL, Validators.required],
            title: [this.item?.title, Validators.required],
        } );
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        this.form.markAllAsTouched();

        if ( this.form.valid ) {
            this.dialogRef.close( { ...this.form.value } );
        }
    }

}

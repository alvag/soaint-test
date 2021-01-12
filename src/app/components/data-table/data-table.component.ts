import { Component, OnInit } from '@angular/core';
import { ItemInterface } from '../../interfaces/item.interface';
import { DataService } from '../../services/data.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ItemModalComponent } from '../modals/item-modal/item-modal.component';

@Component( {
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
} )
export class DataTableComponent implements OnInit {

    items: ItemInterface[] = [];
    page = 1;
    perPage = 5;
    total: number;
    columns = ['_about', 'accessURL', 'title', 'actions'];

    constructor( private dataService: DataService,
                 private dialog: MatDialog ) { }

    ngOnInit(): void {
        this.getData();
    }

    async getData() {
        this.items = await this.dataService.fetchData();
        console.log( this.items );
        this.total = this.items.length;
    }

    sliceArray(): ItemInterface[] {
        return this.items.slice( ( this.page - 1 ) * this.perPage, ( this.page - 1 ) * this.perPage + this.perPage );
    }

    pageEvt( event: PageEvent ) {
        this.page = event.pageIndex + 1;
        this.perPage = event.pageSize;
    }

    delete( id: number ) {
        const ref = this.dialog.open( ConfirmModalComponent, {
            data: {
                title: 'Eliminar item',
                content: 'Seguro que desea eliminar el item?'
            },
            disableClose: true
        } );

        ref.afterClosed().subscribe( result => {
            if ( result ) {
                this.items = this.items.filter( ( x: ItemInterface ) => x.id !== id );
            }
        } );
    }

    itemModal( item?: ItemInterface ) {
        const ref = this.dialog.open( ItemModalComponent, {
            data: item,
            disableClose: true,
            width: '500px'
        } );

        ref.afterClosed().subscribe( result => {
            if ( result ) {
                if ( result.id !== null ) {
                    const i = this.items.findIndex( x => x.id === result.id );
                    this.items[ i ] = { ...result };
                } else {
                    this.items.unshift( { ...result, id: this.items.length } );
                }
            }

        } );
    }


}

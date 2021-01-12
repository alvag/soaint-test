import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable( {
    providedIn: 'root'
} )
export class DataService {

    private url = 'https://datos.gob.es/apidata/catalog/distribution';

    constructor( private http: HttpClient ) { }

    fetchData(): Promise<ItemInterface[]> {
        return new Promise<ItemInterface[]>( ( resolve, reject ) => {
            return this.http.get( this.url ).subscribe( ( res: any ) => {
                const items = res?.result?.items || [];
                items.map( ( x, i ) => {
                    if ( x.title instanceof Array ) {
                        items[ i ] = { ...x, title: x.title[ 0 ]._value, id: i };
                    } else {
                        items[ i ] = { ...x, title: x.title._value, id: i };
                    }
                } );
                resolve( items );
            } );
        } );

    }
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable( {
    providedIn: 'root'
} )
export class InterceptorService implements HttpInterceptor {

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const request = req.clone( {
            setHeaders: {
                Accept: 'application/json'
            }
        } );

        return next.handle( request ).pipe(
            catchError( ( err: HttpErrorResponse ) => {
                console.log( 'InterceptorService:', err );
                const error = err.error?.message || err.message || err;
                return throwError( error );
            } )
        );
    }
}

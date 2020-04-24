import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError(error.error);
                    }
                    const applicationerror = error.headers.get('Application-Error');
                    if (applicationerror) {
                        return throwError(applicationerror);
                    }
                    const ServerError = error.error;
                    let modelStateErrors = '';
                    if (ServerError && typeof ServerError === 'object') {
                        for (const key in ServerError) {
                            if (ServerError[key]) {
                                modelStateErrors += ServerError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateErrors || ServerError || 'Server error');
                }
            })
        );
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, catchError } from "rxjs";
import { finalize, map } from "rxjs/operators";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private spinnerService:NgxSpinnerService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.spinnerService.show();
        return next.handle(request)
        .pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
        })
        ,finalize(() => {
            this.spinnerService.hide();
        }));
    }
    
}
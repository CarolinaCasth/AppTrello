import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


const API_KEY = 'e1ede6f46fe16c667476d3ce5efe5933';
const API_TOKEN = 'ATTA10dd06edbe723a1a05901e7cacdde3cdbf43caa268466214b77a4959aabd5fddF498717B';

@Injectable({providedIn: 'root'})
export class TokenInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders : {
                Accept: 'application/json',
                'Authorization': 'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="'+ API_TOKEN +'"'
            }
        });

        return next.handle(req);
    }
}
import { Injectable } from "@angular/core";
import {  HttpClient, HttpHeaders } from '@angular/common/http';


import { environment} from './../../environments/environment'

@Injectable({
    providedIn:'root'
})

export class BookingService {

    constructor(
        private http:HttpClient
    ){}

    postingSeats(movie,arr:number[]){
        return this.http.post<{movie:{seats,_id}}>(environment.server_url+'fetchBookings/'+movie,{
            arr
        })
    }

    gettingSeats(movie:string){
        return this.http.get<{movie:{seats,_id}}>(environment.server_url+'fetchBookings/'+movie)
    }

}
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstRow=[]
  secondRow=[]
  thirdRow=[]
  fourthRow=[]
  fifthRow=[]
  sixthRow=[]
  seventhRow=[]
  eighthRow=[]
  ninethRow=[]
  tenthRow=[]

  bookedSeats=[]
  restrictedSeats=[]

  movieName ;

  helperBook = true
  constructor(
    private bookingService:BookingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    for(let i=1;i<=100;i++){
      if(i <= 10){
        this.firstRow.push(i);
      }else if(i <= 20){
        this.secondRow.push(i) 
      }else if(i <= 30){
        this.thirdRow.push(i) 
      }else if(i <= 40){
        this.fourthRow.push(i) 
      }else if(i <= 50){
        this.fifthRow.push(i) 
      }else if(i <= 60){
        this.sixthRow.push(i) 
      }else if(i <= 70){
        this.seventhRow.push(i) 
      }else if(i <= 80){
        this.eighthRow.push(i) 
      }else if(i <= 90){
        this.ninethRow.push(i) 
      }else if(i <= 100){
        this.tenthRow.push(i) 
      }
    }
  }
  getMovieDetails(name:string){
    this.helperBook =true
    this.movieName = name
    
    this.bookingService.gettingSeats(this.movieName).subscribe(res=>{
      this.movieName = name
      this.bookedSeats = []
      this.restrictedSeats = []
      if(!res.movie.seats){
        return;
      }
      res.movie.seats.forEach(ele=>this.bookSeat(ele))
    })
  }

  bookSeat(seatNumber:number){
    if(!this.bookedSeats.includes(seatNumber) && !this.restrictedSeats.includes(seatNumber)){
      this.bookedSeats.push(seatNumber)
      if(seatNumber%10===1){
      this.pushTo(seatNumber+1,)
      this.pushTo(seatNumber+10)
      this.pushTo(seatNumber-10)
      }else if(seatNumber%10===0){
        this.pushTo(seatNumber+10)
        this.pushTo(seatNumber-10)
        this.pushTo(seatNumber-1)
      }else{
        this.pushTo(seatNumber+1)
        this.pushTo(seatNumber-1)
        this.pushTo(seatNumber+10)
        this.pushTo(seatNumber-10)
      }
    }
  }

  pushTo(number:number){
    if(number>0&&number<101){
      this.restrictedSeats.push(number)
    }
  }

  confirmBooking(){
    if(!this.movieName){
      this.snackBar.open('Please select your favorite movie...', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
    this.bookingService.postingSeats(this.movieName,this.bookedSeats)
    .subscribe(res=>{
      this.helperBook = false
      this.movieName = name
      this.bookedSeats = []
      this.restrictedSeats = []
      if(!res.movie.seats){
        return;
      }
      res.movie.seats.forEach(ele=>this.bookSeat(ele))
    })
  }
}

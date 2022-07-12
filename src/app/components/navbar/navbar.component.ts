import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  username="";

  constructor( private tokenServ: TokenService, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    if (this.tokenServ.getToken()){
      this.isLogged=true;
      this.username= this.tokenServ.getUsername();
    }else{
      this.isLogged=false;
      this.username="";
    }
  }

  onLogOut(): void{
    this.tokenServ.logOut();
    window.location.reload();
  }


  public onClick(elementId: string): void { 
    
    
    this.viewportScroller.scrollToAnchor(elementId);

}


}


/*
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-75px";
  }
  prevScrollpos = currentScrollPos;

}
  */

/*
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
} 
*/
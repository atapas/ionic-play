import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit  {
  
  @ViewChild('zoomDiv', {static: false}) imgElement: ElementRef;
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  slideData: any = [];

  constructor() {
    this.slideData = [
      {
      'image': 'rajni_image.png',
      'name': 'Rajni Sir',
      'joke': "Once spiderman,superman and batman visited rajnikant's house together..it was teachers day!"
      },
      {
        'image': 'chuckn_image.png',
        'name': 'Chuck Norris',
        'joke': "Chuck Norris will never have a heart attack. His heart isn't nearly foolish enough to attack him."
      },
      {
        'image': 'jackiechan.png',
        'name': 'Jackie Chan',
        'joke': "If you watch a movie with Jackie Chan backwards...You will get a documentary about a Chinese guy who assembles furniture with his feet."
      }
    ]
  }

  ngAfterViewInit(): void {
    // let elem =  this.imgElement.nativeElement;
    let elem0 = document.getElementById('0');
    this.panZoomPinch(elem0);

    let elem1 = document.getElementById('1');
    this.panZoomPinch(elem1);

    let elem2 = document.getElementById('2');
    this.panZoomPinch(elem2);
  }

  panZoomPinch(elem) {
    const hammer = new Hammer(elem, {});
   
    hammer.get('pinch').set({ enable: true });

    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = elem;

        hammer.on('doubletap pan pinch panend pinchend', function(ev) {
          if (ev.type == "doubletap") {
              transform =
                  "translate3d(0, 0, 0) " +
                  "scale3d(2, 2, 1) ";
              scale = 2;
              last_scale = 2;
              try {
                  if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                      transform =
                          "translate3d(0, 0, 0) " +
                          "scale3d(1, 1, 1) ";
                      scale = 1;
                      last_scale = 1;
                  }
              } catch (err) {}
              el.style.webkitTransform = transform;
              transform = "";
          }
  
          //pan    
          if (scale != 1) {
              posX = last_posX + ev.deltaX;
              posY = last_posY + ev.deltaY;
              max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
              max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
              if (posX > max_pos_x) {
                  posX = max_pos_x;
              }
              if (posX < -max_pos_x) {
                  posX = -max_pos_x;
              }
              if (posY > max_pos_y) {
                  posY = max_pos_y;
              }
              if (posY < -max_pos_y) {
                  posY = -max_pos_y;
              }
          }
  
  
          //pinch
          if (ev.type == "pinch") {
              scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
          }
          if(ev.type == "pinchend"){last_scale = scale;}
  
          //panend
          if(ev.type == "panend"){
              last_posX = posX < max_pos_x ? posX : max_pos_x;
              last_posY = posY < max_pos_y ? posY : max_pos_y;
          }
  
          if (scale != 1) {
              transform =
                  "translate3d(" + posX + "px," + posY + "px, 0) " +
                  "scale3d(" + scale + ", " + scale + ", 1)";
          }
  
          if (transform) {
              el.style.webkitTransform = transform;
          }
      });
  }
  onSlideDidChange() {
    //let elem =  this.imgElement.nativeElement;
    //let elem = document.getElementById('2');
    //this.panZoomPinch(elem);
  }

  onSlideWillChange() {
    console.log('onSlideWillChange');
    // this.panZoomPinch();
  }

  

}

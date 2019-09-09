import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

}

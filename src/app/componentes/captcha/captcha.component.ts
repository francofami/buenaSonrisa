import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  @Output() respuestaCaptcha = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);

    if (captchaResponse != null) {
      this.respuestaCaptcha.emit(true);
    } else {
      this.respuestaCaptcha.emit(false);
    }
}


}

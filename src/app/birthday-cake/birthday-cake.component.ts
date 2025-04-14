import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-birthday-cake',
  templateUrl: './birthday-cake.component.html',
  imports: [CommonModule],
  styleUrls: ['./birthday-cake.component.css']
})
export class BirthdayCakeComponent implements OnInit {
  flameVisible = true;
  candlePositions = [60, 135, 210]; // You can change these numbers for more candles or different positions

  @ViewChild('birthdayAudio', { static: false }) birthdayAudio!: ElementRef<HTMLAudioElement>;

  ngOnInit() {
    this.listenToMic();
  }

  listenToMic() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new AudioContext();
        const mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.fftSize);

        mic.connect(analyser);

        const checkVolume = () => {
          analyser.getByteTimeDomainData(dataArray);
          const volume = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / dataArray.length;

          if (volume > 8) {
            console.log('Blow detected!');
            this.blowOutCandles();
          } else {
            requestAnimationFrame(checkVolume);
          }
        };

        checkVolume();
      });
  }

  blowOutCandles() {
    this.flameVisible = false;
    gsap.to(".flame", { opacity: 0, duration: 0.5 }); // Hide flames
    setTimeout(() => {
      this.birthdayAudio.nativeElement.play(); // Play birthday song
    }, 600);
  }
}

import { Component } from '@angular/core';
import { FaceService } from './face.service';
import { listenToElementOutputs } from '@angular/core/src/view/element';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'face';
  Path = '../assets/download.png';
  url = "";

  ishidden = false;
  genre = "";
  ag = "";
  emot = "";
  imgNaturalWidth = 0;
  imgNaturalHeight = 0;
  file;
  constructor(private face: FaceService) { }
  btnclick(text1) {
    this.ishidden = true;
    //afficher image
    this.Path = text1;
    console.log(text1);
    //service
    this.face.getData(text1).subscribe((file: any) => {
      console.log(file);
      const donnee: HTMLElement = document.getElementById("rect");
      const image: HTMLElement = document.getElementById('img');
      this.file = file;
      donnee.style.top = (file[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 'px';
      donnee.style.left = (file[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth + 'px';
      donnee.style.width = (file[0].faceRectangle.width * image.clientHeight) / this.imgNaturalHeight + 'px';
      donnee.style.height = (file[0].faceRectangle.height * image.clientWidth) / this.imgNaturalWidth + 'px';
      donnee.style.visibility = 'visible';
      // console.log(file[0].faceRectangle.height);
      // console.log(file[0].faceRectangle.width);
      // console.log(file[0].faceRectangle.top);
      // console.log(file[0].faceRectangle.left);


    })


  }
  hover() {

    const list: HTMLElement = document.getElementById('list');
    const image: HTMLElement = document.getElementById('img');
    this.face.getData(this.Path).subscribe((file: any) => {
      list.style.top = (file[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 20 + 'px';
      list.style.left = (file[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth - 255 + 'px';
      this.genre = file[0].faceAttributes.gender;
      this.ag = file[0].faceAttributes.age;
      if (file[0].faceAttributes.smile > 0) {
        this.emot = "happy";
      }
      else if (file[0].faceAttributes.smile === 0)
        this.emot = "Neutral";
      else this.emot = "sad";
      list.style.visibility = 'visible';

    })
  }
  listBye() {
    const list: HTMLElement = document.getElementById('list');
    list.style.visibility = 'hidden';

  }
  imageLoad(event) {
    // console.log(event);
    // console.log(event.target.naturalWidth);
    // console.log(event.target.naturalHeight);
    this.imgNaturalHeight = event.target.naturalHeight;
    this.imgNaturalWidth = event.target.naturalWidth;
  }
}

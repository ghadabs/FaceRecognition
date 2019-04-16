import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  constructor(private http: HttpClient) { }
  getData(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '13e067a5e4df43a5827b40e7e77c2340'
      })
    };
    const obj = { url };
    console.log(obj);
    return this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise", obj, httpOptions);

  }
}

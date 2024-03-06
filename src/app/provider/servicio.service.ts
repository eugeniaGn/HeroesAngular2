import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public api = '';
  public _url = '/_api.php?opcion=';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  constructor(public http: HttpClient) {
    this.api = 'http://localhost/proyecto/';
  }

  BD_Service_Post(Model: string, Parametros: any, Action: string) {
    // 'http://localhost/proyecto/' + 'login' +  '/_api.php?opcion=' + 'login'
    // this.api + Model + this._url + Action
    return this.http.post(this.api + Model + this._url + Action, Parametros, this.httpOptions);
  }

  BD_Service_Get(Model: string, Action: string) {
    return this.http.get(this.api + Model + this._url + Action);
  }

  getHeroes(Model: string, data: any){
    return this.http.get('http://127.0.0.1:8000/api/' + Model + '?first=1&rows=5', data);
  }




  gett(Model: string){
    return this.http.get('http://127.0.0.1:8000/api/' + Model);
  }

  getHeroesId(Model: string, id: any){
    return this.http.get('http://127.0.0.1:8000/api/' + Model + '/' + id);
  }

  postHeroes(Model: string, data: any){
    return this.http.post('http://127.0.0.1:8000/api/' + Model, data);
  }

  postHeroesUrl(Model: string, data: any, id: any){
    return this.http.post('http://127.0.0.1:8000/api/' + Model + '/' + id, data);
  }

  putHeroes(Model: string, data: any, id: any){
    return this.http.put('http://127.0.0.1:8000/api/' + Model + '/' + id, data);
  }

  deleteHeroes(Model: string, id: any){
    return this.http.delete('http://127.0.0.1:8000/api/' + Model + '/' + id);
  }

}

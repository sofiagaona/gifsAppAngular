import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsRespons, Gif } from '../../interface/gifs.interface';


@Injectable({
  providedIn: 'root' // es indicado por angular que sera majejado de forma global, si queremos que sea nivel local borramos esta espercoficacion y agregamos el provider en el modulo
})
export class GifsService {
  private _apiKey:string='qRviHh3GcIRccZaB36ep8cZdcQ8ze2rA'
  private _historial: string[]=[]
  public resultado : Gif[]=[]
  private _serviceUrl : string= 'https://api.giphy.com/v1/gifs';

  get historial(){
    return [...this._historial] // el operador spred ropmpe la relacion con el this.busqueda, y  generara uno nuevo
  }
  constructor(private http:HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')! )|| [];
    this.resultado = JSON.parse(localStorage.getItem('ultimoResultado')!)|| [];
    /*if(localStorage.getItem('historial')){
      this._historial= JSON.parse(localStorage.getItem('historial')!)
    }*/
  }

 buscarGifs(query:string){

    query= query.trim().toLocaleLowerCase()
  
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    const params = new HttpParams()
       .set('api_key', this._apiKey)
       .set('limit', '10')
       .set('q', query);
  
    this.http.get<SearchGifsRespons>(`${this._serviceUrl}/search`,{params})
      .subscribe((resp) =>{ //subscribe es paresido al .then espera que se resuelva la resp
        console.log(resp.data)
        this.resultado=resp.data;
        localStorage.setItem('ultimoResultado',JSON.stringify(this.resultado) );
      })
  }
}

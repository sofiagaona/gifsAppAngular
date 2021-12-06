import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsRespons, Gif } from '../../interface/gifs.interface';


@Injectable({
  providedIn: 'root' // es indicado por angular que sera majejado de forma global, si queremos que sea nivel local borramos esta espercoficacion y agregamos el provider en el modulo
})
export class GifsService {
  private _apiKey:string='qRviHh3GcIRccZaB36ep8cZdcQ8ze2rA'
  private _historial: string[]=[]
  public resultado : Gif[]=[]

  get historial(){
    return [...this._historial] // el operador spred ropmpe la relacion con el this.busqueda, y  generara uno nuevo
  }
  constructor(private http:HttpClient){}

 buscarGifs(query:string){

    query= query.trim().toLocaleLowerCase()
  
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
    }
  
    this.http.get<SearchGifsRespons>(`http://api.giphy.com/v1/gifs/search?api_key=qRviHh3GcIRccZaB36ep8cZdcQ8ze2rA&q=${query}&limit=10`)
      .subscribe((resp) =>{ //subscribe es paresido al .then espera que se resuelva la resp
        console.log(resp.data)
        this.resultado=resp.data;
      })
  }
}

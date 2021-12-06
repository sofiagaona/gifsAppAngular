import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
 
})
export class BusquedaComponent  {
  @ViewChild('txtBuscar') txtBuscar!:ElementRef <HTMLInputElement> // busca un elemento con una referencia en html y le asigna el valor al elemento txtBuscar de tipo ElementRef
  constructor(private gifsService:GifsService){}
  buscar(){
    const valor = this.txtBuscar.nativeElement.value
    if (valor.trim().length===0){
      return
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value="";
  }

}

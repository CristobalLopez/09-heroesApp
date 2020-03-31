import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[]=[];
  cargando= false;

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
    this.cargando=true;
    this.heroeService.getHeroes()
    .subscribe(resp=> {
      this.heroes= resp;
      this.cargando= false;
    });
    
  }

  borrarHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea eliminar a ${heroe.nombre}`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
    this.heroeService.borrarHeroe(heroe.id).subscribe();
        
      }
    });
    

  }

}

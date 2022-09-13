import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons: number = 0;

  constructor(
    private dateService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    this.dateService.getPokemons(12, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach( (result: any) => {
          this.dateService.getMoreData(result.name)
            .subscribe((res: any) => {
              this.pokemons.push(res);
            });
          });
      } );
  }

}

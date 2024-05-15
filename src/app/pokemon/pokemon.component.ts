import { Component, NgModule } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Pokemon } from './interface/interfacepokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: ServiceService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemonList().subscribe(
      (pokemonList: Pokemon[] | undefined) => {
        if (pokemonList) {
          this.pokemons = pokemonList;
        }
      }
    );
  }

}

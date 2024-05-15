import { Component, Input } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { CommonModule } from '@angular/common';
import { DetailpokemonComponent } from '../pokemon/detailpokemon/detailpokemon.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonComponent, CommonModule, PokemonComponent, DetailpokemonComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',

})
export class PokedexComponent {
  showPokedex: boolean = true;
  selectedPokemonName: string = '';

  onPokemonSelected(pokemonName: string): void {
    this.selectedPokemonName = pokemonName;
    this.togglePokedexAnimation();
  }

  togglePokedexAnimation(): void {
    this.showPokedex = false;
    setTimeout(() => {
      this.showPokedex = true;
    }, 500); // Duración de la animación en milisegundos
  }
}

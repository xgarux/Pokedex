import { Component, Input } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { CommonModule } from '@angular/common';
import { DetailpokemonComponent } from '../pokemon/detailpokemon/detailpokemon.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonComponent, CommonModule, PokemonComponent, DetailpokemonComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',

})
export class PokedexComponent {
  isOpen: boolean = true;
  selectedPokemonName: string = '';
  boxHeight: number = 0;
  boxWidth: number = 0;
  onPokemonSelected(pokemonName: string): void {
    this.selectedPokemonName = pokemonName;
    this.toggle();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      setTimeout(() => {
        this.isOpen = true;
      }, 1000);
    }
  }
}

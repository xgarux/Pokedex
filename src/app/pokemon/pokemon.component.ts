import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Pokemon } from './interface/interfacepokemon';
import { Result } from './interface/interfacepokemonlist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailpokemonComponent } from './detailpokemon/detailpokemon.component';
import { PostloadpokemonComponent } from './postloadpokemon/postloadpokemon.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailpokemonComponent, PostloadpokemonComponent],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']  // Corrección aquí
})
export class PokemonComponent implements OnInit {
  pokemons: Result[] = [];
  filteredPokemons: Result[] = [];
  searchInput: string = '';
  selectedPokemonName: string = '';
  limit: number = 1302;
  offset: number = 0;

  @Output() pokemonSelected = new EventEmitter<string>();

  constructor(private pokemonService: ServiceService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe(
      (pokemonList: Result[] | undefined) => {
        if (pokemonList) {
          this.pokemons = pokemonList;
        }
      }
    );
  }

  filterPokemons(): void {
    if (this.searchInput.trim() === '') {
      this.filteredPokemons = [];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  }

  selectPokemon(name: string): void {
    this.selectedPokemonName = name;
    this.pokemonSelected.emit(name);
    this.searchInput = '';
  }

  resetSearch(): void {
    this.searchInput = '';
  }

  PokemonSelectedlist(pokemonName: string): void {
    this.selectedPokemonName = pokemonName;
    this.pokemonSelected.emit(pokemonName);
  }
}

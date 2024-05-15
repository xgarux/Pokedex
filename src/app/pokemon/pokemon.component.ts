import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Pokemon } from './interface/interfacepokemon';
import { Result } from './interface/interfacepokemonlist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailpokemonComponent } from './detailpokemon/detailpokemon.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailpokemonComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  pokemons: Result[] = [];
  filteredPokemons: Result[] = [];
  searchInput: string = '';
  showDetailPokemonComponent='s'
  selectedPokemonName: string = ''; // Propiedad para almacenar el nombre del Pokémon seleccionado

  @Output() pokemonSelected = new EventEmitter<string>();

  constructor(private pokemonService: ServiceService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemonList().subscribe(
      (pokemonList: Result[] | undefined) => {
        if (pokemonList) {
          this.pokemons = pokemonList;
        }
      }
    );
  }

  // Método para filtrar Pokémones por nombre
  filterPokemons(): void {
    if (this.searchInput.trim() === '') {
      this.filteredPokemons = [];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  }

  // Método para emitir el nombre del Pokémon seleccionado y almacenarlo
  selectPokemon(name: string): void {
    this.selectedPokemonName = name; // Almacenar el nombre del Pokémon seleccionado
    this.pokemonSelected.emit(name);
    this.searchInput = '';
  }

  // Método para restablecer el campo de búsqueda al hacer clic en el botón de búsqueda
  resetSearch(): void {
    this.searchInput = ''; // Restablecer el campo de búsqueda
  }
}


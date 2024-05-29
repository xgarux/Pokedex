import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Pokemon } from '../interface/interfacepokemon';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from '../pokemon.component';
import { PokemonTabComponent } from './pokemonTab/pokemonTab.component';
import { first } from 'rxjs';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';

@Component({
  selector: 'app-detailpokemon',
  standalone: true,
  imports: [CommonModule, PokemonComponent, PokemonTabComponent, EvolutionChainComponent],
  templateUrl: './detailpokemon.component.html',
  styleUrls: ['./detailpokemon.component.css'] // Asegúrate de que está bien escrito
})
export class DetailpokemonComponent implements OnChanges, OnInit {

  constructor(private servicePokemon: ServiceService) {}

  @Input() pokemonName: string = 'bulbasaur';
  pokemon?: Pokemon;
  pokemon_id: number = 1;
  hiddenView: boolean = false;
  isIconToggled: boolean = true;
  isFlipped: boolean = false;
  isFlipped2: boolean = false;
  showDiv = false;

  toggleFlip2() {
    this.isFlipped2 = !this.isFlipped2;
  }

  toggleFlip() {
    if (this.hiddenView) {
      this.isFlipped2 = false;
    }
    this.isFlipped = !this.isFlipped;
    this.hiddenView = !this.hiddenView;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonName'] && !changes['pokemonName'].firstChange) {
      const newPokemonName = changes['pokemonName'].currentValue;
      if (newPokemonName) {
        setTimeout(() => {
          this.getPokemon(newPokemonName);
          this.hiddenView = false;
          this.isIconToggled = true;
          this.isFlipped = false;
          this.isFlipped2 = false;
        }, 500);
      }
    }
  }

  ngOnInit(): void {
    this.getPokemon('bulbasaur');
    this.showDivWithDelay();
  }

  getPokemon(name: string): void {
    this.servicePokemon.getPokemonByName(name).subscribe({
      next: (poke: Pokemon) => {
        this.pokemon = poke;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  showDivWithDelay(): void {
    setTimeout(() => {
      this.showDiv = true;
    }, 500);
  }

  clickview() {
    this.hiddenView = !this.hiddenView;
  }

  rotate() {
    this.isIconToggled = !this.isIconToggled;
  }

  getBackgroundColor(types: Pokemon): any {
    const primaryType = types.types.length > 0 ? types.types[0].type.name : '';
    switch (primaryType) {
      case 'grass':
        return { 'bg-green-400': true };
      case 'fire':
        return { 'bg-red-400': true };
      case 'water':
        return { 'bg-blue-400': true };
      default:
        return { 'bg-gray-400': true };
    }
  }

  getTypeColor(typeName: string): any {
    switch (typeName) {
      case 'normal':
        return { 'normal-bg': true };
      case 'fire':
        return { 'fire-bg': true };
      case 'water':
        return { 'water-bg': true };
      case 'poison':
        return { 'poison-bg': true };
      case 'grass':
        return { 'grass-bg': true };
      case 'ice':
        return { 'ice-bg': true };
      case 'fighting':
        return { 'fighting-bg': true };
      case 'ground':
        return { 'ground-bg': true };
      case 'flying':
        return { 'flying-bg': true };
      case 'electric':
        return { 'electric-bg': true };
      case 'psychic':
        return { 'psychic-bg': true };
      case 'bug':
        return { 'bug-bg': true };
      case 'rock':
        return { 'rock-bg': true };
      case 'dragon':
        return { 'dragon-bg': true };
      case 'dark':
        return { 'dark-bg': true };
      case 'steel':
        return { 'steel-bg': true };
      case 'ghost':
        return { 'ghost-bg': true };
      case 'fairy':
        return { 'fairy-bg': true };
      default:
        return { 'bg-gray-200': true };
    }
  }
}

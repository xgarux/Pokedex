import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Pokemon } from '../interface/interfacepokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailpokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailpokemon.component.html',
  styleUrl: './detailpokemon.component.css'
})
export class DetailpokemonComponent implements OnInit {

  constructor(private servicePokemon: ServiceService) { }

  pokemon?: Pokemon;
  pokemon_id:number = 0;

  ngOnInit(): void {
    this.servicePokemon.getPokemonById(this.pokemon_id).subscribe({
      next: (poke: Pokemon | undefined) => {
        console.log(poke);
        this.pokemon = poke;
      },
      error: (err) => {
        console.error(err);
      }
    });
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

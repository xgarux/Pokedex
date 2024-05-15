import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailpokemonComponent } from './pokemon/detailpokemon/detailpokemon.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DetailpokemonComponent, PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';

}

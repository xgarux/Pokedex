import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailpokemonComponent } from './pokemon/detailpokemon/detailpokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DetailpokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
  cliqueable = false;

  change(){
    this.cliqueable = !this.cliqueable;
  }

}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',loadComponent:() => import('./app.component')
    .then(m => m.AppComponent)
  },
  {
    path: 'list',loadComponent:() => import('./pokemon/pokemon.component')
    .then(m => m.PokemonComponent)
  },
  {
    path: 'list2',loadComponent:() => import('./pokemon/postloadpokemon/postloadpokemon.component')
    .then(m => m.PostloadpokemonComponent)
  },
  {
    path: 'pokedex',loadComponent:() => import('./pokedex/pokedex.component')
    .then(m => m.PokedexComponent)
  },
  {
    path: 'detail',loadComponent:() => import('./pokemon/detailpokemon/detailpokemon.component')
    .then(m => m.DetailpokemonComponent)
  },
  {
    path: '**', redirectTo:'home'
  }
];

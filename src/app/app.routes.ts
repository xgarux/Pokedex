import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pokedex/pokedex.component').then(m => m.PokedexComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pokemon/pokemon.component').then(m => m.PokemonComponent)
  },
  {
    path: 'detail',
    loadComponent: () => import('./pokemon/detailpokemon/detailpokemon.component').then(m => m.DetailpokemonComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

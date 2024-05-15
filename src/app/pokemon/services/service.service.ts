import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Pokemon } from '../interface/interfacepokemon';
import { Result, Interfacepokemonlist } from '../interface/interfacepokemonlist';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = 'https://pokeapi.co/api/v2/pokemon';
  urlList: string = 'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0';

  constructor(private http: HttpClient) { }

  getPokemonByName(name: string): Observable<Pokemon | undefined> {
    const url = `${this.url}/${name}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.log(`Error fetching Pokémon with name ${name}:`, error);
        return of(undefined);
      })
    );
  }
  getPokemonList(): Observable<Result[] | undefined> {
    return this.http.get<Interfacepokemonlist>(this.urlList).pipe(
      catchError(error => {
        console.log('Error fetching Pokémon list:', error);
        return of(undefined);
      }),
      map(response => response?.results)
    );
  }
  getPokemonById(id: number): Observable<Pokemon | undefined> {
    const url = `${this.url}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.log(`Error fetching Pokémon with ID ${id}:`, error);
        return of(undefined);
      })
    );
  }
}

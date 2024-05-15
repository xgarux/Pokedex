import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Pokemon } from '../interface/interfacepokemon';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = 'https://pokeapi.co/api/v2/pokemon';
  urllist: string = 'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0';

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
  getPokemonList(): Observable<Pokemon[] | undefined> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      catchError((error => {
        console.log(error)
        return of(undefined)
      }))
    )
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

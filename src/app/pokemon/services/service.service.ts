import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Pokemon } from '../interface/interfacepokemon';
import { Result, Interfacepokemonlist } from '../interface/interfacepokemonlist';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonByName name=${name}`, undefined))
    );
  }

  getPokemonList(limit: number, offset: number): Observable<Result[] | undefined> {
    const url = `${this.baseUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<Interfacepokemonlist>(url).pipe(
      map(response => response?.results),
      catchError(this.handleError<Result[]>('getPokemonList', undefined))
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonById id=${id}`, undefined))
    );
  }
}

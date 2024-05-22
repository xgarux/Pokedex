import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Pokemon, Species } from '../interface/interfacepokemon';
import { Result, Interfacepokemonlist } from '../interface/interfacepokemonlist';
import { Interfacespecies } from '../interface/interfacespecies';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonByName name=${name}`, undefined))
    );
  }

  getAllByUrl(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getAllByUrl`, undefined))
    );
  }

  getPokemonList(limit: number, offset: number): Observable<Result[] | undefined> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<Interfacepokemonlist>(url).pipe(
      map(response => response?.results),
      catchError(this.handleError<Result[]>('getPokemonList', undefined))
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonById id=${id}`, undefined))
    );
  }
}

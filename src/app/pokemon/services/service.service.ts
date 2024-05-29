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

  /**
   * Maneja los errores de las operaciones HTTP.
   * @param operation - Nombre de la operación que falló.
   * @param result - Valor opcional a devolver como resultado observable.
   * @returns Observable con el resultado proporcionado o un error.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un resultado vacío para mantener la aplicación funcionando.
      return of(result as T);
    };
  }

  /**
   * Obtiene un Pokémon por su nombre.
   * @param name - Nombre del Pokémon.
   * @returns Observable con el Pokémon.
   */
  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonByName name=${name}`))
    );
  }

  /**
   * Obtiene datos de una URL específica.
   * @param url - URL de la cual obtener datos.
   * @returns Observable con los datos obtenidos.
   */
  getAllByUrl(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getAllByUrl'))
    );
  }

  /**
   * Obtiene una lista de Pokémon con un límite y un offset.
   * @param limit - Número de Pokémon a obtener.
   * @param offset - Offset para la lista de Pokémon.
   * @returns Observable con una lista de resultados de Pokémon.
   */
  getPokemonList(limit: number, offset: number): Observable<Result[] | undefined> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<Interfacepokemonlist>(url).pipe(
      map(response => response?.results),
      catchError(this.handleError<Result[]>('getPokemonList'))
    );
  }

  /**
   * Obtiene un Pokémon por su ID.
   * @param id - ID del Pokémon.
   * @returns Observable con el Pokémon.
   */
  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonById id=${id}`))
    );
  }
}

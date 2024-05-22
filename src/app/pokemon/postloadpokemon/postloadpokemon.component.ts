import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Result } from '../interface/interfacepokemonlist';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';
import { Pokemon } from '../interface/interfacepokemon';

@Component({
  selector: 'app-postloadpokemon',
  standalone: true,
  imports: [CommonModule,InfiniteScrollModule],
  templateUrl: './postloadpokemon.component.html',
  styleUrl: './postloadpokemon.component.css'
})
export class PostloadpokemonComponent implements OnInit{
  pokemons: Result[] = [];
  pokemonresults:Pokemon[] = [];
  pokemonSelected:string="";
  show: boolean = false;
  isIconToggled: boolean = true;
  cont:number = 0;

  @Output() pokemonlistselected = new EventEmitter<string>();

  // Número de elementos a cargar por página
  pageSize = 20;
  // Página actual
  currentPage = 1;
  // Indica si hay más elementos para cargar
  hasMorePokemons = true;

  // Suscripción al observable
  private subscription: Subscription = new Subscription();
  timerSubscription: Subscription = new Subscription();
  private estado$ = new Subject<boolean>();
  private destroy$ = new Subject<void>();
  n:number=0;

  constructor(private pokemonService: ServiceService) { }

  ngOnInit(): void {
    this.timerSubscription = timer(100, 100).pipe(
      takeUntil(this.estado$),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadPokemons();
      this.detenerEjecucion(this.hasMorePokemons)
    });

  }

  ngOnDestroy(): void {
    // Liberar recursos al destruir el componente
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
  detenerEjecucion(detener:boolean) {
    if(!detener){
      this.estado$.next(false);
      this.estado$.complete();
    }
  }

  loadPokemons(): void {
    // Si ya no hay más pokemons por cargar, salimos
    if (!this.hasMorePokemons) return;

    // Llama al servicio para obtener la próxima página de pokemons
    this.subscription.add(this.pokemonService.getPokemonList(this.pageSize, (this.currentPage - 1) * this.pageSize)
      .subscribe((newPokemons: Result[] | undefined) => {
        if (newPokemons) {
          // Por cada nuevo pokemon, obtenemos su información detallada para obtener la URL de la imagen
          newPokemons.forEach((pokemon: Result) => {
            this.pokemonService.getPokemonByName(pokemon.name).subscribe({
              next: (poke: Pokemon) => {
                this.pokemonresults.push(poke);
              },
              error: (err) => {
                console.error(err);
              }
            }
              /* (detailedPokemon) => {
              //this.pokemonimage = [...this.pokemonimage, ...detailedPokemon.sprites.front_default];
              this.pokemonimage.push(detailedPokemon.sprites.front_default);
            } */
          );
          });

          // Agrega los nuevos pokemons a la lista existente
          this.pokemons = [...this.pokemons, ...newPokemons];
          // Incrementa el número de página actual
          this.currentPage++;
          // Verifica si hay más pokemons por cargar
          this.hasMorePokemons = newPokemons.length === this.pageSize;
        }
      }));
  }
  open() {
    this.show = !this.show;
    this.isIconToggled = !this.isIconToggled;
  }
  selectPokemon(name: string): void {
    this.pokemonlistselected.emit(name);
    this.show = false;
  }
}

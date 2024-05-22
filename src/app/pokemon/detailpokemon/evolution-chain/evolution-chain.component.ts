import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Pokemon } from '../../interface/interfacepokemon';
import { Subscription, forkJoin, take, timer } from 'rxjs';
import { EvolutionChain } from '../../interface/interfacespecies';
import { Chain, Evolution } from '../../interface/interfaceEvolution';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.css'
})
export class EvolutionChainComponent implements OnInit, OnChanges{

  constructor(private servicePokemon: ServiceService) { }

  timerSubscription: Subscription = new Subscription();

  @Input() pokemon?: Pokemon;
  evolUrl:string ="";
  evolutionChain?:Evolution;
  evolListname:string[] = [];
  evolListdesc:string[] = [];
  evolListsprites:string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      const newPokemon = changes['pokemon'].currentValue;
      if (newPokemon) {
        setTimeout(() => {
          this.evolListname = [];
          this.evolListdesc = [];
          this.evolListsprites = [];
          this.getAll(newPokemon.species.url);
        }, 50);

      }
    }
  }
  ngOnInit(): void {
    if (this.pokemon?.species?.url) {
      this.getAll(this.pokemon?.species?.url);
     } else {
      console.error('La URL de la especie del Pokémon no está definida.');
    }
  }
  getAll(url: string): void {
    this.getSpecies(url);
    this.timerSubscription = timer(500).pipe(take(1))
    .subscribe(() => {
      if (this.evolUrl) {
        this.getEvolutionChain(this.evolUrl);
        this.timerSubscription = timer(500).pipe(take(1)).subscribe(() => {
          this.getSprites(this.evolListname);
        });
       } else {
        console.error('La URL de la especie del Pokémon no está definida.');
      }
    });
  }
  getSprites(names: string[]): void {
    const observables = names.map(name => this.servicePokemon.getPokemonByName(name));

    forkJoin(observables).subscribe({
      next: (pokemons: Pokemon[]) => {
        pokemons.forEach(poke => {
          this.evolListsprites.push(poke.sprites.front_default);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  /* getSprites(name: string[]): void {
    for (let item of name) {
      this.servicePokemon.getPokemonByName(item).subscribe({
        next: (poke: Pokemon) => {
          this.evolListsprites.push(poke.sprites.front_default);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  } */
  getSpecies(url: string): void {
    this.servicePokemon.getAllByUrl(url).subscribe({
      next: (poke: any) => {
        this.evolUrl = poke.evolution_chain.url
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getEvolutionChain(url: string): void {
    this.servicePokemon.getAllByUrl(url).subscribe({
      next: (poke: Evolution) => {
        this.evolutionChain = poke;
        this.initializeEvolution(poke);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getEvolutions(chain: Chain) {
    this.evolListname.push(chain.species.name);

    for (let detail of chain.evolution_details) {
      this.evolListdesc.push(detail.trigger.name);
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (let nextChain of chain.evolves_to) {
        this.getEvolutions(nextChain);
      }
    }
  }

  initializeEvolution(evolution: Evolution) {
    this.getEvolutions(evolution.chain);
  }
}
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
export class EvolutionChainComponent implements OnInit, OnChanges {

  constructor(private servicePokemon: ServiceService) { }

  timerSubscription: Subscription = new Subscription();

  @Input() pokemon?: Pokemon;
  evolUrl: string = "";
  evolutionChain?: Evolution;
  evolListname: string[] = [];
  evolListdesc: string[] = ['Evolucion Base'];
  evolListmotivo: string[] = [''];
  evolListsprites: string[] = [];
  countEvoleTox: number = 0;
  countEvoleToy: number = 0;
  MatName: string[][] = [];
  iterar:number=0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      const newPokemon = changes['pokemon'].currentValue;
      if (newPokemon) {
        setTimeout(() => {
          this.countEvoleTox = 0;
          this.countEvoleToy = 0;
          this.evolListname = [];
          this.evolListdesc = ['Evolucion Base'];
          this.evolListsprites = [];
          this.evolListmotivo = [''];
          this.matrizNull();
          this.getAll(newPokemon.species.url);
        }, 50);

      }
    }
  }
  matrizNull() {
    for (let i = 0; i < 10; i++) {
      this.MatName[i] = [];
      for (let j = 0; j < 10; j++) {
        this.MatName[i][j] = '';
      }
    }
  }
  ngOnInit(): void {
    if (this.pokemon?.species?.url) {
      this.getAll(this.pokemon?.species?.url);
      this.matrizNull();
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
  getTooltipDescription(sprite: string): string {
    const index = this.evolListsprites.indexOf(sprite);
    if (index !== -1 && index < this.evolListdesc.length) {
      return this.evolListdesc[index];
    } else {
      return 'Descripción no disponible';
    }
  }
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

    this.MatName[this.countEvoleTox][this.countEvoleToy] = chain.species.name;

    for (let detail of chain.evolution_details) {
      this.evolListdesc.push(detail.trigger.name);
      for (let [key, value] of Object.entries(detail)) {
        if (value !== null && key !== 'trigger') {
          if (typeof value === 'object') {
            this.evolListmotivo.push(value.name);
          } else {
            this.evolListmotivo.push(value);
          }
          break; // Detener la búsqueda después de encontrar el primer campo no nulo
        }
      }
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      this.countEvoleTox++;
      for (let nextChain of chain.evolves_to) {
        this.countEvoleToy++;
        this.getEvolutions(nextChain);
      }
    }
  }

  initializeEvolution(evolution: Evolution) {
    this.getEvolutions(evolution.chain);
  }
  concatDesc(description: string, motivo: string): string {
    if (!description && !motivo) {
      return ''; // Si ambos son nulos o vacíos, retornar una cadena vacía
    } else if (!description) {
      return motivo; // Si la descripción es nula o vacía, retornar solo el motivo
    } else if (!motivo) {
      return description; // Si el motivo es nulo o vacío, retornar solo la descripción
    } else {
      // Si ambos tienen contenido, concatenar la descripción y el motivo
      return `${description} ${motivo}`;
    }
  }
  getClassColumn(val: number): string {
    return 'grid-cols-' + val;
  }
  getClassRows(val: number): string {
    return 'grid-rows-' + val;
  }
  contarValoresPorFila(): number[] {
    return this.MatName.map(fila =>
      fila.filter(valor => this.evolListname.includes(valor)).length
    );
  }
  getIndex(i:number): number [] {
    //aun ni lo uso -.-
    const filaEspecifica = this.MatName[i];
    return filaEspecifica
      .map((valor, indice) => this.evolListname.includes(valor) ? indice : -1)
      .filter(indice => indice !== -1);
  }
}

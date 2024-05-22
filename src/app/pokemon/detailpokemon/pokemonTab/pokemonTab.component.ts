import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokemon, Species } from '../../interface/interfacepokemon';
import { ServiceService } from '../../services/service.service';
import { Interfacespecies } from '../../interface/interfacespecies';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-pokemonTab',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./pokemonTab.component.html',
  styleUrls: ['./pokemonTab.component.css']
})

export class PokemonTabComponent implements OnInit, OnChanges {

  activeTab: string = 'about';
  showInfo: boolean[] = [false, false, false, false, false, false];
  species?:Interfacespecies;
  @Input() pokemon?:Pokemon;
  description:string[] = [];
  characteristic:string="";
  ability:string="";
  deletestring:string="Pokémon"
  evolclick:boolean = false;


  timerSubscription: Subscription = new Subscription();

  constructor(private servicePokemon: ServiceService) { }

  ngOnInit() {
    this.timerSubscription = timer(500).pipe(take(1))
    .subscribe(() => {
      if (this.pokemon?.species.url) {
        this.getSpecies(this.removeLastCharacter(this.pokemon?.species.url));
        this.getAbility(this.removeLastCharacter(this.pokemon.abilities[0].ability.url));
       } else {
        console.error('La URL de la especie del Pokémon no está definida.');
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      const newPokemon = changes['pokemon'].currentValue;
      if (newPokemon) {
        setTimeout(() => {
          this.description = [];
          this.getSpecies(this.removeLastCharacter(newPokemon.species.url));
          this.getAbility(this.removeLastCharacter(newPokemon.abilities[0].ability.url));
        }, 50);

      }
    }
  }

  getAbility(url: string): void {
    this.servicePokemon.getAllByUrl(url).subscribe({
      next: (pokes: any) => {
        this.getAbilityFiltered(pokes);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getSpecies(url: string): void {
    this.servicePokemon.getAllByUrl(url).subscribe({
      next: (poke: Interfacespecies) => {
        this.species = poke;
        this.getListFiltered(poke);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  selectTab(tab: string) {
    this.activeTab = tab;
  }
  getAcronym(param: string): string {
    const acronyms: { [key: string]: string } = {
      hp:'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      speed: 'SPD',
    };
    return acronyms[param] || param;
  }
  getStatPercentage(baseStat: number): number {
    const maxStat = 255;
    return (baseStat / maxStat) * 100;
  }
  getHeightinM(height: number|undefined): number {
    if (height) {
      return (height / 10);
    }else{
      return 1;
    }
  }
  removeLastCharacter(cadena: string): string {
    if (cadena.length > 0) {
      return cadena.slice(0, -1);
    }
    return cadena;
  }

  getListFiltered(sp:Interfacespecies){
    if (sp.flavor_text_entries) {
      for (let item of sp.flavor_text_entries) {
        if (item.language.name === 'es') {
          this.description.push(item.flavor_text);
        }
      }
    }
    if (sp.genera) {
      for (let item of sp.genera) {
        if (item.language.name === 'es') {
          this.characteristic = item.genus;
        }
      }
    }
  };
  getAbilityFiltered(sp:any){
    if (sp.names) {
      for (let item of sp.names) {
        if (item.language.name === 'es') {
          this.ability = item.name;
        }
      }
    }
  };
  shortCategory(concat: string): string {
    const resultado = concat.replace(new RegExp(`\\b${this.deletestring}\\b`, 'gi'), '');

    return resultado;
  }

};

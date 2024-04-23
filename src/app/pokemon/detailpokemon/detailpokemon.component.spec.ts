import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpokemonComponent } from './detailpokemon.component';

describe('DetailpokemonComponent', () => {
  let component: DetailpokemonComponent;
  let fixture: ComponentFixture<DetailpokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailpokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailpokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

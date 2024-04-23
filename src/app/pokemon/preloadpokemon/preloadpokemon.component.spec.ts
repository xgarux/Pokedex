import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadpokemonComponent } from './preloadpokemon.component';

describe('PreloadpokemonComponent', () => {
  let component: PreloadpokemonComponent;
  let fixture: ComponentFixture<PreloadpokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreloadpokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreloadpokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

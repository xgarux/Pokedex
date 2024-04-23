import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostloadpokemonComponent } from './postloadpokemon.component';

describe('PostloadpokemonComponent', () => {
  let component: PostloadpokemonComponent;
  let fixture: ComponentFixture<PostloadpokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostloadpokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostloadpokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

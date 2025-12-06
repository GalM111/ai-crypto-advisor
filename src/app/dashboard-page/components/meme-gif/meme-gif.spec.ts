import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeGif } from './meme-gif';

describe('MemeGif', () => {
  let component: MemeGif;
  let fixture: ComponentFixture<MemeGif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeGif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemeGif);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCrypto } from './select-crypto';

describe('SelectCrypto', () => {
  let component: SelectCrypto;
  let fixture: ComponentFixture<SelectCrypto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCrypto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCrypto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

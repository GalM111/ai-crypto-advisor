import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContent } from './select-content';

describe('SelectContent', () => {
  let component: SelectContent;
  let fixture: ComponentFixture<SelectContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

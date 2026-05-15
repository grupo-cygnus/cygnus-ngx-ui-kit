import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafelistContentComponent } from './safelist-content.component';

describe('SafelistContentComponent', () => {
  let component: SafelistContentComponent;
  let fixture: ComponentFixture<SafelistContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafelistContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafelistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

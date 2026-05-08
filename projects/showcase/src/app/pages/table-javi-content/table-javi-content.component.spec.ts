import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableJaviContentComponent } from './table-javi-content.component';

describe('TableJaviContentComponent', () => {
  let component: TableJaviContentComponent;
  let fixture: ComponentFixture<TableJaviContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableJaviContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableJaviContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [FlexLayoutModule, MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [FlexLayoutModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}

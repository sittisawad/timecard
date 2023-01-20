import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';

const includes = [
  CommonModule,
  ReactiveFormsModule,
  NzGridModule,
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzCardModule,
  NzCheckboxModule,
  NzMessageModule,
];

@NgModule({
  declarations: [],
  imports: [...includes],
  exports: [...includes],
  providers: [],
})
export class SharedModule {}

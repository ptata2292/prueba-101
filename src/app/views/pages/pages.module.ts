import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
// import { MaterialModule } from './material/material.module';


@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		SharedModule,
		HttpClientModule,
		// MaterialModule
	],
	providers: []
})
export class PagesModule {
}

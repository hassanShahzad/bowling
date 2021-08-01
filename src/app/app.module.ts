import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BowlingFramesComponent } from './pages/bowling-frames/bowling-frames.component';
import { HeaderComponent } from './components/header/header.component';
import { BowlingPinsComponent } from './components/bowling-pins/bowling-pins.component';

@NgModule({
  declarations: [
    AppComponent,
    BowlingFramesComponent,
    HeaderComponent,
    BowlingPinsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

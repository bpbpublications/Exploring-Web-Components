import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { MyComponentComponent } from './my-component/my-component.component';

@NgModule({
  declarations: [
    MyComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [MyComponentComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(MyComponentComponent, { injector });
    customElements.define('my-component', el);
  }

  ngDoBootstrap() {}
}

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations()]
};

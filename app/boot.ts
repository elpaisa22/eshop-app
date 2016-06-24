import {bootstrap}    from 'angular2/platform/browser';
import {MainComponent} from './components/main/main.component';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(MainComponent,  [ ROUTER_PROVIDERS ]);

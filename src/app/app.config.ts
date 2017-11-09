import { InjectionToken } from "@angular/core";

export class AppConfig {
  apiEndpoint: string;
}

export const REMOTE_CONFIG: AppConfig = {
  apiEndpoint: 'http://shophaus.iarmenda.webfactional.com',
};

export const LOCAL_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8000',
};

export let APP_CONFIG = new InjectionToken<AppConfig>( 'app.config' );

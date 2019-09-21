import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  MapsAPILoader,
  LAZY_MAPS_API_CONFIG,
  LazyMapsAPILoaderConfigLiteral,
  GoogleMapsScriptProtocol
} from '@agm/core';
import { DocumentRef, WindowRef } from '@agm/core/utils/browser-globals';

import { GoogleService } from './google.service';

@Injectable()
export class CustomLazyAPIKeyLoader extends MapsAPILoader {
  private scriptLoadingPromise: Promise<void>;
  private config: LazyMapsAPILoaderConfigLiteral;
  private windowRef: WindowRef;
  private documentRef: DocumentRef;

  constructor(
    @Inject(LAZY_MAPS_API_CONFIG) config: any,
    w: WindowRef,
    d: DocumentRef,
    private googleService: GoogleService
  ) {
    super();
    this.config = config || {};
    this.windowRef = w;
    this.documentRef = d;
  }

  load(): Promise<void> {
    if (this.scriptLoadingPromise) {
      return this.scriptLoadingPromise;
    }

    const script = this.documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName = `agmLazyMapsAPILoader`;

    this._getScript(callbackName).subscribe(res => {
      script.innerHTML = res;
      this.documentRef.getNativeDocument().body.appendChild(script);
    });

    this.scriptLoadingPromise = new Promise<void>(
      (resolve: () => void, reject: (err: any) => void) => {
        this.windowRef.getNativeWindow()[callbackName] = () => {
          resolve();
        };

        script.onerror = (error: Event) => {
          reject(error);
        };
      }
    );

    return this.scriptLoadingPromise;
  }

  private _getScript(callbackName: string): Observable<string> {
    const protocolType: GoogleMapsScriptProtocol =
      (this.config && this.config.protocol) || GoogleMapsScriptProtocol.HTTPS;
    let protocol: string;

    switch (protocolType) {
      case GoogleMapsScriptProtocol.AUTO:
        protocol = '';
        break;
      case GoogleMapsScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }

    const hostAndPath: string =
      this.config.hostAndPath || 'maps.googleapis.com/maps/api/js';
    const queryParams: { [key: string]: string | Array<string> } = {
      v: this.config.apiVersion || '3',
      callback: callbackName,
      client: this.config.clientId,
      channel: this.config.channel,
      libraries: this.config.libraries,
      region: this.config.region,
      language: this.config.language
    };
    const params: string = Object.keys(queryParams)
      .filter((k: string) => queryParams[k] != null)
      .filter((k: string) => {
        return (
          !Array.isArray(queryParams[k]) ||
          (Array.isArray(queryParams[k]) && queryParams[k].length > 0)
        );
      })
      .map((k: string) => {
        const i = queryParams[k];
        if (Array.isArray(i)) {
          return { key: k, value: i.join(',') };
        }
        return { key: k, value: queryParams[k] };
      })
      .map((entry: { key: string; value: string }) => {
        return `${entry.key}=${entry.value}`;
      })
      .join('&');

    return this.googleService.getMapsScriptContent(
      `${protocol}//${hostAndPath}?${params}`
    );
  }
}

import { SafeHtml } from "@angular/platform-browser";

export interface SelectGeneric {
  value: any,
  option: string,
}

export interface SelectCollection {
  key: string,
  keyItems: string[],
}

export interface SelectCollectOptions {
  key: string,
  selects: SelectGeneric[],
}

export interface SelectIconOption {
  value: any,
  option: string,
  icon: SafeHtml | string, // svg || svg url
}

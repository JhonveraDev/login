import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare let require: any;

@Injectable()
export class I18nService {
  private translate: TranslateService;


  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  public setLanguage(language:any): void {
    this.translate.use(language);
  }

  public instant(key: string): string {
    return this.translate.instant(key);
  }

}

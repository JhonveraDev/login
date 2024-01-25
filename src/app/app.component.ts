import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login';

  constructor(private _translateService: TranslateService) {
    this.initTranslate();
  }

  ngOnInit() {
    this.initTranslate();
  }

  private initTranslate(): void {
    const currentLang = this._translateService.currentLang;
    const defaultLang = currentLang === 'es' ? 'en' : 'es';

    this._translateService.setDefaultLang(defaultLang);
    this._translateService.use(currentLang || defaultLang);
  }
}

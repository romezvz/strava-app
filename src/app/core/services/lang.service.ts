import { isPlatformBrowser } from '@angular/common'
import { Injectable, PLATFORM_ID, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { EN_LANG, ES_LANG, LANG } from '@shared/constants/global.constants'

/**
 * Service responsible for handling lang-related functionality, such as toggling between es and en lang.
 * It manages lang persistence using the browser's local storage.
 */
@Injectable()
export class LangService {
  // Dependency injection
  private readonly _translateService = inject(TranslateService)
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  /**
   * Initializes the language based on local storage or default.
   */
  initLang(): void {
    if (this._isBrowser) {
      const storedLang = localStorage.getItem(LANG) ?? ES_LANG
      this._translateService.use(ES_LANG)
      this._translateService.use(storedLang)
      localStorage.setItem(LANG, storedLang)
    }
  }

  /**
   * Toggles the current language between available options (es/en).
   */
  toggleLang(): void {
    if (!this._isBrowser) {
      return
    }
    const currentLang = this._translateService.getCurrentLang()
    const newLang = currentLang === ES_LANG ? EN_LANG : ES_LANG
    this._translateService.use(newLang)
    localStorage.setItem(LANG, newLang)
  }

  /**
   * Gets the current active language.
   */
  getCurrentLang(): string {
    return this._translateService.getCurrentLang()
  }
}

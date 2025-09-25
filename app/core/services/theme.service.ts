import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { Injectable, PLATFORM_ID, inject } from '@angular/core'
import { THEME, THEME_DARK } from '@shared/constants/global.constants'

/**
 * Service responsible for handling theme-related functionality, such as toggling between light and dark themes.
 * It manages theme persistence using the browser's local storage.
 */
@Injectable()
export class ThemeService {
  // Dependency injection
  private readonly _document = inject(DOCUMENT)
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  /**
   * Initializes the theme based on local storage or default.
   */
  initTheme(): void {
    if (this._isBrowser) {
      const storedTheme = this._localStorageGet()
      if (storedTheme ? JSON.parse(storedTheme) : false) {
        this._setTheme()
      }
    }
  }

  /**
   * Toggles the current theme between available options.
   */
  toggleTheme(): void {
    if (this._isBrowser) {
      this._localStorageSet(this._documentTheme())
    }
  }

  /**
   * Retrieves isDarkTheme.
   * @returns {boolean} - The return theme setting.
   */
  isDarkTheme(): string | null {
    if (this._isBrowser) {
      return localStorage.getItem(THEME)
    }
    return null
  }

  /**
   * Applies the dark theme to the HTML element by adding or removing the dark theme class.
   */
  private _setTheme(): void {
    this._document.querySelector('html')?.classList.toggle(THEME_DARK)
  }

  /**
   * Determines the current theme by checking if the dark theme class is present on the HTML element.
   * @returns {boolean} - True if dark mode is enabled, false otherwise.
   */
  private _documentTheme(): boolean {
    return this._document.querySelector('html')?.classList.toggle(THEME_DARK) ?? false
  }

  /**
   * Saves the current theme state (dark or light mode) to local storage.
   * @param {boolean} isDarkMode - A boolean indicating if dark mode is enabled.
   */
  private _localStorageSet(isDarkMode: boolean): void {
    localStorage.setItem(THEME, JSON.stringify(isDarkMode))
  }

  /**
   * Retrieves the saved theme setting from local storage.
   * @returns {string | null} - The saved theme setting or null if no theme is saved.
   */
  private _localStorageGet(): string | null {
    return localStorage.getItem(THEME)
  }
}

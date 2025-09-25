import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LangService } from '@core/services/lang.service'
import { ThemeService } from '@core/services/theme.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TranslateModule],
  providers: [TranslateService, ThemeService, LangService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Dependency injection for services
  private readonly _themeService = inject(ThemeService)
  private readonly _langService = inject(LangService)

  constructor() {
    this._themeService.initTheme()
    this._langService.initLang()
  }

  /**
   * Toggles the application's theme between dark and light mode.
   */
  toggleTheme(): void {
    this._themeService.toggleTheme()
  }

  /**
   * Toggles the application's Lang between es and en.
   */
  toggleLang(): void {
    this._langService.toggleLang()
  }
}

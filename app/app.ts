import { HttpClient } from '@angular/common/http'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LangService } from '@core/services/lang.service'
import { StravaService } from '@core/services/strava.service'
import { ThemeService } from '@core/services/theme.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ActivityExportComponent } from '@shared/components/activity-export/activity-export.component'
import { BLACK, ORANGE, TWO, TWO_THOUSAND } from '@shared/constants/global.constants'
import html2canvas from 'html2canvas'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, ButtonModule, TranslateModule, ActivityExportComponent],
  providers: [TranslateService, ThemeService, LangService]
})
export class App implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activities: any[] = []

  textColors: Record<number, string> = {}
  lineColors: Record<number, string> = {}

  private readonly _themeService = inject(ThemeService)
  private readonly _langService = inject(LangService)
  private readonly _stravaService = inject(StravaService)
  private readonly _httpClient = inject(HttpClient)

  constructor() {
    this._themeService.initTheme()
    this._langService.initLang()
  }

  ngOnInit(): void {
    if (this._stravaService.isLoggedIn) {
      this.loadData()
    } else {
      this.handleAuthCallback()
    }
  }

  toggleTheme(): void {
    this._themeService.toggleTheme()
  }

  toggleLang(): void {
    this._langService.toggleLang()
  }

  connectStrava(): void {
    window.location.href =
      'https://www.strava.com/oauth/authorize?client_id=178490&response_type=code&redirect_uri=http://localhost:4200&scope=read,activity:read_all,profile:read_all&prompt=login'
  }

  handleAuthCallback(): void {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code) {
      this._stravaService.loginWithCode(code).subscribe(() => {
        this.loadData()
        window.history.replaceState({}, document.title, '/')
      })
    }
  }

  loadData(): void {
    this._stravaService.getProfile().subscribe((res) => (this.profile = res))
    this._stravaService.getActivities().subscribe((res) => {
      this.activities = res
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.forEach((act: any) => {
        this.textColors[act.id] = BLACK
        this.lineColors[act.id] = ORANGE
      })
    })
  }

  logout(): void {
    this._stravaService.logout()
    this.profile = null
    this.activities = []
    this.textColors = {}
    this.lineColors = {}

    const logoutWindow = window.open(
      'https://www.strava.com/logout',
      'stravaLogout',
      'width=500,height=600'
    )

    setTimeout(() => {
      logoutWindow?.close()
    }, TWO_THOUSAND)
  }

  exportActivityAsPNG(activityId: number): void {
    const liElement = document.getElementById(`activity-${activityId}`)
    if (!liElement) {
      return
    }

    const exportContainer = liElement.querySelector('div') as HTMLElement
    if (!exportContainer) {
      return
    }

    html2canvas(exportContainer, { backgroundColor: null, scale: TWO }).then((canvas) => {
      const link = document.createElement('a')
      link.download = `actividad-${activityId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    })
  }
}

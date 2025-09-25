import { TestBed } from '@angular/core/testing'
import { LangService } from '@core/services/lang.service'
import { ThemeService } from '@core/services/theme.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { App } from './app'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TranslateModule.forRoot()],
      providers: [TranslateService, ThemeService, LangService]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})

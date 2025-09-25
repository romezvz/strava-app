import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('strava-app')

  toggleDarkMode(): void {
    const element = document.querySelector('html')
    element?.classList.toggle('dark')
  }
}

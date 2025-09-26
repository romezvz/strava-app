// strava.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class StravaService {
  private readonly API_URL = 'https://www.strava.com/api/v3'
  private readonly BACK_URL = 'http://localhost:3000' // tu backend
  private readonly STORAGE_KEY = 'strava_session'

  private session: any = null

  private readonly _httpClient = inject(HttpClient)

  constructor() {
    this.loadSession()
  }

  get isLoggedIn(): boolean {
    return !!this.session?.access_token
  }

  get accessToken(): string | null {
    return this.session?.access_token || null
  }

  loginWithCode(code: string): Observable<any> {
    return new Observable((observer) => {
      this._httpClient.get(`${this.BACK_URL}/exchange_token?code=${code}`).subscribe({
        next: (res: any) => {
          this.saveSession(res)
          observer.next(res)
          observer.complete()
        },
        error: (err) => observer.error(err)
      })
    })
  }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.accessToken}` })
    return this._httpClient.get(`${this.API_URL}/athlete`, { headers })
  }

  getActivities(): Observable<any[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.accessToken}` })
    return this._httpClient.get<any[]>(`${this.API_URL}/athlete/activities`, { headers })
  }

  logout() {
    this.session = null
    localStorage.removeItem(this.STORAGE_KEY)
  }

  private saveSession(data: any) {
    this.session = data
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
  }

  private loadSession() {
    const data = localStorage.getItem(this.STORAGE_KEY)
    if (data) {
      this.session = JSON.parse(data)
    }
  }
}

import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BLACK, FOUR, ONE, ORANGE, WHITE } from '@shared/constants/global.constants'
import { StravaDatePipe } from '@shared/pipes/date'
import { MetersToKmPipe } from '@shared/pipes/metersToKm'
import { PacePipe } from '@shared/pipes/pace'
import { SecondsToMinutesPipe } from '@shared/pipes/secondsToMinutes'
import { toPng } from 'html-to-image'
import { ActivityRouteComponent } from '../activity-route/activity-route.component'

@Component({
  selector: 'app-activity-export',
  templateUrl: './activity-export.component.html',
  styleUrls: ['./activity-export.component.scss'],
  imports: [
    CommonModule,
    ActivityRouteComponent,
    MetersToKmPipe,
    SecondsToMinutesPipe,
    PacePipe,
    StravaDatePipe,
    FormsModule
  ]
})
export class ActivityExportComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() activity: any
  @Input() polylineData!: string

  @ViewChild('exportContainer', { static: false }) exportContainer!: ElementRef<HTMLDivElement>
  @ViewChild(ActivityRouteComponent) routeComponent!: ActivityRouteComponent

  textColor = BLACK
  lineColor = ORANGE

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedPalette: any

  colorPalettes = [
    { name: 'Strava', text: WHITE, line: ORANGE },
    { name: 'Blanco total', text: WHITE, line: WHITE },
    { name: 'Negro total', text: BLACK, line: BLACK },
    { name: 'Personalizado', text: BLACK, line: ORANGE }
  ]

  applyPalette(): void {
    if (this.selectedPalette) {
      this.textColor = this.selectedPalette.text
      this.lineColor = this.selectedPalette.line
    }
  }

  exportAsPng(): void {
    if (!this.exportContainer || !this.routeComponent) {
      return
    }

    this.routeComponent.exportScale = FOUR
    this.routeComponent.drawRoute()

    toPng(this.exportContainer.nativeElement, {
      backgroundColor: 'transparent',
      pixelRatio: FOUR
    }).then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `${this.activity.name}.png`
      link.href = dataUrl
      link.click()

      this.routeComponent.exportScale = ONE
      this.routeComponent.drawRoute()
    })
  }
}

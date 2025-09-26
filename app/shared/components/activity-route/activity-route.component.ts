import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import polyline from '@mapbox/polyline'
import {
  ONE,
  THREE_HUNDRED,
  TWO,
  WHITE,
  ZERO,
  ZERO_POINT_NINE
} from '@shared/constants/global.constants'

@Component({
  selector: 'app-activity-route',
  templateUrl: './activity-route.component.html',
  styleUrls: ['./activity-route.component.scss']
})
export class ActivityRouteComponent implements AfterViewInit, OnChanges {
  @Input() polylineData!: string
  @Input() lineColor = WHITE
  @Input() exportScale = ONE

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>

  private readonly baseWidth = THREE_HUNDRED
  private readonly baseHeight = THREE_HUNDRED

  ngAfterViewInit(): void {
    this.drawRoute()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['polylineData'] || changes['lineColor'] || changes['exportScale']) {
      this.drawRoute()
    }
  }

  drawRoute(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')
    if (!ctx || !this.polylineData) {
      return
    }

    const coords = polyline.decode(this.polylineData)
    if (coords.length === ZERO) {
      return
    }

    const scaleFactor = this.exportScale

    this.canvas.nativeElement.width = this.baseWidth * scaleFactor
    this.canvas.nativeElement.height = this.baseHeight * scaleFactor
    this.canvas.nativeElement.style.width = `${this.baseWidth}px`
    this.canvas.nativeElement.style.height = `${this.baseHeight}px`

    ctx.setTransform(ONE, ZERO, ZERO, ONE, ZERO, ZERO)
    ctx.scale(scaleFactor, scaleFactor)

    const lats = coords.map((c) => c[ZERO])
    const lngs = coords.map((c) => c[ONE])
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    const width = this.baseWidth
    const height = this.baseHeight

    const scaleX = width / (maxLng - minLng)
    const scaleY = height / (maxLat - minLat)
    const scale = Math.min(scaleX, scaleY) * ZERO_POINT_NINE

    const offsetX = (width - (maxLng - minLng) * scale) / TWO
    const offsetY = (height - (maxLat - minLat) * scale) / TWO

    ctx.clearRect(ZERO, ZERO, width, height)
    ctx.beginPath()
    coords.forEach(([lat, lng], i) => {
      const x = (lng - minLng) * scale + offsetX
      const y = height - ((lat - minLat) * scale + offsetY)
      if (i === ZERO) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.strokeStyle = this.lineColor
    ctx.lineWidth = TWO
    ctx.stroke()
  }
}

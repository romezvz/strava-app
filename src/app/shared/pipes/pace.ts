import { Pipe, PipeTransform } from '@angular/core'
import { SIXTY, THREE_POINT_SIX, TWO } from '@shared/constants/global.constants'

@Pipe({ name: 'pace' })
export class PacePipe implements PipeTransform {
  transform(speedMps: number | null | undefined): string {
    if (!speedMps) {
      return ''
    }
    const kmh = speedMps * THREE_POINT_SIX
    const minPerKm = SIXTY / kmh
    const minutes = Math.floor(minPerKm)
    const seconds = Math.round((minPerKm - minutes) * SIXTY)
    return `${minutes}:${seconds.toString().padStart(TWO, '0')}`
  }
}

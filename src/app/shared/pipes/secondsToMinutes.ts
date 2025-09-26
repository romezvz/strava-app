import { Pipe, PipeTransform } from '@angular/core'
import { SIXTY, THREE_THOUSAND_SIX_HUNDRED, TWO, ZERO } from '@shared/constants/global.constants'

@Pipe({
  name: 'secondsToMinutes'
})
export class SecondsToMinutesPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || value < ZERO) {
      return '0:00'
    }

    const hours = Math.floor(value / THREE_THOUSAND_SIX_HUNDRED)
    const minutes = Math.floor((value % THREE_THOUSAND_SIX_HUNDRED) / SIXTY)
    const seconds = Math.floor(value % SIXTY)

    const pad = (n: number) => n.toString().padStart(TWO, '0')

    if (hours > ZERO) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`
    }
    return `${minutes}:${pad(seconds)}`
  }
}

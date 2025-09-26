import { Pipe, PipeTransform } from '@angular/core'
import { THOUSAND, TWO } from '@shared/constants/global.constants'

@Pipe({
  name: 'metersToKm'
})
export class MetersToKmPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) {
      return ''
    }
    const km = value / THOUSAND
    return km.toFixed(TWO)
  }
}

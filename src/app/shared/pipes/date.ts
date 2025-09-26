import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stravaDate'
})
export class StravaDatePipe implements PipeTransform {
  transform(
    dateStr: string | null | undefined,
    locale = 'es-ES',
    timeZone = 'Europe/Madrid'
  ): string {
    if (!dateStr) {
      return ''
    }

    const date = new Date(dateStr)

    // Hora y minutos
    const hours = date.toLocaleString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone
    })

    // Día de la semana
    const weekday = date.toLocaleString(locale, { weekday: 'long', timeZone })

    // Día, mes y año
    const day = date.toLocaleString(locale, { day: 'numeric', timeZone })
    const month = date.toLocaleString(locale, { month: 'long', timeZone })
    const year = date.toLocaleString(locale, { year: 'numeric', timeZone })

    return `${hours} del ${weekday}, ${day} de ${month} de ${year}`
  }
}

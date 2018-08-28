import moment from 'moment'

export function ago (date, locale) {
  moment.locale(locale)
  return moment(date).fromNow()
}

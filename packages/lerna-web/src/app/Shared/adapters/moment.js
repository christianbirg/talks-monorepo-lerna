import 'moment/locale/de'
import moment from 'moment'

export const DEFAULT_DATE_PRINT_FORMAT = 'DD.MM.YY'
export const INPUT_DATE_TYPE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATE_INPUT_FORMAT = 'DD.MM.YY HH:mm:ss'
export const NO_DATE_PROVIDED_STRING = { VISIBLE: '-- no value --', INVISIBLE: '' }

export const formatDate = ({
  date,
  format = DEFAULT_DATE_PRINT_FORMAT,
  inputFormat = DEFAULT_DATE_INPUT_FORMAT,
  emptyString = NO_DATE_PROVIDED_STRING.VISIBLE
}) => {
  return validateDate(date)
    ? createDateObject(date, inputFormat, emptyString).format(format)
    : emptyString
}

export const subtract = ({
  date,
  subtractValue,
  subtractUnit,
  inputFormat = DEFAULT_DATE_INPUT_FORMAT,
  format = DEFAULT_DATE_PRINT_FORMAT,
  emptyString = NO_DATE_PROVIDED_STRING.VISIBLE
}) => {
  return validateDate(date)
    ? moment(date, inputFormat)
      .subtract(subtractValue, subtractUnit)
      .format(format)
    : emptyString
}

export const createDateObject = (
  date,
  format = DEFAULT_DATE_INPUT_FORMAT,
  emptyString = NO_DATE_PROVIDED_STRING.VISIBLE
) => {
  return validateDate(date) ? moment(date, format) : emptyString
}

export const validateDate = (date: any) => {
  return date !== '' && date !== null && date !== false && date !== undefined
}

export const getNow = () => moment()

export const getUTC = (date, inputFormat = DEFAULT_DATE_INPUT_FORMAT) =>
  moment(date, inputFormat).utc()

export const diffDates = (
  date,
  inputFormat = DEFAULT_DATE_INPUT_FORMAT,
  diffDate = getNow(),
  unit = UNITS_OF_TIME_KEYWORDS.DAYS
) => {
  return moment(date, inputFormat).diff(diffDate, unit)
}

export const isDateBefore = (compareDate, compareDateFormat = DEFAULT_DATE_INPUT_FORMAT) => {
  return (dateBefore, dateBeforeFormat = DEFAULT_DATE_INPUT_FORMAT) => {
    return moment(dateBefore, dateBeforeFormat).isBefore(moment(compareDate, compareDateFormat))
  }
}

// see https://momentjs.com/docs/#/get-set/weekday/
const WeekdayCount = 4 // the first five weekdays (excluding the weekends)
export const isWeekendDay = (date) => accessDatePart(date, DATE_PARTS.WEEKDAY) > WeekdayCount
export const accessDatePart = (date, part) => {
  switch (part) {
    case DATE_PARTS.WEEKDAY:
      return moment(date).weekdays()
  }
}

export const UNITS_OF_TIME_KEYWORDS = {
  YEARS: 'y',
  QUARTERS: 'Q',
  MONTHS: 'M',
  WEEKS: 'w',
  DAYS: 'd',
  HOURS: 'h',
  MINUTES: 'm',
  SECONDS: 's',
  MILLISECONDS: 'ms'
}

// export const DATE_FORMATS = {
//   L: 'L'
// }

export const DATE_PARTS = {
  MILLISECOND: 1,
  MILLISECONDS: 1,
  SECOND: 2,
  SECONDS: 2,
  MINUTE: 3,
  MINUTES: 3,
  HOUR: 4,
  HOURS: 4,
  DATE: 5,
  DATES: 5,
  DAY: 6,
  DAYS: 6,
  WEEKDAY: 7,
  ISO_WEEKDAY: 8,
  DAY_OF_YEAR: 9,
  WEEK: 10,
  WEEKS: 10,
  ISO_WEEK: 11,
  MONTH: 12,
  MONTHS: 12,
  QUARTER: 13,
  YEAR: 14,
  YEARS: 14,
  ISO_WEEK_YEAR: 15,
  WEEKS_IN_YEAR: 16,
  ISO_WEEKS_IN_YEAR: 17
}

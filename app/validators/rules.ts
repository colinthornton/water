import vine from '@vinejs/vine'

export const divisibleBy = vine.createRule<number>((value, divisor, field) => {
  if (typeof value !== 'number') return
  if (value % divisor === 0) return
  field.report(`The {{ field }} field is not divisible by ${divisor}`, 'step', field)
})

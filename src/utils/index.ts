import { colorTypes } from 'colorTypes'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getTypeColor(type: string): string {
  const foundType = colorTypes.find((item) => item.name === type)
  return foundType?.color || ''
}

export function timeout(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

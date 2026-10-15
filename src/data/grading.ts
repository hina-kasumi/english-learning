import type { Exercise } from './grammar'

export function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim()
}

export function answerText(value: string) {
  return normalize(value).replace(/[.!?]+$/g, '').replace(/\s+/g, ' ')
}

export function acceptsFillAnswer(exercise: Extract<Exercise, { type: 'fill' }>, answer: string) {
  return exercise.answers.some((expected) => answerText(expected) === answerText(answer))
}

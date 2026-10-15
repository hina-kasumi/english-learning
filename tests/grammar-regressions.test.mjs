import assert from 'node:assert/strict'
import test from 'node:test'
import { lessonById, lessons, validateContent } from '../src/data/grammar.ts'
import { acceptsFillAnswer } from '../src/data/grading.ts'

function exerciseFor(lessonId, type, promptPart) {
  const exercise = lessonById[lessonId].exercises.find(
    (item) => item.type === type && item.prompt.includes(promptPart),
  )
  assert.ok(exercise, `Missing ${type} exercise in ${lessonId}: ${promptPart}`)
  return exercise
}

test('GR-001: both taught subjunctive forms are graded correct', () => {
  const lesson = lessonById['wish-subjunctive']
  const exercise = exerciseFor(lesson.id, 'fill', 'They suggested that he')
  assert.match(lesson.structure, /\(should\) V/)
  assert.match(lesson.uses.join(' '), /should \+ V/)
  assert.equal(acceptsFillAnswer(exercise, 'be'), true)
  assert.equal(acceptsFillAnswer(exercise, 'should be'), true)
  assert.equal(acceptsFillAnswer(exercise, ' SHOULD   BE. '), true)
  assert.equal(acceptsFillAnswer(exercise, 'was'), false)
})

test('GR-002: the ongoing dinner is interrupted, so the target answer has context', () => {
  const exercise = exerciseFor('past-continuous', 'fill', 'dinner')
  assert.match(exercise.prompt, /lights went out.*interrupting our meal/i)
  assert.match(exercise.explanation, /cắt ngang.*đang diễn ra/i)
  assert.equal(acceptsFillAnswer(exercise, 'were having'), true)
  assert.equal(acceptsFillAnswer(exercise, 'had'), false)
})

test('GR-003: neutral subject question is separated from emphatic do-support', () => {
  const exercise = exerciseFor('questions', 'choice', 'Ai đã gọi bạn?')
  assert.match(exercise.prompt, /trung tính.*không nhấn mạnh/i)
  assert.equal(exercise.options[exercise.answer], 'Who called you?')
  assert.ok(exercise.options.includes('Who did call you?'))
  assert.match(exercise.explanation, /Who did call you\? vẫn đúng khi muốn nhấn mạnh/i)
})

test('GR-004: only is taught with scope context and the choice has one clear target', () => {
  const lesson = lessonById['adverb-position']
  const teaching = [lesson.overview, ...lesson.uses, ...lesson.examples.map(([, vi]) => vi), lesson.summary].join(' ')
  assert.match(teaching, /trọng âm/i)
  assert.match(teaching, /ngữ cảnh/i)
  assert.match(teaching, /Đặt only sát phần muốn giới hạn thường giúp/i)

  const choice = exerciseFor(lesson.id, 'choice', 'người duy nhất')
  assert.match(choice.prompt, /không cần dựa vào trọng âm/i)
  assert.equal(choice.options[choice.answer], 'I told only Mai the news.')
  assert.ok(!choice.options.includes('I only told Mai the news.'))
  assert.match(choice.explanation, /First chỉ thứ tự; only the news giới hạn nội dung/i)

  const scope = exerciseFor(lesson.id, 'choice', 'I only told Mai the news')
  assert.match(scope.prompt, /không biết trọng âm hay ngữ cảnh/i)
  assert.match(scope.options[scope.answer], /có thể thay đổi/i)
  assert.match(scope.explanation, /trọng âm và ngữ cảnh/i)
})

test('lesson inventory and references remain valid', () => {
  assert.equal(lessons.length, 66)
  assert.equal(lessons.reduce((total, lesson) => total + lesson.exercises.length, 0), 204)
  assert.deepEqual(validateContent(), [])
})

import assert from 'node:assert/strict'
import test from 'node:test'
import { lessonById, lessons, validateContent } from '../src/data/grammar.ts'
import { acceptsFillAnswer, answerText } from '../src/data/grading.ts'

const selectedIds = [
  'present-perfect-form', 'present-perfect-vs-past', 'future-forms',
  'relative-clauses', 'adverbial-clauses', 'conditionals-basic',
  'conditionals-unreal', 'wish-subjunctive', 'modal-perfect', 'stative-verbs',
]

function question(id, number) {
  const exercise = lessonById[id].exercises[number - 1]
  assert.ok(exercise, `${id}#${number}`)
  return exercise
}

function selectedChoice(id, number) {
  const exercise = question(id, number)
  assert.equal(exercise.type, 'choice', `${id}#${number}`)
  return exercise.options[exercise.answer]
}

test('R3 inventory: ten priority lessons now contain 36 questions, six more than Round 2', () => {
  assert.equal(lessons.length, 66)
  assert.equal(lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0), 204)
  assert.equal(selectedIds.reduce((sum, id) => sum + lessonById[id].exercises.length, 0), 36)
  assert.deepEqual(validateContent(), [])
})

test('R3: changed questions target the taught meaning and keep an unambiguous answer', () => {
  assert.match(selectedChoice('present-perfect-form', 1), /has broken her phone/)
  assert.match(question('present-perfect-form', 1).prompt, /hiện chưa dùng được/)
  assert.match(selectedChoice('future-forms', 1), /going to rain soon/)
  assert.match(selectedChoice('future-forms', 2), /I'm meeting Hoa tomorrow/)
  assert.match(selectedChoice('future-forms', 4), /train leaves at seven/)
  assert.match(selectedChoice('adverbial-clauses', 3), /so that everyone could understand/)
  assert.match(selectedChoice('wish-subjunctive', 4), /wish they would turn/)
  assert.match(selectedChoice('modal-perfect', 4), /could have gone/)
  assert.match(question('modal-perfect', 4).prompt, /không nhất thiết đánh giá việc ở nhà là sai/)
})

test('R3: new and revised fill answers are accepted, while distinct meanings are rejected', () => {
  const ongoing = question('present-perfect-vs-past', 3)
  const thought = question('stative-verbs', 3)
  const unreal = question('conditionals-unreal', 4)
  const possession = question('relative-clauses', 3)
  for (const exercise of [ongoing, thought, unreal, possession]) assert.equal(exercise.type, 'fill')
  assert.equal(acceptsFillAnswer(ongoing, ' HAS  BEEN. '), true)
  assert.equal(acceptsFillAnswer(ongoing, 'was'), false)
  assert.equal(acceptsFillAnswer(thought, 'am thinking'), true)
  assert.equal(acceptsFillAnswer(thought, 'think'), false)
  assert.equal(acceptsFillAnswer(unreal, 'were'), true)
  assert.equal(acceptsFillAnswer(unreal, 'was'), false)
  assert.equal(acceptsFillAnswer(possession, 'whose'), true)
  assert.equal(acceptsFillAnswer(possession, 'who'), false)
})

test('R3: guided sentence reconstruction uses each supplied token and grades the intended order', () => {
  for (const [id, number, expected, order] of [
    ['relative-clauses', 4, 'The book I bought yesterday is excellent', [3, 1, 4, 0, 2]],
    ['conditionals-basic', 4, 'If you finish early, you can leave', [2, 1, 3, 4, 0]],
  ]) {
    const exercise = question(id, number)
    assert.equal(exercise.type, 'order')
    assert.equal(answerText(exercise.answer), answerText(expected))
    assert.equal(answerText(order.map((index) => exercise.words[index]).join(' ')), answerText(expected))
    assert.notEqual(answerText(exercise.words.join(' ')), answerText(expected))
    assert.equal(new Set(order).size, exercise.words.length)
  }
})

test('R3: the taught lesson text supports every newly practised form', () => {
  const targets = [
    ['future-forms', /lịch trình cố định/],
    ['relative-clauses', /lược đại từ quan hệ/],
    ['adverbial-clauses', /so that/],
    ['conditionals-basic', /can, may, mệnh lệnh/],
    ['conditionals-unreal', /Were/],
    ['wish-subjunctive', /Wish \+ would/],
    ['modal-perfect', /Could have/],
    ['stative-verbs', /think/],
  ]
  for (const [id, pattern] of targets) {
    assert.match(lessonById[id].uses.join(' '), pattern, id)
  }
})

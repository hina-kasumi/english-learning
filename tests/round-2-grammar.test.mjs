import assert from 'node:assert/strict'
import test from 'node:test'
import { lessonById, lessons, roadmap, validateContent } from '../src/data/grammar.ts'
import { acceptsFillAnswer } from '../src/data/grading.ts'

function question(id, number) {
  return lessonById[id].exercises[number - 1]
}

test('R2: specific past success accepts both taught expressions', () => {
  const exercise = question('modal-ability', 3)
  assert.equal(exercise.type, 'fill')
  assert.equal(acceptsFillAnswer(exercise, 'were able'), true)
  assert.equal(acceptsFillAnswer(exercise, 'managed'), true)
  assert.equal(acceptsFillAnswer(exercise, 'could'), false)
})

test('R2: former open answers now have an explicit target', () => {
  for (const id of ['nouns-countability', 'quantifiers', 'past-perfect', 'modal-obligation', 'linking-ideas', 'punctuation']) {
    const exercise = question(id, 3)
    assert.equal(exercise.type, 'choice', id)
    assert.ok(exercise.options[exercise.answer], id)
  }
  assert.match(question('present-perfect-continuous', 3).prompt, /still raining/)
  assert.match(question('future-continuous-perfect', 1).prompt, /hoàn tất trước 12 giờ trưa/)
  assert.match(question('past-continuous', 1).prompt, /chen ngang lúc tôi đang xem TV/)
  assert.match(question('punctuation', 1).prompt, /hai mệnh đề độc lập/)
  assert.ok(question('punctuation', 1).options.every((option) => option !== 'I was late, ran.'))
})

test('R2: targeted practice now covers missing central forms', () => {
  const targets = [
    ['future-continuous-perfect', 3, 'will have been working'],
    ['past-habits', 2, 'would visit'],
    ['conditionals-unreal', 3, 'would be a doctor now'],
    ['participle-clauses', 2, 'Having finished'],
    ['passive-advanced', 3, 'is said to be honest'],
    ['causative', 2, 'to help me'],
    ['reported-speech', 3, 'said she was tired'],
    ['nominalisation', 3, 'The decision to expand'],
  ]
  for (const [id, number, phrase] of targets) {
    const exercise = question(id, number)
    const expected = exercise.type === 'choice' ? exercise.options[exercise.answer] : exercise.answers.join(' ')
    assert.ok(expected.includes(phrase), `${id}#${number} should practice ${phrase}`)
  }
})

test('R2: roadmap introduces declared prerequisites before their first dependent lesson', () => {
  const firstPosition = new Map()
  roadmap.forEach((stage, stageIndex) => stage.lessonIds.forEach((id, lessonIndex) => {
    if (!firstPosition.has(id)) firstPosition.set(id, [stageIndex, lessonIndex])
  }))
  assert.equal(firstPosition.size, lessons.length)
  for (const lesson of lessons) {
    const current = firstPosition.get(lesson.id)
    for (const prerequisite of lesson.prerequisites) {
      const before = firstPosition.get(prerequisite)
      assert.ok(before[0] < current[0] || (before[0] === current[0] && before[1] < current[1]), `${prerequisite} should precede ${lesson.id}`)
    }
  }
  assert.deepEqual(validateContent(), [])
})

test('R2: all current exercises have answers that the available grader can accept', () => {
  assert.equal(lessons.length, 66)
  assert.equal(lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0), 204)
  for (const lesson of lessons) {
    lesson.exercises.forEach((exercise, index) => {
      const location = `${lesson.id}#${index + 1}`
      assert.ok(exercise.explanation.trim(), location)
      if (exercise.type === 'choice') assert.ok(exercise.options[exercise.answer], location)
      if (exercise.type === 'fill') {
        for (const answer of exercise.answers) assert.equal(acceptsFillAnswer(exercise, answer), true, location)
      }
      if (exercise.type === 'order') assert.ok(exercise.answer.trim(), location)
    })
  }
})

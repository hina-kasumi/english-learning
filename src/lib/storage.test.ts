import { describe, it, expect } from 'vitest'
import { initialData, makeBackup, migrateStorage, parseBackup } from './storage'
describe('Storage migrations and backup boundaries', () => {
  it('migrates version 0 without losing notes, bookmarks or read markers', () => {
    const data = migrateStorage(
      { completedLessons: ['L0-01'], notes: { 'L0-01': 'Ghi chú' }, bookmarks: ['L0-01'] },
      0,
    )
    expect(data.readLessons).toEqual(['L0-01'])
    expect(data.notes['L0-01']).toBe('Ghi chú')
    expect(data.settings.translations).toBe(true)
  })
  it('round-trips current backups', () => {
    const data = initialData()
    data.settings.theme = 'dark'
    data.notes['L0-01'] = 'Tiếng Việt: ă â ê ơ ư'
    expect(parseBackup(makeBackup(data))).toEqual(data)
  })
  it('rejects foreign, future and corrupt data', () => {
    expect(() => parseBackup('{bad')).toThrow()
    expect(() => parseBackup(JSON.stringify({ app: 'another', version: 1, data: {} }))).toThrow()
    expect(() => migrateStorage({}, 2)).toThrow()
    expect(() =>
      parseBackup(JSON.stringify({ app: 'gramio', version: 1, data: { settings: { rate: 30 } } })),
    ).toThrow()
  })
  it('never exports store methods or runtime error messages', () => {
    const saved = JSON.parse(
      makeBackup({ ...initialData(), storageError: 'temporary', setSettings: () => {} }),
    )
    expect(saved.data.storageError).toBeUndefined()
    expect(saved.data.setSettings).toBeUndefined()
  })
})

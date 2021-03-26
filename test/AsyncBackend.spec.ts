import i18next from 'i18next'
import AsyncBackend, { AsyncBackendOptions } from '../src'

async function init(ns: string[], resources: AsyncBackendOptions['resources']) {
  const i18n = i18next.createInstance().use(AsyncBackend)

  const t = await i18n.init({
    backend: { resources },
    fallbackLng: 'en',
    defaultNS: ns[0],
    ns,
  })

  return { i18n, t }
}

it('should accept a function if there is only one namespace', async () => {
  const { t } = await init(['translation'], {
    en: () => Promise.resolve({ foo: 'bar' }),
  })

  expect(t('foo')).toBe('bar')
})

it('should accept an object if there are multiple namespaces', async () => {
  const { t } = await init(['ns1', 'ns2'], {
    en: {
      ns1: () => Promise.resolve({ fruit: 'Apples' }),
      ns2: () => Promise.resolve({ fruit: 'Oranges' }),
    },
  })

  expect(t('fruit')).toBe('Apples')
  expect(t('ns1:fruit')).toBe('Apples')
  expect(t('ns2:fruit')).toBe('Oranges')
})

it('should load multiple languages', async () => {
  const { t, i18n } = await init(['ns1', 'ns2'], {
    en: {
      ns1: () => Promise.resolve({ fruit: 'Apples' }),
      ns2: () => Promise.resolve({ fruit: 'Oranges' }),
    },
    es: {
      ns1: () => Promise.resolve({ fruit: 'Manzanas' }),
      ns2: () => Promise.resolve({ fruit: 'Naranjas' }),
    },
  })

  // English
  expect(t('fruit')).toBe('Apples')
  expect(t('ns1:fruit')).toBe('Apples')
  expect(t('ns2:fruit')).toBe('Oranges')

  // Spanish
  await i18n.changeLanguage('es')
  expect(t('fruit')).toBe('Manzanas')
  expect(t('ns1:fruit')).toBe('Manzanas')
  expect(t('ns2:fruit')).toBe('Naranjas')
})

import { BackendModule, ReadCallback, Services } from 'i18next'

type ResourceFetcher = () => Promise<{
  __esModule?: true
  default?: Record<string, unknown>
  [key: string]: unknown
}>

export interface AsyncBackendOptions {
  resources?: {
    [language: string]: ResourceFetcher | Record<string, ResourceFetcher>
  }
}

export default class AsyncBackend
  implements BackendModule<AsyncBackendOptions>
{
  // i18next is dumb as TypeScript requires the class property for `type`
  // but the runtime requires the static `type` property.
  static type = 'backend'
  type = 'backend' as const

  private options: AsyncBackendOptions = null!

  constructor(services: Services, options: AsyncBackendOptions) {
    this.init(services, options)
  }

  init(_: Services, options: AsyncBackendOptions): void {
    this.options = { ...this.options, ...options }
  }

  read(lng: string, ns: string, callback: ReadCallback): void {
    const resourceFetcher = this.getResourceFetcher(lng, ns)

    if (resourceFetcher) {
      resourceFetcher()
        .then((res) => callback(null, res.__esModule ? res.default : res))
        .catch((err) => callback(err, false))
    } else {
      callback(new Error('resource not found'), false)
    }
  }

  private getResourceFetcher(lng: string, ns: string) {
    // Languages can specify a function if they only have a single namespace
    // or an object if they have multiple namespaces.
    const fetcher = this.options.resources?.[lng]

    return typeof fetcher === 'function' ? fetcher : fetcher?.[ns]
  }
}

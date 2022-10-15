import { InertiaForm } from "@inertiajs/inertia-vue3"
import { useDebounceFn } from "@vueuse/core"

interface Options {
  debounce: number
}

export const useValidate = <T extends { [key: string]: any }>(
  form: InertiaForm<T>,
  url: string,
  options?: Options
) => {
  const preserveErrors: Array<string | number | symbol> = []

  return useDebounceFn((param?: keyof T) => {
    if (param && !preserveErrors.includes(param)) {
      preserveErrors.push(param)
    }

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      headers: {
        "X-Inertia-Preflight": "true",
      },
      onStart: () => (form.processing = false),
      onError: () => {
        const extraErrors = Object.keys(form.errors).filter((key) => !preserveErrors.includes(key))

        form.clearErrors(...extraErrors, "_")
      },
    })
  }, options?.debounce ?? 0)
}

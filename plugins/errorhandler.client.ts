export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('vue:error', (error, instance, info) => {
    console.error('[Vue Error]', error)
    console.error('Component instance:', instance)
    console.error('Info:', info)
    console.error('--------------')
  })

  nuxtApp.hooks.hook('app:error', (error) => {
    console.log('APP ERROR ', error)
    console.error('--------------')
  })
})

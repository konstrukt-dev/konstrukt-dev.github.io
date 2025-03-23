// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/css/global.css"],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiBase: "/data"
    }
  },
  app: {
    baseURL: '/'
  },
  modules: ["@pinia/nuxt"],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      ignore: ["/api", "/server", "/backend"] // ignore API routes
    }
  }
})

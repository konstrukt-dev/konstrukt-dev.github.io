import { UAParser } from 'ua-parser-js'

export default defineNuxtPlugin((nuxtApp) => {
    const parser = new UAParser(navigator.userAgent)
    const result = parser.getResult()

    const isMobile = result.device.type === 'mobile';
    const isTablet = result.device.type === 'tablet';

    return {
        provide: {
            ua: {
                isMobile,
                isTablet,
                result,
            },
        },
    }
})
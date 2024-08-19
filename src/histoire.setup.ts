// src/histoire.setup.ts

import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import TodayUI from './index'

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
    const pinia = createPinia()
    app.use(pinia) // Add Pinia store
    app.use(TodayUI) // Add TodayUI plugin
})


import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { VBtn } from "vuetify/components/VBtn";
import { ar } from "vuetify/locale";
import "vuetify/styles";
// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
      primary: "#835400",
      secondary: "#EBE1D9",
      info: "#2196F3",
      background: "#FFFFFF",
      surface: "#FFFFFF",  
      "primary-darken-1": "#3700B3",
      "secondary-darken-1": "#018786",
      error: "#B00020",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  };

const vuetify = createVuetify({
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
    locale: {
      locale: "ar",
      messages: { ar },
    },
    // date: {
    //   adapter: DateFnsAdapter,
    //   locale: {
    //     // en: enUS,
    //     ar: ar
    //   },
    // },
    aliases: {
      MyButton: VBtn,
    },
    defaults: {
      VBtn: {
        variant: "flat",
        class: "text-none",
      },
      MyButton: { variant: "tonal" },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  export default vuetify;
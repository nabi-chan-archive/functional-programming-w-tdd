import i18n from "i18next";
import Detector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { config } from "utils/config";

const HOST = config().API_HOST || "";

i18n
  .use(Backend)
  .use(Detector)
  .use(initReactI18next)
  .init({
    lng: "ko",
    fallbackLng: "ko",
    ns: "common",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${HOST}/translation/{{lng}}/{{ns}}.json`,
      addPath: `${HOST}/translation/add/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;

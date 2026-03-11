#!/bin/bash
cd /home/nacho/Escritorio/PROGRAMACION/bailemos-front/
ionic build
npx cap sync
cd /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android
./gradlew clean
./gradlew assembleRelease
cd /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android/app/build/outputs/apk/release/
apksigner sign --ks /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android/app/KEY_beatflow_app.jks --out /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android/app/build/outputs/apk/release/app-release-singed.apk /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android/app/build/outputs/apk/release/app-release.apk
#KEY_beatflow_app
#beatflow_app

npx cap open android
adb install -r /home/nacho/Escritorio/PROGRAMACION/bailemos-front/android/app/build/outputs/apk/release/app-release-singed.apk

#adb shell am start -a android.intent.action.VIEW   -d "https://beatflow-bo.vercel.app/home/event-detail/6888bf06141a4ea09c8bd7fa"   devia.ia.beatflow

#adb install -r /ruta_apk_/app-release-singed.apk
# rnzip

react-native-project-zip

## Splash Scrren

1. ios

[ios](https://velog.io/@2ast/React-Native-ios-app-icon%EA%B3%BC-splash-screen-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

### crashlytics

yarn add @react-native-firebase/crashlytics

## react-native CLI 설정 (M1 mac)

1. homebrew 설치 / xcode 설치 / androidstudio 설치
2. arch -arm64 brew install node
3. arch -arm64 brew install watchman
4. arch -arm64 brew install ruby
5. arch -arm64 brew install ruby-build
6. arch -arm64 brew install rbenv
7. rbenv install 2.7.5
8. xcode -> Preferences -> Locations -> Command Line Tools 설정 확인
9. androidstudio -> Preferences -> Android SDK -> Android SDK Location -> path 복사
10. 터미널 -> open ~/.zshrc 입력
11. 다음과 같이 입력

  ```js
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

12. 터미널 -> touch ~/.zshrc 입력
13. adb 입력 -> 잘나오면 제대로 설치된 것

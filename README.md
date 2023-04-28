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

## React-Native dependency manager

- Gradle

1. android/build.gradle은 최상위에서 모든 하위 프로젝트 모듈에 공통적인 구성옵션을 추가하기 위한 파일. 예를 들면 코틀린의 버젼이 각각 모듈별로 다른버전을 사용하면 안되는데, 각각의 문법이나 버전이 다를 수 있기에 이런 것을 한곳에서 공통으로 다뤄주는것.
2. android/app/build.gradle은 우리가 작성하는 앱의 build.gradle이다. 이 파일 내부에는 어떤 Dependency를 사용할 것인지에 대해 정의한다.

- cocoapods

1. gradle의 ios버전. ios 프로젝트 내부에서 Dependency 관리를 위한 tool. ios 폴더 하위 Podfile.

## Flipper

- 2020년도 발표된 모바일 디버깅 툴.
- React-Native 0.62버전부터 기본으로 내장되어 사용.

- Layout Inspector 를 통해 현재 View의 상태를 바로 알 수 있다.
- React Dev Tools로 Layout Inspector에서 제공하는 기능에 state를 더해 볼 수 있다.
- Images로 현재 화면에 보이고 있는 이미지가 나열 됨 (Android 제공)
- Databases로 모바일 환경에서의 Database가 어떻게 구성 되어 있는지 제공.
- Setup Doctor로 동작을 제대로 안하는 경우에 점검 가능.

## 안드로이드 Application에서 전체 앱 상태를 관리하는 class

- Event를 전달하기 위한 함수를 제공

1. onCreate: 어플리케이션이 실행될 때 최초에 호출
2. onTerminate: 어플리케이션이 종료될때 호출

## AndroidManifest

- 안드로이드에서 앱의 모든 정보를 요약해서 선언 해 둔 것
- 권한, 이름, 패키지명 등 앱의 전반적인 내용들을 담고 있음.

## 안드로이드 Activity

- 안드로이드에서 화면을 구성 하는 요소
- 유저가 직접 보고, 누르는 등의 액션이 발생됨
- 안드로이드의 4구성 요소 (activity, service, receiver, content provider)

- Intent란,

  1. 어떠한 Activity를 호출할 때 사용하는 것
  2. 매개변수와 함께 보내는것
  3. navigation을 이동했던것과 비슷한 형태

- Activity Life-cycle

  - onCreate -> onResume -> onPause -> onDestroy

- Intent-Filter란,
  1. Intent를 실행 시킬 때 어떤 종류의 activity인지를 빠르게 찾기 위한 수단
  2. Action: activity가 어떤 행동에 유효한 것인지 나타내는 값 (ex. SEND등)
  3. Category: 어떤 종류의 액티비티 인지를 나타내는 값
  4. - ACTION_MAIN : 앱의 시작점. 홈화면에 아이콘이 만들어짐
     - ACTION_SEND : 공유하기 액션등이 필요할때 사용됨
     - ACTION_DIAL : 전화번호 폰 패드와 같은 화면이 필요할 때 사용됨

## IOS - AppDelegate

- Android에서 activity처럼 화면을 구성 하는 단위
- 각각 앱의 상태에 따라 불려지게 되는 함수가 있음

- Not running -> Inactive -> Active -> Background -> Suspended

- didFinishLaunchingWithOptions는 앱이 최초 실행될때 호출되는 함수이다. (like android application onCreate)

## IOS - Info.plist

- like android AndroidManifest
- 권한, 앱의 이름, 실행시 주로 필요한 값들을 관리 해주는 파일
- SDK API Key값, 권한 요청시 텍스트 등 값을 관리

## IOS - Build Phase

- 앱을 실행 시킴에 있어 필요한 값들을 자동으로 설정하도록 Command로 모두 선언해둔 것

## Permissions

- 특정 리소스를 필요로 할 때 사용자에게 허용 할것인지 물어보는 것

- 권한 획득 과정

  - IOS

    1. 해당 기기에서 사용 가능한지 확인해서 불가능하면 권한체크의값이 unavailable 으로 나오게된다.
    2. 해당 기기에서 가능하면 이 후 권한요청이 가능한지에 대해 체크한다. ios에서는 최초 1회를 물어보게 되면 앱을 삭제하고 다시설치하지 않는이상 다시 물어볼 수 있는 수단이 없음. 권한요청이 가능한 상태이면 denyde 이고, 불가능하면 blocked, limited, granted 상태이다.
    3. 권한요청이 denyde 상태이면 유저에게 권한요청이 가능하고, 요청을 한뒤에는 결과에 따라서 granted(수락), blocked(거절)로 나뉘게 된다.
    4. limited상태는 주로 사진에 대한 권한을 얻을때 나오게 되는데 모든 사진이 아닌 제한된 사진의 권한을 얻을 때 이다.

  - Android
    1. 전체적인 흐름은 ios와 비슷하지만 1가지 다른 부분이 있다. 요청하고 난뒤 안드로이드는 한번더 요청할 수 있도록 열어놓을 수 있다.
    2. 다시묻지않기, 이번만허용등의 한번더 요청할 수 있도록 열어놓을 수 있다.

- iOS에서는 추가로 필요한 것이 Info.Plist에서 이 권한이 왜 필요한지에 대한 권한 요청문을 적어야 한다. 앱심사시에 꽤나 중요하다.

## Scheme

- 외부에서 우리 앱을 호출하거나, 우리 앱이 외부앱을 호출 하는 수단.
- 예를 들면 KB-PAY로 결제를 하고 돌아와야 할 때 사용.

- Scheme 정의 - Android : intent-filter를 통해서 정의한다.
- Scheme 정의 - ios : Info.plist -> URL Types에 저장.

- Scheme 테스트 하는법. uri-scheme packagef를 통하여 테스트

```
npx uri-scheme open "scheme://path" --ios
npx uri-scheme open "scheme://path" --android
```

## patch-package

1. 변경 원하는 라이브러리 node_modules에 찾아가서 변경
2. yarn patch-package babel-plugin-tailwind-rn
3. patch-package 파일 생성됨

## google signin

- cd android && ./gradlew signingReport && cd .. 로 SHA-1, SHA-256 값 알아내기.
- Firebase에 디지털 지문 추가해주기

## push Notification

- 서버에서 설치된 앱에 메시지를 전달하고, 앱에서 전달된 메시지를 보여주는것
- push : Message를 전달 하는 것
- Notification : Message를 보여 주는 것

- FCM의 동작 원리 (최초 생성)

  - 앱이 설치된 뒤 FCM에서 기기 식별이 가능한 Token 발급
  - 앱에서 필요 할때 조회할 수 있음
  - 발급된 Token을 별도의 DB에 저장

- FCM 동작 원리 (메시지 전달)

  - 별도로 저장된 DB의 값을 읽어와 FCM으로 전송 요청
  - FCM 내부 서버에서는 식별 가능한 기기로 FCM을 전송
  - 전송한 뒤 응답으로 Token에 전달 했는지 여부를 알 수 있음

- FCM 동작 원리 (기타)

  - 푸시 성공률 99%. 100% 보장은 아님
  - 방해금지 모드, sleep 모드로 빠질 경우 받지 못하기도 함
  - 발급받은 Token의 재발급 조건
    - 앱을 제거하고 재설치 하는 경우
    - 앱의 데이터를 지우는 경우
    - 새기기에서 앱이 복원되는 경우

- onTokenRefresh 이벤트로 바뀐 Token값을 알 수 있음

## APNS

- Apple Push Notification Service
- FCM과 전체적인 모습은 비슷 (Token 발급, 업데이트, 발송 등)
- Token 발급 과정 중 발급받는 APNs Token이 없을수도 있음 (푸시 허용 x)
- FCM을 통해 APNs로 접근이 가능
- 사실상 FCM을 통해 iOS에도 푸시를 보낼수 있는 구조.
- FCM만 잘 알면 양 플랫폼에 대한 푸시 발송 가능

- FCM에 APNs 설정 하는 방법
  - Apple Developer에서 발급 받은 인증서, 인증 키등을 FCM console에서 설정만 해주면 APNs이용 가능.

## Jest Deep Dive

1. Mocking

- 가짜 데이터를 만들어 사용하는 것
- ex. HTTP 요청시 특정 값을 Response로 지정.

- without Mocking
  - Mocking 없이 Test를 돌리게 된다면, 실제로 서버로 요청이 가게됨
  - 인증이 필요 없는 API는 문제 없이 동작
  - 인증이 필요 한 API는 요청 실패로 인한 failed
  - 인증이 필요한 API와, 아닌 API를 구분하여 각각 상황에 맞게 호출
  - 테스트를 위해 챙겨야 할 게 너무 많음
  - Native Module은 Native API를 사용하게 되어있음
  - Jest는 핸드폰이 아닌 Local PC 환경에서 실행 됨
  - Native API (위치, 카메라 등)를 사용하는 경우에는 무조건 failed 처리
  - 응답값을 별개로 선언하여 받기 때문에 인증여부와 상관없이 사용가능
  - API 요청시, 성공 또는 실패시에 대한 응답값 정의 가능
  - Native API 호출시에도 되돌려 받는 값을 정의 가능

2. spyOn

- 몰래 정보를 빼내오는 기능
- 함수가 호출 될 때 어떤 값과 함께 호출되었는지 파악 가능

## react-native-builder-bob

- react-native용 패키지를 손쉽게 만들 수 있도록 만든 Tool
- npm package를 만들기에는 많은 boilerplate발생
- 자동으로 생성되는것이 많아 손쉽게 시작 가능
- release-it등 패키지를 운영하면서 필요한것들이 모두 정의됨

- 프로젝트 생성
  - npx create-react-native-library@latest react-native-animation-container
  - cd react-native-animation-container
  - github에서 react-native-animation-container Repository생성 및 연결
  - 패키지에 사용되는 3rd-party 라이브러리를 peerDependencies에 추가해준다

# Chapter1 따라하기 With Typescript + eslint

- 복습을 위해서 Chapter 1을 따라서 만든다. 근데 그냥 따라하면 *what's the fun in that?* 그래서 Typescript로 포팅해서 따라 작성할 것이다.

- 학습 과정은 아래와 같다.

1. 처음엔 주어진 코드와 테스트 코드에서 시작한다.
2. **코드는 보지않고** git log의 message와 챕터의 제목을 보면서 리팩터링을 진행한다.
3. 만약 기억이 나지 않는다면 코드를 보면서, 책의 내용을 보면서 그 흐름을 따라간다.
* 2-3번 과정을 소챕터마다 반복한다.

# 환경 설정
Typescript를 사용하기 때문에 쓰는 김에 Eslint도 적용해서 진행한다.

## typescript 설정 방법

typescript에 대한 설명은 [공식홈페이지](https://www.typescriptlang.org)가 제일 정확하다. (반박시 타알못)

물론 요즘엔 typescript 관련 자료가 많아 굳이 공홈에서 힘들게 영어를 번역해가며 이해할 필욘 없다. MS의 [타입스크립트 웹사이트 프로젝트](https://github.com/microsoft/TypeScript-Website)의 [한글 번역 사이트](https://typescript-kr.github.io)가 제일 보기 좋아보인다. 그 외에도 [MS의 tutorial](https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/) 등이 있다.

### 설치
```shell
> npm install -g typescript
```

### typescript *컴파일*에 대한 설정 (tsconfig 생성)

```shell
> tsc --init
```
이러면 `tsconfing.json` 파일이 생성된 것을 볼 수 있다. 이 중 필요한 옵션만 키고 나머진 지워줘도 괜찮다. 이 프로젝트에선 아래와 같은 옵션을 사용할 것이다. (거의 디폴트다.)
```json
{
  "compilerOptions": {
    "target": "es5", // ECMAScript 버전 선택
    "module": "commonjs", // module code 생성을 어떤 방식으로 할건지: 'none', 'commonjs', 'amd', 'es2015',  등등
    "outDir": "./dist", // *컴파일*된 js 파일이 생성될 곳
    "strict": true,                                 
    "esModuleInterop": true,               
    "skipLibCheck": true,         
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["**/src/**.ts"],
  "exclude": ["**/**.md", "**/**.json"],
}
```

### 컴파일
```shell
> tsc
```
tsconfig.json에 맞춰서 잘 알아서 해준다.
typescript는 그 자체로는 node에서 안돌아간다. 빌드를 해줘야지만 돌아간다! 사실 이 부분은 상당히 많이 발전해온 부분 중 하나라 typescript runtime 을 찾아보면 재밌는 얘기가 많을 거다. 많은 사람들이 deno(node 개발자였던 라이언 달이 개발하는 런타임)에 대해 들어봤을거라 생각한다.
## ESLINT

코드는 컨벤션에 맞춰서 알잘딱하게 작성해야 제맛! 클린코드는 법은 아니지만 highly recommended다! eslint는 그걸 도와주는 참한 친구다.

### 설치
```shell
> npm install eslint --save-dev
```

### 설정

```shell
> npx eslint --init
```

//TODO: 내용 수정하기. eslint 적용부분 설정이 많이 바뀌어서 다시 적어야할 듯.


```shell

```

### 적용법
```shell
> npx eslint src/*.ts 

1:15  error  Strings must use singlequote                   quotes
1:22  error  Missing semicolon                              semi
4:1   error  Expected indentation of 2 spaces but found 4   indent
5:2   error  Newline required at end of file but not found  eol-last
```

이러면 문제점에 대해 알려준다. 이때 --fix 옵션을 주게된다면 수정가능한 문제에 대해선 자동으로 수정해주기까지 한다! (와우~). 
그치만 매번 이렇게 eslint를 실행시키는건 너무 귀찮다. 이럴 때 vscode를 쓰면 plugin이 다 잡아서 해준다. 참 살기 좋다. 물론 vscode뿐만아니라 webstorm도 plugin 깔면 다 가능하다.


## 테스트 만들기
js세상에선 테스트 관련 패키지들은 많다. mocha, jest, jasmine 등등. 나는 커피를 좋아하기 때문에 mocha를 사용할 것이다. 참고로 javascript는 한때 mocha라고 불렸던 적이 있다. (불렸다고 하기엔 조상라고 해야하려나...[영상자료](https://www.youtube.com/watch?v=Sh6lK57Cuk4))

### 설치
```shell
> npm i mocha @types/mocha -D
```

> mocha를 쓸 때 항상 같이 나오는 라이브러리가 chai이다. Mocha는 testing만 제공하고 assert는 제공하지 않는다. node 기본 제공을 사용하거나 추가적인 라이브러리를 설치해서 assertion을 해야하는데 mocha가 바로 a **BDD / TDD assertion** library 이기 때문에 같이 사용하는 경우가 많다. 여기선 BDD, TDD도 아니고 node assert로도 충분하기 때문에 chai는 설치하지 않았다.


### 테스트 실행
```shell
# 빌드! 또 빌드!
> npm run build  

# 그리고 나서 빌드된 js를 mocha로 실행
> npx mocha ./dist/main.spec.js  
```

그러면 TEST가 완료된 모습을 확인할 수 있다.
```shell
> npx mocha ./dist/main.spec.js   

helloWorld 함수 테스트
  ✔ 인자 없이 실행
  ✔ 인자 있이 실행
  ✔ 있는데 없는거랑 비교

3 passing (3ms)
```

### 빌드->테스트->빌드->테스트가 귀찮다면?
1. npm script에 두개를 합친(이미 build도 `rm -rf ./dist/* && tsc`이긴 하지만) script를 넣는다.
2. ts-node를 이용해서 typescript로부터 바로 mocha를 수행한다.

이 중 2번째 solution을 적용해보자.
`npm install ts-node -D`를 통해 ts-node를 설치한다.

> ts-node는 메모리상에서 트랜스파일링을 해서 node로 실행시켜준다.

그리고 test를 실행한다.
```shell
npx mocha src/*.spec.ts -r ts-node/register
```
#### 테스트 패턴

AAA(Arrange, Act, Assert) 패턴.
GWT(Given, When, Then) 패턴.
[차이](https://softwareengineering.stackexchange.com/questions/308160/differences-between-given-when-then-gwt-and-arrange-act-assert-aaa)
여기선 AAA 패턴 사용할 것!

# 들어가기

## 1.4 statement() 쪼개기
- **함수추출하기** statement 쪼개기 switch 문을 쪼갠다. => amountFor이란 함수로 추출해낸다.
- 함수추출할 땐 **임시 변수를 질의 함수로 바꾸기**를 주의하자. 필요없는 변수는 **인라인하기**로 감출 수 있다. => play 변수 없애고, thisAmount 변수도 없애자.
  - 지금은 성능은 우선 걱정하지말자. 깔끔한 코드가 성능 개선도 가능한 코드다!
- volumeCredit 변수도 함수로 추출하기
- 읽기 변하게 매개변수명, 내부 변수명 개명
- format 변수도 질의 함수로 바꿈
- volumeCredits 에 대해서 **반복문쪼개기** 와 **문장슬라이드**로 volumeCredits **함수추출하기**편하게 바꾼 뒤 추출해내 **임시 변수를 질의 함수로 바꾸기**를 진행한다.
- totalAmount도 위와 같이 처리한다.

## 1.6 계산 단계와 포맷팅 단계 분리하기
- **단계 쪼개기**: 여기선 계산 부분과 포맷팅 부분을 분리한다면, 포맷팅이 바뀌더라도 계산부분은 절대 바뀌지 않는다 :)
- 중간 데이터 구조를 활용해서 계산 관련 코드는 전부 statement()함수로 모으고 renderPlainText()는 data 매개변수로 전달된 데이터만 처리하게 만든다.
> 이부분은 typescript를 할 때는 단계별로 멤버 변수를 추가해주는 식으로 진행하면 된다.

> 책에서 독특했던 내용 중 하나는 performance를 data에 넣을 때 *얕은 복사*를 수행하는 것이다. 이 이유는 **마틴옹**은 함수로 건넨 데이터를 수정하기 싫기 때문이다. 가변(Mutable) 데이터는 금방
> 상하기 때문에 데이터는 최대한 불변(Immutable)하게 취급한다고 한다.
- performance 객체를 enrichPerformance(+amount, +play) 로 바꾼다. => amountFor과 playFor을 `renderPlainText()`에서 `statement()` 함수로 옮긴다고 생각하면 된다.

## 1.8 다형성을 활용해 계산 코드 재구성하기
- amountFor() 함수를 보면 연극 장르에 따라 계산 방식이 달라짐. 조건부 로직을 명확한 구조로 보완하는 방법은 다양하지만 여기선 다형성을 사용할 것
- **조건부 로직을 다형성으로 바꾸기**
- 우선은 SuperClass로 조건부 로직을 바꾼 뒤 **팩터리패턴**을 활용해서 SubClass를 이용한, 다형성을 활용한 코드로 재구성한다.

> 하는 도중 ES5에선 class의 getter/setter가 오버라이드될 때 제대로 super의 getter/setter를 가져오지 못하는 문제때문에 조금 헤맸다. 그냥 ES6로 올려서 해결했다.
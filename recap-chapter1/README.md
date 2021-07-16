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

나는 아래와 같은 설정으로 쓰는 편이다. 조금 강제적이긴 한데 별 신경안쓴다. 너무 제한적이라 생각될 때 config를 바꾸면 된다고 생각한다.

```shell
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JSON
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


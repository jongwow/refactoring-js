# 11 API 리팩터링

모듈과 함수는 소프트웨어를 구성하는 빌딩 블록이며, API는 이 블록들을 끼워 맞추는 연결부.

## 11.1 질의 함수와 변경 ㅎ마수 분리하기 (Separate Query From Modifier)

- 우리는 겉보기 부수효과(Observable Side Effect)가 전혀 없이 값ㅇ르 반환하는 함수를 추구
- 부수효과가 있는 함수를 구분하기 위해 **질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다** 규칙을 따른다. (Command-query Separation)

```javascript
function getTotalOustandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}
```

---

```javascript
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

## 11.2 함수 매개변수화하기 (parameterize Function)

- 두 함수의 로직이 아주 비슷하고 리터럴 값만 다르다면 그 다른 값만 매개변수로 받아 처리하는 함수로 합쳐 중복 제거 가능

```javascript
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiple(1.1);
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiple(1.05);
}
```

---

```javascript
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiple(1 + factor);
}
```

## 11.3 플래그 인수 제거하기 (Remove Flag Argument)

- 플래그 인수: 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수

```javascript
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._width = value;
    return;
  }
}
```

---

```javascript
function setHeight(value) {
  this._height = value;
}

function setWidth(value) {
  this._width = value;
}
```

## 11.4 객체 통째로 넘기기 (Preserve Whole Object)

- 레코드를 통째로 넘기면 변화에 대응하기 쉽다.

```javascript
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high)) ;
```

---

```javascript
if (aPlan.withinRange(aRoom.daysTempRange)) ;
```

## 11.5 매개변수를 질의 함수로 바꾸기 (Replace Parameter with Query)

- 매개변수 목록은 함수 변동 요인 따라서 중복을 피하는게 좋고 짧을수록 좋다.

```javascript
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
  //
}
```

---

```javascript
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  //
}
```

## 11.6 질의 함수를 매개변수로 바꾸기 (Replace Query with Parameter)

- 매개변수를 질의 함수로 바꾸기의 반대 리팩터링

```javascript
targetTemperature(aPlan);

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
}
```

---

```javascript
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {
}
```

## 11.7 세터 제거하기 (Remove Setting Method)

- 세터 메서드가 있다는 건 필드가 수정될 수 있다는 것.
- 사람들이 접근자 메서드를 통해서만 필드를 다룰 때나 클라이언트에서 생성 스크립트로 객체를 생성할 때 세터를 제거할 것

```javascript
class Person {
  get name() {
  }

  set name(aString) {
  }
}
```

---

```javascript
class Person {
  get name() {
  }
}
```

## 11.8 생성자를 팩터리 함수로 바꾸기 (Replace Constructor with Factory Function)

```javascript
leadEngineer = new Employee(document.leadEngineer, 'E');
```

---

```javascript
leadEngineer = createEngineer(document.leadEngineer);
```

## 11.9 함수를 명령으로 바꾸기 (Replace Function with Command)

- 명령을 함수로 바꾸기의 반대 리팩터링
- 명령: 대부분 메서드 하나로 구성되어 그 메서드만을 위한 객체를 명령 객체 또는 명령이라 부름.
- 유연하게 제어하고 표현가능함

```javascript
function score(candidate, medialExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
}
```

---

```javascript
class Scorer {
  constructor(candidate, medialExam, scoringGuide) {
    this._candidate = candidate;
    this._medialExam = medialExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
  }
}
```

## 11.10 명령을 함수로 바꾸기 (Replace Command with Function)

- 함수를 명령으로 바꾸기의 반대 리팩터링
- 명령 객체는 복잡한 연산을 다룰 수 있는 강력한 도구이지만 간단한 연산을 할 때는 오히려 복잡해보임. 간단한 연산일 때는 그냥 함수로 바꿔주자

```javascript
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }

  execute() {
    return this._customer * this._usage;
  }
}
```

---

```javascript
function charge(customer, usage) {
  return customer.rate * usage;
}
```

## 11.11 수정된 값 반환하기 (Return Modified Value)

- 데이터가 어떻게 수정되는지를 추적하는 것은 어려운 일.
- 변수를 갱신하는 함수라면 결과값을 반환해 호출자가 그 값을 변수에 담는다면 값의 갱신이 이뤄지는 것을 분명히 인지 가능

```javascript
let totalAscent = 0;
calculateAscent();

function calculateAscent() {
  for (let i = 0; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += (verticalChange > 0) ? verticalChange : 0;
  }
}
```

---

```javascript
const totalAscent = calculate();

function calculateAscent() {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += (verticalChange > 0) ? verticalChange : 0;
  }
  return result;
}
```

## 11.12 오류 코드를 예외로 바꾸기 (Replace Error Code with Exception)

- 예외는 프로그래밍 언어에서 제공하는 독립적인 오류 처리 메커니즘
- 오류가 발견되면 적절한 예외 핸들러를 찾을 때까지 콜스택을 타고 위로 전파된다. 예외를 사용하면 콜스택 전파르 ㄹ신경쓰지 않아도 된다.
- 예외는 정확히 예상 밖의 동작일 때만 스여야 한다.
- 예외를 던지는 코드를 프로그램 종료 코드로 바꿔도 프로그램이 여전이 정상 동작할지를 따져보면 된다. 정상동작하지 않을 것 같다면 예외를 사용하지 말라는 신호다.

```javascript
if (data)
  return new ShppingRules(data);
else
  return -23;
```

---

```javascript
if (data)
  return new ShippingRules(data);
else
  throw new OrderProcessingError(-23);
```

절차

1. 콜스택 상위에 해당 예외를 처리할 예외 핸들러를 작성한다.
2. 테스트한다.
3. 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
4. 정적 검사를 수행한다.
5. catch 절을 수정해 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
6. 테스트한다.
7. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
8. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트 한다.

## 11.13 예외를 사전확인으로 바꾸기 (Replace Exception with Precheck)

- 예외는 '뜻밖의 오류'라는, 말 그대로 예외적으로 동작할 때만 쓰여야 한다.

```java
double getValueForPeriod(int periodNumber){
  try{
    return values[periodNumber];
  } catch(ArrayIndexOutOfBoundsException e){
    return 0;
  }
}
```

---

```java
double getValueForPeriod (int periodNumber){
    return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```



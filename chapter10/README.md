# 10 조건부 로직 간소화

- 조건부 로직은 프로그램을 강화시키지만 복잡하게 만들기도 한다.

## 10.1 조건문 분해하기 (Decompose Conditional)

- 거대한 코드 블록이 주어지만 코드를 부위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꿔주면 전체적인 의도가 더 확실하게 드러난다.

```javascript
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

---

```javascript
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}
```

## 10.2 조건식 통합하기 (Consolidate Conditional Expression)

- 조건부 코드를 통합하면 여러 조각으로 나뉜 조건들을 하나로 통합해 목적이 명확해진다. 그리고 이 작업이 함수 추출하기까지 이어진다면 코드의 의도가 더욱 명확해진다.

```javascript
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

---

```javascript
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}
```

## 10.3 중첩 조건문을 보호 구문으로 바꾸기 (Replace Nested Conditional with Guard Clauses)

- 조건문은 주로 두가지 형태: 참인 경로와 거짓인 경로 모두 정상으로 이어지는 형태, 한쪽만 정상인 형태
- 두 형태가 의도가 다르기 때문에 그 의도가 드러나야 한다.
- 두 경로 모두 정상이라면 if와 else를, 한쪽만 정상이라면 비정상 조건을 if에서 검사(Guard clause)한다.

```javascript
function getPayAmount() {
  let result;
  if (isDead) result = deadAmount();
  else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
  return result;
}
```

---

```javascript
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

## 10.4 조건부 로직을 다형성으로 바꾸기 (Replace Conditional with Polymorphism)

- 복잡한 조건부 로직은 해석하기 가장 난해한 대상 중 하나
- 타입을 여러 개 만들고 각 타입이 조건부 로직을 자신만의 방식으로 처리하도록 구성하거나
- 기본 동작을 위한 case문과 그 변형 동작으로 구성된 로직
- 다형성은 객체 지향 프로그래밍의 핵심.

```javascript
switch (bird.type) {
  case "유럽 제비":
    return "보통이다";
  case "아프리카 제비":
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  case "노르웨이 파랑 앵무":
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  default:
    return "알 수 없다";
}
```

---

```javascript
class EuropeanSwallow {
  get plumage() {
    return '보통이다';
  }

...
}

class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  }

...
}

class NorwegianBlueParrot {
  get plumage() {
    return (this.voltage > 100) ? '그을렸다' : '예쁘다';
  }

...
}
```

## 10.5 특이케이스 추가하기 (Introduce Special Case)

- 특수한 경우의 공통 로직을 요소 하나에 모아서 사용하는 특이 케이스 패턴. // TODO: 나중에 예제 구현해보기

```javascript
if (aCustomer === '미확인 고객') customerName = '거주자';
```

---

```javascript
class UnknownCusomter {
  get name() {
    return '거주자';
  }
}
```

## 10.6 어서션 추가하기 (Introduce Assertion)

- 특정 가정이 코드에 항상 명시적으로 기술되어있지 않다면 어서션을 이용해 코드 자체에 삽입한다.

```javascript
if (this.discountRate) {
  base = base - (this.discountRate * base);
}
```

---

```javascript
assert(this.discountRate >= 0);
if (this.discountRate) {
  base = base - (this.discountRate * base);
}
```

## 10.7 제어 플래그를 탈출문으로 바꾸기 (Replace Control Flag with Break)

- 제어 플래그란 코드의 동작을 변경하는 데 사용되는 변수. 코드에서 악취나는 부분 중 하나

```javascript
for (const p of people) {
  if (!found) {
    if (p === '조커') {
      sendAlert();
      found = true;
    }
  }
}
```

---

```javascript
for (const p of people) {
  if (p === '조커') {
    sendAlert();
    break;
  }
}
```


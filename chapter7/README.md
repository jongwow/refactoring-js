# 7 캡슐화

- 모듈을 분리하는 기준: 시스템에서 각 모듈이 자신ㅇ르 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기느냐

## 7.1 레코드 캡슐화하기 (Encapsulate Record)

- 레코드는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있다.

```javascript
organization = { name: "애크미 구스베리", country: "GB" };
```

---

```javascript
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get country() {
    return this._country;
  }
  set country(arg) {
    return this._country;
  }
}
```

## 7.2 컬렉션 캡슐화하기 (Encapsulate Collection)

- 가변 데이터는 모두캡슐화하는 편이다. 컬렉션을 다룰 때 곧잘 실수를 저지르곤 하는데, 이럴 땐 컬렉션을 감싼 클래스에 컬렉션 변경자 메서드를 만든다.

```javascript
class Person {
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}
```

---

```javascript
class Person {
  get courses() {
    return this._courses;
  }
  addCourse(aCourse) {}
  removeCourse(aCourse) {}
}
```

## 7.3 기본형을 객체로 바꾸기 (Replace Primitive with Object)

- 개발 초기에는 단순한 정보를 숫자나 문자열 같은 간단한 데이터로 표현할 때가 많다. 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의하는 편이다.

```javascript
orders.filter((o) => "high" === o.priority || "rush" === o.priority);
```

---

```javascript
orders.filter((o) => o.priority.higherThan(new Priority("normal")));
```

## 7.4 임시 변수를 질의 함수로 바꾸기 (Replace Temp with Query)

- 임시 변수를 사용하면 값을 계산하는 코드가 반복되는걸 줄이고 이름을 통해 의미를 설명할 수 있어 유용하지만, 아예 함수로 만들어 사용하는 편이 더 나을 때가 많다.

```javascript
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;
```

---

```javascript
get basePrice() { this._quantity * this._itemPrice;}

if (this.basePrice > 1000)
    return basePrice * 0.95;
else
    return basePrice * 0.98;
```

## 7.5 클래스 추출하기 (Extract Class)

- 클래스는 반드시 명확하게 추상화하고 소수의 주어진 역할만 처리해야 한다.

```javascript
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}
```

---

```javascript
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get areaCode() {
    this._areaCode;
  }
  get number() {
    this._number;
  }
}
```

## 7.6 클래스 인라인하기 (Inline Class)

- 7.5 클래스 추출하기를 거꾸로 돌리는 리팩터링.
- 더 이상 제 역할을 못 하는 클래스는 인라인한다.

```javascript
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get areaCode() {
    this._areaCode;
  }
  get number() {
    this._number;
  }
}
```

---

```javascript
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}
```

## 7.7 위임 숨기기 (Hide Delegate)

- 모듈화 설계를 제대로 하는 핵심은 캡슐화. 모듈들이 시스템의 다른 부분에 대해 몰라도 된다!

```javascript
manager = aPerson.department.manager;
```

---

```javascript
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

## 7.8 중개자 제거하기 (Remove Middle Man)

- 위임숨기기의 반대 리팩터링이다.
- 위임하다보면 단순히 전달만 하는 중개자 역할이 많아진다. 그럴 때는 차라리 직접 호출하는 게 나을 수 있다.

```javascript
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

---

```javascript
manager = aPerson.department.manager;
```

## 7.9 알고리즘 교체하기 (Substitute Algorithm)

- 어떤 목적을 달성하는 방법은 여러 가지 있다. 더 쉬운방법을 찾는다면 더 쉬운 거승로 교체한다.

```javascript
function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Kent") {
      return "Kent";
    }
  }
  return "";
}
```

---

```javascript
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p)) || "";
}
```

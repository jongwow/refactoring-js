# 9 데이터 조직화

## 9.1 변수 쪼개기 (Split Variable)

- 여러번 대입하는 변수: 루프 변수(loop variable), 수집 변수(collecting variable)
- 한번 대입하는 변수: 긴 코드의 결과를 저장했다가 쉽게 참조하려는 목적으로 쓰이는 경우.
- 역할 하나당 변수 하나! 여러번 대입된다는 것은 역할이 둘 이상이라는 것!

```javascript
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
```

---

```javascript
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```

## 9.2 필드 이름 바꾸기 (Rename Field)

- 이름은 중요하다.

```javascript
class Organization {
  get name() {}
}
```

---

```javascript
class Organization {
  get title() {}
}
```

## 9.3 파생 변수를 질의 함수로 바꾸기 (Replace Derived Variable with Query)

- 가변 데이터는 SW에 문제를 일으키는 골칫거리 중 하나
- 가변 데이터를 없앨 수 없다면 유효 범위를 가능한 좁히자. 쉽게 계산 가능한 변수는 제거하자

```javascript
get discountedTotal() { return this._discountedTotal; }
set discount(aNumber){
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old - aNumber;
}
```

---

```javascript
get discountedTotal() { return this._baseTotal - this._discount; }
set discount(aNumber) { this._discount = aNumber; }
```

## 9.4 참조를 값으로 바꾸기 (Change Reference to Value)

- 내부 객체의 속성을 갱신할 때의 차이: 참조(내부 객체는 그대로 둔 채 그 객체의 속성만 갱신), 값(새로운 속성을 담은 객체로 기존 내부 객체를 통째로 대체)
- 값 객체는 불변이기 떄문에 다루기 쉽다. 하지만 불변이면 안되는 조건에선 참조 객체를 사용해야 한다.

```javascript
class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
```

---

```javascript
class Product {
  applyDiscount(arg) {
    this._price =
      new Money() * (this._price.amount - arg, this._price.currency);
  }
}
```

## 9.5 값을 참조로 바꾸기 (Change Value to Reference)

- 참조를 값으로 바꾸기의 반대 리팩터링
- 같은 데이터를 참좋는 여러 개의 레코드가 있을 때 값 객체라면 모두 빠짐업싱 갱신해야한다. 이는 일관성을 깨트리기 쉽다. 이런 상황엔 참조로 바꿔주는 것이 좋다.

```javascript
let customer = new Customer(customerData);
```

---

```javascript
let customer = customerRepository.get(customerData.id);
```

## 9.6 매직 리터럴로 바꾸기 (Replace Magic Literal)

- 매직 리터럴: 소스 코드에 (보통은 여러 곳에) 등장하는 일반적인 리터럴 값
- 예) "M": 남성, "F": 여성, GRAVITY: 9.81, ... 등
```javascript
function potentialEnergy(mass, height){
    return mass * 9.81 * height;
}
```

---

```javascript
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height){
    return mass * STANDARD_GRAVITY * height;
}
```

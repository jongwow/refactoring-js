# 12 상속 다루기

- 객체 지향 프로그래밍에서 가장 유명한 특성인 상속
- 특정 기능을 상속 계층구조의 위나 아래로 옮겨야 하는 상황: 메서드 올리기, 필드 올리기, 생성자 본문 올리기, 메서드 내리기, 필드 내리기 등
- 계층 사이에 클래스를 추가하거나 제거: 슈퍼클래스 추출하기, 서브클래스 제거하기, 계층 합치기
- 필드 값에 따라 동작 달라지는 코드: 타입 코드를 서브클래스로 바꾸기
- 잘못된 곳에 사용하거나 나중에 환경이 변해 문제가 생길 때: 서브클래스를 위임으로 바꾸기, 슈퍼클래스를 위임으로 바꾸기

## 12.1 메서드 올리기 (Pull Up Method)

- 중복 코드 제거는 중요. 메서드 올리기를 이용해 메서드들의 본문 코드가 같을 때 중복 제거 가능

```javascript
class Employee {}
class SalesPerson extends Employee {
  get name() {}
}
class Engineer extends Employee {
  get name() {}
}
```

---

```javascript
class Employee {
  get name() {}
}
class SalesPerson extends Employee {}
class Engineer extends Employee {}
```

## 12.2 필드 올리기 (Pull Up Field)

- 데이터 중복 선언을 줄이고 해당 필드를 사용하는 동작을 서브클래스에서 슈퍼클래스로 옮길 수 있다.

```java
class Employee {}
class SalesPerson extends Employee {
  private String name;
}
class Engineer extends Employee {
  private String name;
}
```

---

```javascript

class Employee {
  private String name;
}
class SalesPerson extends Employee {}
class Engineer extends Employee {}
```

## 12.3 생성자 본문 올리기 (Pull Up Constructor Body)

```javascript
class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
```

---

```javascript
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

## 12.4 메서드 내리기 (Push Down Method)

- 메서드 올리기의 반대 리팩터링
- 특정 서브클래스 하나와 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스에 추가하는 것
- 해당 기능을 제공하는 서브클래스가 무엇인지 호출자가 알고 있을 때만 적용 가능.

```javascript
class Employee{
  get quota{}
}

class Engineer extends Employee {}
class Salesperson extends Employee {}
```

---

```javascript
class Employee {}
class Engineer extends Employee {}
class Salesperson extends Employee{
  get quota{}
}
```

## 12.5 필드 내리기 (Push Down Field)

- 필드 올리기의 반대 리팩터링

```java
class Employee{
  private String quota;
}

class Engineer extends Employee{}
class Salesperson extends Employee{}
```

---

```java
class Employee{}
class Engineer extends Employee{}
class Salesperson extends Employee{
  protected String quota;
}
```

## 12.6 타입 코드를 서브클래스로 바꾸기 (Replace Type Code with Subclasses)

- 비슷한 대상들을 특정 특성에 따라 구분해야할 경우 -> 타입 코드 필드 사용
- 그 이상으로 필요할 때는 서브클래스 사용. 조건에 따라 다르게 동작하는 다형성, 특정 타입에서만 의미있는 필드나 메서드 사용이 가능해진다.

```javascript
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

---

```javascript
function createEmployee(name type){
  switch(type){
    case "engineer": return new Engineer(name);
    case "salesperson": return new Salesperson(name);
    case "manager": return new Manager(name);
  }
}
```

## 12.7 서브클래스 제거하기 (Remove Subclass)

- 타입 코드를 서브클래스로 바꾸기의 반대 리팩터링
- 더 이상 쓰이지 않는 서브클래스와 마주는건 쓸모없는 에너지 낭비이다. 서브클래스를 슈퍼클래스의 필드로 대체해 제거하자.

```javascript
class Person {
  get genderCode() {
    return "X";
  }
}
class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}
```

---

```javascript
class Person {
  get genderCode() {
    return this._genderCode();
  }
}
```

## 12.8 슈퍼클래스 추출하기 (Extract Superclass)

- 비슷한 일을 하는 두 클래스는 상속 매커니즘을 이용해 비슷한 부분을 공통의 슈퍼클래스로 옮길 수 있다.

```javascript
class Department {
  get totalAnnualCost() {}
  get name() {}
  get headCount() {}
}

class Employee {
  get annualCost() {}
  get name() {}
  get id() {}
}
```

---

```javascript
class Party{
  get name();
  get annualCost(){}
}

class Department extends Party{
  get annualCost(){}
  get headCount(){}
}

class Employee extends Party{
  get annualCost(){}
  get id(){}
}
```

## 12.9 계층 합치기 (Collapse Hierarchy)

- 계층구조도 진화하면서 어떤 클래스와 부모가 비슷해지면 독립할 존재가 사라지기도 한다. 그럴 때는 합친다.

```javascript
class Employee {}
class Engineer extends Employee {}
```

---

```javascript
class Engineer extends Employee {}
```

## 12.10 서브클래스를 위임으로 바꾸기 (Replace Subclass with Delegate)

- 속한 갈래에 따라 동작이 달라지면 상속이 자연스럽다.
- 상속 단점: 단 한번만 쓸 수 있는 카드. 무언가 달라지는 이유가 여러 개여도 상속에선 그 중 단 하나만 기준
- 예) 나이와 소득으로 구분하고 싶은데 상속으로는 나이(늙, 젊)만 하거나 소득(부, 가난)만 해야한다.
- 상속 단점: 상속은 클래스들의 관계를 아주 긴밀하게 결합 -> 부모를 수정하면 자식들의 기능을 해치기 쉽다.
- 위임(delegate): 두 문제를 해결. 다양한 클래스에 서로 다른 이유로 위임 가능. 상속보다 결합도가 약하다.
- "(클래스) 상속보다는 (객체) 컴포지션을 사용하라!"라는 원칙이 있음. 컴포지션이 위임과 비슷.
- 디자인 패턴에서 서브클래스를 상태 패턴(state pattern)이나 전략 패턴(strategy pattern)으로 대체하는 것과 비슷

```javascript
class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}

class PriorityOrder extends ORder {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
```

---

```javascript
class Order {
  get daysToShip() {
    return this._priorityDelegate
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}

class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
```

## 12.11 슈퍼클래스를 위임으로 바꾸기 (Replace Superclass with Delegate)

- 객체 지향 프로그래밍에서 상속은 기존 기능을 재활용하고 강력한 손쉬운 수단. 하지만 혼란과 복잡도를 키우기도 한다.
- 위임은 혼란과 오류를 줄이고 객체를 분리하여 기능 일부만 빌려올 뿐 별개인 개념임을 명확하게 한다.

```javascript
class List {}
class Stack extends List {}
```

---

```javascript
class Stack{
  constructor(){}
  this._storage = new List();
}

class List{}
```

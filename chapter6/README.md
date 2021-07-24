# 6 기본적인 리팩터링 

## 6.1 함수 추출하기(Extract Function)

- '목적과 구현을 분리'하기 위해 사용.
- 목적이 드러나는 이름의 짤막한 함수를 이용하자

```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  console.log(`customer: ${invoce.customer}`);
  console.log(`outstanding: ${outstanding}`);

}
```

----

```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`customer: ${invoce.customer}`);
    console.log(`outstanding: ${outstanding}`);
  }
}
```

## 6.2 함수 인라인하기 (Inline Function)

- 함수 본문이 이름만큼 깔끔할 때.

```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dirver) {
  return driver.numberOfLateDeliveries > 5;
}
```

---

```javascript
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```

## 6.3 변수 추출하기 (Extract Variable)

- 표현식이 너무 복잡해 이해하기 어려울 때 지역 변수를 활용해 목적을 드러내기

```javascript
return order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100);
```

---

```javascript
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

## 6.4 변수 인라인하기 (Inline Variable)

```javascript
let basePrice = anOrder.basePrice;
return (basePrice > 1000);
```

---

```javascript
return anOrder.basePrice > 1000;
```

## 6.5 함수 선언 바꾸기 (Change Function Declaration)

- 이름만 좋으면 코드를 보지 않고도 무슨 일을 하는지 알 수 있다.

```javascript
function circum(radius) { ...
}
```
---
```javascript
function circumference(radius) { ...
}
```


## 6.6 변수 캡슐화하기 (Encapsulate Variable)
- 데이터는 그 범위가 넓을수록 다루기 힘들다. 그래서 캡슐화를 해준다.

```javascript
let defaultOwner = {firstName: "마틴", lastName: "파울러"};
```

---

```javascript
let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() { return defaultOwnerData};
export function setDefaultOwner(arg) { defaultOwnerData=arg;}
```

- 기본 캡슐화 기법은 데이터 항목을 참조하는 부분만 캡슐화. 하지만 변수의 값을 바꾸는 행위도 제어하고 싶다면?
- 그 값을 바꿀 수 없게 하면 된다. (복사한 데이터를 반환하거나 레코드 캡슐화하기)

## 6.7 변수 이름 바꾸기 (Rename Variable)
- 명확한 프로그래밍의 핵심은 이름짓기다.
```javascript
let a = height * width;
```
---
```javascript
let area = height * width;
```

## 6.8 매개변수 객체 만들기 (Introduce Parameter Object)
- 데이터 항목 여러 개가 매개변수로 전달되면 차라리 데이터 구조 하나로 묶어 데이터 사이의 관계를 명확히 하자.
- 값 **객체**로 묶는다면 뒤따라서 진행될 수 있는 리팩터링의 준비작업이 될 수 있다. 
```javascript
function amountInvoiced(startDate, endDate){}
function amountReceived(startDate, endDate){}
function amountOverdue(startDate, endDate){}
```

---

```javascript
function amountInvoiced(aDateRange){}
function amountReceived(aDateRange){}
function amountOverdue(aDateRange){}
```

## 6.9 여러 함수를 클래스로 묶기 (Combine Functions into Class)
- 공통 데이터를 중심으로 긴밀히 엮어 작동하는 함수 무리를 발견하면 클래스로 묶자.
- 클래스는 데이터와 함수를 하나의 공유 환경으로 묶은 후 다른 프로그램 요소와 어울러질 수 있도록 그 중 일부를 외부로 제공한다.
```javascript
function base(aReading){};
function taxableCharge(aReading){};
function calculateBaseCharge(aReading){};
```
---
```javascript
class Reading{
    base(aReading){};
    taxableCharge(aReading){};
    calculateBaseCharge(aReading){};  
}
```
## 6.10 여러 함수를 변환 함수로 묶기 (Combine Functions into Transform)
- 원본 데이터를 입력받아 필요한 데이터를 모두 도출한 뒤, 출력 데이터의 필드로 넣어 반환한다.
```javascript
function base(aReading){};
function taxableCharge(aReading){};
```
---
```javascript
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}
```

# 6.11 단계 쪼개기 (Split Phase)
- 서로 다른 두 대상을 한꺼번에 다루면 각각을 별개 모듈로 나누려하자.
```javascript
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].splite('-')[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;
```
---
```javascript
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString){
  const values = aString.split(/\s+/);
  return ({
    productID: values[0].split('-')[1],
    quantity: parseInt(values[1]),
  });
}
function price(order, priceList){
  return order.quantity * priceList[order.productID];
}
```

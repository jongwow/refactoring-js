# 6 rlqhswjrdls flvorxjfld

## 6.1 함수 추출하기(Extract Function)

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

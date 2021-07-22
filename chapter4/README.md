# 4 테스트 구축하기

리팩터링을 제대로 하려면 견고한 테스트 스위트(test suite)가 뒷받침돼야 한다.

## 4.1 자게 테스트 코드의 가치

프로그래머들이 실제로 코드를 작성하는 시간의 비중은 그리 크지 않다. 대부분의 시간을 디버깅에 쓴다. 진짜 끔찍한 건 버그를 찾는 여정이다. 테스트가 성공했는지 확인하는 작업을 내가 하는 것이 아니라 컴퓨터가 알려준다면? 자가 테스트 소프트웨어가 그렇게 탄생했다.

**모든 테스트를 완전히 자동화하고 그 결과까지 스스로 검사하게 만들자**

컴파일할 때마다 테스트도 함께 하기 때문에 디버깅 시간이 크게 줄어들고 생산성이 급상승했다.

**테스트 스위트는 강력한 버그 검출 도구로, 버그를 찾는 데 걸리는 시간을 대폭 줄여준다.**

테스트부터 작성하는 습관을 바탕으로 켄트백의 TDD가 등장했다.

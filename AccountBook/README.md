# 가계부 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/225927701-33d40a08-5c55-4a73-88e9-786907262b9b.GIF" width="200" height="400">

## 목차

---

- [요구사항](#요구사항)
- [react-native-sqlite-storage](#react-native-sqlite-storage)
- [react-native-calendars](#react-native-calendars)
- [react-native-chart-kit](#react-native-chart-kit)

---

## 실행

```
npm run ios && npm run android
```

xcode와 android studio를 설치하거나, 직접 모바일 기기를 연결하여 프로젝트 결과를 확인할 수 있다.

## 정리

### 요구사항

- 총 사용 금액
- 월별통계 보러가기 → 월에 사용한 총 금액을 월별로 비교할 수 있음
- 이번달에 사용한 내역 리스트 확인
- type은 사용 / 수입으로 구분
- 사진은 optional
- 우축하단 +를 누르게 되면 추가화면으로 이동
  - 수입/지출 toggle로 지정
  - 사용 내용 입력
  - 사용일시 선택가능
  - 이미지 영역 누르면 촬영가능
  - 등록하기 버튼을 누르면 등록완료
- 내역을 누르면 상세화면으로 이동
- 내용 수정가능
- 월별 사용 데이터를 나타내는 막대그래프 확인가능 - 최근 3개월 월별사용데이터 보여줌

### react-native-sqlite-storage

- SQL
  - Structured Query Language
  - 데이터 베이스에서 데이터를 가져올때 사용하는 언어
- 관계형 데이터베이스
  - 표를 만드는 것처럼 데이터를 구조화 시켜 저장
  - SQL은 이 표에 있는 데이터들을 가져 오도록 하는 명령 언어
- Insert
  어떠한 값을 추가하기 위한 구문
  ```
  insert into table_name ($cloumn1, $column2, $column3)
  values ($value1, $value2, $value3)
  ```
- update
  어떠한 값을 수정하기 위한 구문
  ```
  update table_name
  set column = value, column2 = value2
  where value3=${value}
  ```
- delete
  어떠한 값을 삭제 하기 위한 구문
  ```
  delete from table_name where ${value}={value}
  ```
- select
  어떠한 값을 조회하기 위한 구문
  ```
  select * from table_name where value={value}
  ```
- SQLite
  - SQL + Lite의 합성어
  - 모바일 환경에 적합하게 가볍게 설계 되어있음
  - 앱을 만드는데 있어서 필요한 만큼의 기능들이 제공됨
- react-native-sqlite-storage
  - SQLite를 react-native에서도 사용 가능하도록 만든 패키지
- 만들 테이블
  - id,type,comment,price,photoUrl,date,createdAt,updatedAt
- 사용
  - [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage) 페이지 참고
  - 설치
    - npm install --save react-native-sqlite-storage @types/react-native-sqlite-storage
    - sqlite용 db관리 프로그램
      - `brew install --cask db-browser-for-sqlite`
      - 프로젝트 루트경로에 db생성
      - 테이블 정의, 필드정의
      - db파일경로설정
        - ios>프로젝트폴더>www폴더생성 > www폴더안에 붙여넣기
        - xcode에서 www폴더안의 db파일을 프로젝트폴더에 `create folder references`옵션으로 추가하기
        - android>app>src>main>assets폴더생성>www폴더생성>내부에 db파일 붙여넣기

### react-native-calendars

캘린더를 출력하고, 날짜 선택 기능을 활용하기 위해 이 패키지를 사용하였다.

[여기](https://github.com/wix/react-native-calendars)를 참고하였다.

`npm install react-native-calendars`

Calendar를 import하여 다양한 옵션들을 활용하면 된다.

### react-native-chart-kit

그래프들을 쉽게 사용하기 위해 이 패키지를 사용하였다.

[여기](https://www.npmjs.com/package/react-native-chart-kit)를 참고하여 환경설정 및 내용을 작성하면 된다.

`npm install react-native-chart-kit`

다양한 그래프형식들이 있고, import한 후, 다음처럼 옵션들을 활용하면 된다.

```
<StackedBarChart
    data={{
    labels: ['1월', '2월', '3월'],
    legend: ['사용', '수입'],
    data: [
      [60, 60],
      [30, 30],
      [100, 130],
    ],
    barColors: ['#f25', '#143'],
    }}
    hideLegend
    width={width}
    height={220}
    chartConfig={{
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'gray',
    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    }}
/>
```

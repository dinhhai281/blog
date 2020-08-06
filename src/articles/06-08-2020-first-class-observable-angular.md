---
path: "/first-class-observable-angular"
date: "2020-08-06"
title: "Một chút ngẫu hứng với Angular - First Class Observable Pattern"
featuredImage: ../images/first-class-observable-angular/rxjs-featured.png
---

Reactive eXtensions for JavaScript là vũ khí tối thượng với bất kỳ ai code JavaScript đặc biệt là những ai đau khổ với Angular như mình. Trong những ngày tháng đó thì mình cũng tìm ra một cách để enjoy Angular đó là dùng RxJS cho mọi thứ biến bản thân thành một Pure Reactive Programmer. Bài viết này sẽ viết về cách mình sử dụng rxjs cho phần lớn các trường hợp thường gặp phải khi làm việc với Angular, cái mà mình tự gọi là `First Class Observable Pattern`.

⚠️ **Một số thuật ngữ dùng trong này đều không chính thức và có thể không chính xác về mặt học thuật.**

Ý tưởng chính ở đây là dùng `Observable` cho tất cả mọi thứ. Dữ liệu, event, side effect,... tất cả đều được thể hiện dưới dạng `Observable`. Mục đích của việc này là tất cả mọi thứ đều là stream thì có thể sử dụng các operator của `RxJS` để thực hiện các logic trong code. Điều này rất cần thiết khi cần làm những thứ như là input và một input thì giá trị ở input khác cũng phải đổi theo và có thể trong đó còn vài yếu tố khác ảnh hưởng tới luồng thay đổi đó.

#### Observable - Vũ khí tối thượng

Ví dụ bạn có có 2 biến `x` và `y` là `number`. Nếu bạn muốn `z` = `x` + `y` thì bạn sẽ làm như thế nào?

```typescript
let x = 0;
let y = 1;

let z = x + y;
```

Nếu bạn làm giống như đoạn code trên thì có thể nói là bạn vừa đúng vừa sai. Bạn đúng vì tại thời điểm phép gán được thực hiện nhưng nếu sau đó bạn gán `x = 1` thì sao? Bạn thấy đó nếu giá trị của `x` thay đổi thì ngay lập tức `z` đã không còn bằng `x + y`. Bạn sẽ cần phải lặp lại dòng code `let z = x + y`.

Để chắc chắn `z` luôn luôn bằng `x + y` thì hãy tưởng tượng `x` và `y` là các stream `number` giá trị của chúng sẽ thay đổi theo thời gian, còn `z` là một stream tổng của `x` và `y` (giá trị của z sẽ là tổng của x và y tại thời điểm t). Điều này có nghia là mỗi khi x hoặc y thay đổi giá trị thì giá trị của z sẽ được tính lại.

Hy vọng bạn hiểu vấn đề trên, đó là ý tưởng của `Reactive Programming`. Vậy để làm việc trên thay vì biểu diển x và y là 2 `number` và gán `z` bằng `x + y` ở một dòng code nào đó thì hãy cân nhắc làm như thế này.

```typescript
const x$ = new BehaviorSubject<number>(0);
const y$ = new BehaviorSubject<number>(1);

const z$ = combineLatest([x$, y$]).pipe(
  map(([x, y]) => x + y),
);

// Nếu muốn thay đổi giá trị của x và y
x$.next(1);
y$.next(3);
```

Tới đây có thể nhiều người sẽ nghĩ rằng việc trên chỉ là phức tạp hoá mọi thứ, thật ra cũng đúng nhưng mà đôi khi phải chấp nhận đánh đổi cái này để có được cái khác thôi. Hãy tưởng tượng `Observable` là một cái hộp được thiết kế để dễ dàng sắp xếp và di chuyển, nếu bạn bỏ hết tất cả đồ đạc trong nhà vô đó thì mọi thứ trọng nhà bạn đều có thể được sắp xếp gọn gàng, bạn sẽ làm được được những việc mà trước đó không thể nào làm được chẳng hạn như đặt một cái bàn phím nằm trên một cây bút 🤔. Thay vì bất khả thi thì bây giờ chỉ cần bỏ mọi thứ vô hộp là được.

Nhưng mà khó khăn một cái là bây giờ muốn dùng cái gì thì trước hết bạn phải lấy cái hộp đựng đồ vật đó rồi mở hộp ra.

*Thật ra mình cũng muốn giải thích cái lý thuyết trên bằng Functional Programming nhưng mà tự thấy trình chưa đủ để giải thích nên mới có câu chuyện cái hộp, bàn phím và cây bút ở trên* 😥

Quay lại với code thì mình muốn bỏ tất cả mọi thứ từ data đến logic vào trong `Observable` và dùng các operator mà `rxjs` cung cấp để thao tác trên những `Observable` đó. Với số lượng `operator` cực khủng mà `rxjs` cung cấp thì điều này vô cùng khả thi. Ví dụ trên là cộng 2 số trong thế giới của `Observable` đó.

#### Một số ví dụ để làm quen

`Reactive Programming` hay hẹp hơn là `rxjs` không phải quá khó để dùng, mọi thứ bạn làm được với cách code thông thường bạn đều có thể làm được điều tương tự với các operator của `rxjs`. Phần này mình sẽ đưa ra một số ví dụ để những ai mới biết đến `rxjs` có thể làm quen với cách suy nghĩ **Everything is stream** nhé.

*Để dễ hiểu thì các mình sẽ dùng `BehaviorSubject` để tạo các local stream, trong thực thế bạn có thể tạo ra một `Observable` từ bất cứ thứ gì.*

**Filter một mảng theo điều kiện**
```typescript
type NumberType = 'ODD' | 'EVEN';

const selectedNumberType$ = new BehaviorSubject<NumberType>('ODD');
const numbers$ = new BehaviorSubject<number[]>([1, 2, 3, 4]);

const filteredNumbersA$ = combineLatest([
  numbers$,
  selectedNumberType$.pipe(
    map(numberType => (value: number) =>
      value % 2 === (numberType === 'ODD' ? 1 : 0),
    ),
  ),
]).pipe(
  map(([numbers, filterFn]) => numbers.filter(filterFn)),
);

// Nếu bạn muốn kết quả chỉ thay đổi khi loại số được chọn thay đổi.
const filteredNumbersB$ = selectedNumberType$.pipe(
  map(numberType => (value: number) =>
    value % 2 === (numberType === 'ODD' ? 1 : 0),
  ),
  withLatestFrom(numbers$),
  map(([filterFn, numbers]) => numbers.filter(filterFn)),
);

// [1, 3]
// [2, 4]
// [2]
// [1]
filteredNumbersA$.subscribe(console.log);

// [1, 3]
// [2, 4]
// [1]
filteredNumbersB$.subscribe(console.log);

selectedNumberType$.next('EVEN');
numbers$.next([1, 2]);
selectedNumberType$.next('ODD');
```

Trong ví dụ trên mình đã lấy ra các số chẵn hoặc lẽ tuỳ theo `selectedNumberType` đang là `EVEN` hay `ODD`. Cụ thể là các giá trị được emit từ `selectedNumberType$` sẽ được map thành một `function` dùng để lấy số chẳn hay lẻ để sử dụng trong method `filter` của array. Bây giờ bạn hãy suy nghĩ cách để làm điều tương tự như `filteredNumbersA$` (kết quả filter được thay đổi mỗi khi mảng number và điều kiện filter thay đổi) và  `filteredNumbersB$` (kết quả filter được thay đổi chỉ khi điều kiện filter thay đổi) xem có đơn giản không nhé.

Nếu như code bình thường bạn làm được kết quả tương tự một cách đơn giản trên nếu chẳng cần quan tâm phải update lại kết quả nếu như các biến số của bạn thay đổi. Tuy nhiên khi sự thay đổi trở nên cần thiết bạn vẫn sẽ làm được thôi nhưng mà rất có thể là nó sẽ vô cùng phức tạp và không ai hiểu nổi ngoài bạn (mình đang nghĩ tới việc tạo một class với vài cái setter chứ thiệt bản thân mình cũng chả biết phải code sao cho hay để làm chuyện tương tự).

**Toogle**
```typescript
const buttonClick$ = fromEvent(document.querySelector('button'), 'click');

const isShow$ = buttonClick$.pipe(
  scan(acc => !acc, false),
);

isShow$.subscribe(console.log);
// click -> true
// click -> false
// click -> true
// click -> false
```

**Autocomplete with a list of items**
```typescript
const fetchAnimals = () => of(['dog', 'cat', 'mouse', 'frog']).pipe(
  delay(2000),
);
const fetchFruits = () => of(['banana', 'durian', 'apple', 'pineapple']).pipe(
  delay(2000).
);

const searchTerm$ = fromEvent(document.querySelector('input'), 'change');
const itemType$ = new Subject<'ANIMAL' | 'FRUIT'>();
const makeFilteredItems = (
  term$: Observable<string>,
  items$: Observable<string[]>,
) => items$.pipe(
  switchMap(items => term$.pipe(
    map(term => items.filter(item => item.includes(term))),
  )),
);

// Mỗi khi item type thay đổi thì sau 2s sẽ tạo ra array các item 
// array này có thể được filter theo giá trị được nhập vào input
// Nếu nhập input trước 2s sẽ không tính
// khi đổi type thì sẽ filter lại từ đâu (input không bị xoá chỉ là không có hiệu lực thôi)
const result$ = itemType$.pipe(
  switchMap(itemType => makeFilteredItems(
    searchTerm$,
    itemType === 'ANIMAL' ? fetchAnimals() : fetchFruits(),
  )),
);

// --*-- ANIMAL --*--
// ['dog', 'cat', 'mouse', 'frog']
// ['dog', 'mouse', 'frog']
// ['dog', 'frog']
// ['dog', 'mouse', 'frog']
// ['cat']

// --*-- FRUIT --*--
// ['banana', 'durian', 'apple', 'pineapple'] (t)
// ['banana', 'durian', 'apple', 'pineapple'] ( )
// ['apple', 'pineapple'] (ap)
// ['banana', 'durian', 'apple', 'pineapple'] (a)
// ['banana', 'durian', 'apple', 'pineapple'] ( )
// ['banana', 'durian', 'apple', 'pineapple'] (a)
// ['banana' 'durian'] (an)
result$.subscribe(console.log);

itemType$.next('ANIMAL'); // input: (sau 2s) o---og---o---t
itemType$.next('FRUIT'); // input (đang là t từ lần nhập trước): sau (2s) -- --ap--a-- --a--an
```

Trên đây là một số ví dụ sử dụng `rxjs` để thực hiện một số việc, về cơ bản bất cứ thứ gì bạn cũng có thể nhét nó vào trong 1 `Observable` và nếu tất cả mọi thứ đều là `Observable` thì tất cả những logic, những tính toán mà bạn thực hiện hằng ngày đều sẽ là sự kết hợp của các observable và các operator.

#### Angular First Class Observable

Nếu như bạn có thể thay đổi mindset theo hướng `Reactive Programming`, biến đổi tất cả mọi thứ có trong một component thành dạng `Observable` thì đó chính là pattern mà mính gọi là `Angular First Class Observable`. Nghe có vẻ mơ hồ nên mình sẽ đưa ra một số nguyên tắc sau:

- Tất cả các property đều phải là `Observable`.
- Sử dụng `BehaviorSubject` cho các state của component.
- Nếu cần handle một event từ template, đừng tạo handler method hãy dùng `Subject` để thể hiển một stream các event cần handle và subscribe vào subject đó.
- Chuyển tất cả `@Input` về dạng `Observable`.

Để đơn giản thì mình hãy xem qua ví dụ này nhé.

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <div>{{ $count | async }}<div>
    <button (click)="upBtnClick$.next()">UP</button>
  `,
})
export class CounterComponent implements OnInit, OnDestroy {
  @Input()
  get startValue() {
    this._startValue$.getValue();
  }
  set startValue(value) {
    this._startValue$.next(value);
  }

  count$: Observable<number>;
  upBtnClick$ = new Subject<void>();

  private _startValue$ = new ReplaySubject<number>(1);
  private _step$ = new BehaviorSubject<number>(1);
  private _unsubscribe$ = new Subject<void>();

  private _initData = () => {
    this.count$ = this._startValue$.pipe(
      switchMap(startValue => interval(1000).pipe(
        withLatest(this._step$),
        map(([value, step]) => value * step + startValue),
      )),
    );
  }

  private _initEffect = () => {
    this._upBtnClickEffect().subscribe();
  }

  ngOnInit() {
    this._initData();
    this._initEffect();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private _upBtnClickEffect = () => this.upBtnClick$.pipe(
    withLatestFrom(this._step$),
    tap(([, step]) => this._step$.next(step + 1)),
    takeUntil(this._unsubscribe$),
  )
}
```

Component Counter trong ví dụ trên sẽ hiện một số tăng liên tục từ `startValue` được truyền từ input, mỗi lần `startValue` thay đổi nó sẽ đếm lại từ giá trị `startValue` mới đó. Nếu click vào nút `UP` thì giá trị đếm tăng lên mỗi giây sẽ thêm 1. Bạn có thể thấy rằng tất cả mọi thứ mình sử dụng đều là `Observable`:

- `input starValue` đã bị đổi thành `_startValue$` bằng getter và setter.
- Giá trị đếm hiển thị trên UI và logic để tăng giá trị đó lên sau mỗi giây sẽ được thể hiện qua `count$`.
- Xử lý event click cũng được thực hiện thông qua `upBtnClick`.
- Dùng `_step$` để lưu lại state.
- Logic update lại state mỗi khi click cũng là một observable và được tạo ra từ `_upBtnClickEffect()`.

Đơn giản thế thôi, hầu như mọi thứ đều có thể được xử lý dưới dạng `Observable`, lúc đó chúng ta có thể tận dụng sức mạnh mà `Observable` mang lại để thực hiện những logic vô cùng phức tạp nhưng code theo phong cách declarative rất dễ hiểu.

Nói dông dài thì `Angular First Class Observable`, ví dụ trên có lẽ là đủ để các bạn có được ý tưởng để chuyển mọi thứ trong một component thành `Observable`. Tuy nhiên chắc nhiều bạn sẽ thấy rằng quá nhiều boilerplate code. Chúng ta có thể sử dụng `decorator` cải thiện việc này.

#### ObservableBinding Decorator

Trong ví dụ thì `Input` nào các bạn cũng có thể dùng cách này để thực hiện chuyển thành observable. Vậy để đỡ phải code lặp đi lặp lại thì hãy tạo một decorator cho việc này.

```typescript
import { ReplaySubject } from 'rxjs';

export function ObservableBinding<T, K = T>(map?: (value: T) => K) {
  const symbol = Symbol();
  const subjectSymbol = Symbol();

  return function (target: object, key: PropertyKey) {
    Object.definedProperty(target, key, {
      set: (value: T) => {
        if (!this[subjectSymbol]) {
          this[subjectSymbol] = new ReplaySubject<K>(1);
          this[symbol] = this[subjectSymbol].asObservable();
        }
        this.[subjectSymbol].next(map ? map(value) : value);
      },
      get: () => {
        if (!this[subjectSymbol]) {
          this[subjectSymbol] = new ReplaySubject<T>(1);
          this[symbol] = this[subjectSymbol].asObservable();
        }

        return this[symbol];
      }
    })
  }
}
```

Sau đó thay vì đống get, set trên thì chỉ cần

```typescript
@ObservableBinding()
@Input('url') url$: Observable<string>;

@ObservableBiding((value: number) => value * 2)
@Input('count') count$: Observable<number>;
```

Cơ bản ý tưởng chỉ có vậy, nếu bạn thích `rxjs` như mình và thích dùng nó nhiều nhất có thể thì đây là một hướng đi mà bạn có thể cân nhắc. Nếu `rxjs` là lý do bạn code Angular như mình thì còn chờ gì nữa mà không lên github cho `rxjs` một star sẵn tiện unstar Angular luôn 😬

#### Hy vọng bạn thấy bài viết này bổ ích 💕

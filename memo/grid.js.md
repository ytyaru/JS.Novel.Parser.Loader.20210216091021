# Grid.js

## event が２つしかない

* `cellClick`
* `rowClick`

　情報源は以下。

* https://gridjs.io/docs/examples/event-handler
    * https://github.com/grid-js/gridjs/blob/master/packages/gridjs/src/view/table/events.ts

　行選択したい。マウスオーバーしたとき選択する行をハイライトしたかった。しかしマウスオーバーイベントがない。

## 複数列キーソート

　Shiftキーでできる。だが第2キーなどキーの順序が表示されないためわかりづらい。

* https://gridjs.io/docs/examples/multi-sort/

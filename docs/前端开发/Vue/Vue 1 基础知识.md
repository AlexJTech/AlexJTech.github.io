# 1 CDN 导入

https://www.jsdelivr.com/package/npm/vue 打开页面可以复制导入

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.min.js"></script>
```

![](Vue%201%20基础知识.assets/image-20240331235052081.png)



# 2 文本插值

在 Vue. js 中, `{{}}` 是一种文本插值语法, 主要作用是在 HTML 模板中渲染数据。它可以用来动态地将 Vue 实例中定义的数据绑定到视图上。

具体作用如下:

1. **展示数据**

最基本的用途就是展示数据, 例如:

```html
<div id="app">
  <p>{{ message }}</p>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>
```

上面代码中, `{{ message }}` 会被 Vue 自动替换为 `data` 对象中 `message` 属性对应的值。

2. **支持 JavaScript 表达式**

插值中不仅可以简单地绑定数据, 还可以编写 JavaScript 表达式, 例如:

```html
<div id="app">
  <p>{{ message.split('').reverse().join('') }}</p>
</div>
```

上面代码会对 `message` 做字符串反转操作后再渲染。

3. **插值会跳过 HTML 解析**

在使用双大括号时，提供的值插入到了 HTML 中，会被作为文本解析，而非 HTML 代码。如果需要渲染 HTML 代码，应该使用 `v-html` 指令。

```html
<div id="app">
  <!-- 能正确地渲染HTML内容 -->
  <p v-html="rawHtml"></p>  
  <!-- 这里只会显示HTML代码 -->
  <p>{{ rawHtml }}</p>  
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      rawHtml: '<span style="color: red">This should be red.</span>'
    }
  })
</script>
```

总的来说, `{{}}` 语法提供了一种简单而无侵入的文本插值方式, 可以方便地将 Vue 实例的数据渲染到视图模板中。在日常开发中, 我们会广泛使用它来展示动态数据。




# 3 字符串插值

`userName: ${this.userName}` 这个语法是 ES 6 中模板字符串的一种用法, 也被称为字符串插值。

在模板字符串中, 可以使用 `${expression}` 这种形式来嵌入任意的 JavaScript 表达式, 表达式的结果会被计算, 然后与周围的字符串拼接在一起。

例如:

```js
const userName = 'John'
console.log(`Hello, my name is ${userName}`) // 输出 "Hello, my name is John"
```

在上面的代码中, `${userName}` 会被替换为变量 `userName` 的值 "John", 最终输出 "Hello, my name is John"。

如果表达式是一个对象的属性, 也可以直接嵌入:

```js
const user = {
  name: 'John',
  age: 30
}

console.log(`User info: ${user.name}, ${user.age}`) // 输出 "User info: John, 30"
```

这种语法在 Vue 模板中也可以使用, 例如:

```html
<div>{{ `Name: ${user.name}, Age: ${user.age}` }}</div>
```

或者:

```html
<div :title="`User: ${user.name}`">{{ user.name }}</div>
```

模板字符串可以跨多行, 内嵌任意表达式, 使代码更加简洁、可读性更高。在处理 HTML 字符串拼接时也非常有用。



# 4 HTML 插值

HTML 插值指的是在 HTML 模板中动态嵌入变量或表达式的技术。这在构建现代 Web 应用程序时非常有用,可以让我们更轻松地将数据与 UI 绑定,而无需手动操作 DOM 元素。

不同的框架和库提供了不同的插值语法,但通常都使用一些特殊的占位符或标记来表示插值位置。以下是一些常见的 HTML 插值方式:

1. **双大括号插值 (Vue.js)**

在 Vue.js 中,可以使用双大括号语法在模板中渲染数据:

```html
<span>{{ message }}</span>
```

双大括号内部可以写入 JavaScript 表达式,Vue 会对其求值并插入到标记位置。

2. **JSX 插值 (React)**

在基于 JSX 语法的框架中,如 React,插值通常使用大括号语法:

```jsx
<h1>Hello, {user.name}</h1>
```

大括号内部可以是任何 JavaScript 表达式,它会被计算并在渲染时插入。

3. **ng 插值 (Angular)**

Angular 使用 `{{expression}}` 的语法进行插值:

```html
<p>{{message}}</p>
```

与 Vue.js 类似,插值中可以包含任何有效的模板表达式。

4. **ES6 模板字符串**

虽然不是专门为 HTML 插值设计的,但 ES6 引入的模板字符串也可以用于拼接 HTML:

```js
const name = 'John';
const html = `<div>Hello, ${name}</div>`;
```

需要注意的是,使用模板字符串进行 HTML 拼接时,需要格外小心避免 XSS 攻击。

5. **DOM 操作**

在不使用框架或库的情况下,也可以通过直接操作 DOM 实现插值:

```js
const element = document.getElementById('message');
element.textContent = 'Hello, World!';
```

这种方式虽然灵活,但需要手动维护 UI 与数据之间的同步,代码可能会变得冗长和难以维护。

插值的出现使得在 Web 应用程序中集成动态数据变得更加简单和高效。选择合适的框架或库,并掌握其插值语法,有助于编写出更加健壮和可维护的前端代码。



# 5 HTML 代码插值

HTML 代码插值是指在 HTML 模板中动态渲染 HTML 代码片段或元素的技术。由于直接在插值中渲染 HTML 是一个安全风险(XSS 攻险),所以大多数现代框架都提供了专门的指令或语法来做这件事。

以 Vue.js 为例:

1. **v-html 指令**

Vue提供了 `v-html` 指令用于渲染 HTML 代码片段:

```html
<div id="app">
  <p>Using text interpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      rawHtml: '<span style="color: red">This should be red.</span>'
    }
  })
</script>
```

在这个例子中，使用双大括号 `{{ rawHtml }}` 插值只会把 HTML 代码渲染为普通文本，而 `<span v-html="rawHtml"></span>` 则会渲染出 HTML 元素及其样式效果。

2. **Render 函数**

在 Vue 中，我们还可以使用 Render 函数来完全编程化地渲染 HTML:

```js
new Vue({
  render(h) {
    return h('div', [
      h('span', 'Hello'),
      h('span', { style: { color: 'red' } }, 'World')
    ])
  }
}).$mount('#app')
```

这种方式虽然比模板复杂，但在需要完全的代码逻辑控制时会很有用。

在 React 中也有类似的方法:

```jsx
function HelloWorld() {
  const html = '<span style="color: red">This is red</span>';
  return (
    <div>
      {/* 将普通文本渲染为HTML */}
      <span dangerouslySetInnerHTML={{ __html: html }} />

      {/* 直接插入JSX元素 */}
      <span style={{ color: 'red' }}>This is red too</span>
    </div>
  );
}
```

React使用 `dangerouslySetInnerHTML` 这个 prop 来渲染 HTML 字符串，也可以直接插入 JSX 元素。

总之，HTML 代码插值为前端渲染带来了更大的灵活性和动态性。但同时，由于其潜在的安全风险，我们需要谨慎使用并遵循框架提供的安全指导原则。


# 6 数据绑定

Vue. js 提供了单向数据绑定和双向数据绑定两种机制, 以及强大的条件渲染功能。

## 6.1 单向数据绑定

单向数据绑定是指只能通过 JavaScript 代码更新数据模型, 视图会自动更新以反映模型的变化。我们前面讲的 `{{ }}` 文本插值就是单向绑定的一个示例。

## 6.2 双向数据绑定

双向数据绑定则允许通过用户界面更新数据模型。Vue 通过 `v-model` 指令实现双向绑定:

```html
<div id="app">
  <input v-model="message">
  <p>{{ message }}</p>
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>
```

上例中, 输入框 `v-model` 绑定了 `message` 数据, 输入会自动更新数据, 数据变化也会更新输入框的值。

## 6.3 与 v-bind 的异同

`v-bind` 和 `v-model` 是 Vue.js 中两个常用的指令，它们分别用于不同的场景，但在某些方面也有相似之处。

### 6.3.1 相同之处：

1. **都是指令**：
   - `v-bind` 和 `v-model` 都是 Vue.js 提供的指令，用于对 DOM 元素进行操作和绑定数据。

2. **双向绑定**：
   - `v-bind` 和 `v-model` 都支持双向绑定，可以将 Vue 实例中的数据绑定到 DOM 元素上，实现数据的同步更新。

### 6.3.2 不同之处：

1. **用法**：
   - `v-bind` 用于将 Vue 实例中的数据动态地绑定到 HTML 属性上，例如 `:href`、`:class`、`:style` 等。
   - `v-model` 用于在表单元素上创建双向数据绑定，通常用于 `<input>`、`<textarea>`、`<select>` 等表单元素上。

2. **作用**：
   - `v-bind` 用于单向数据绑定，将 Vue 实例中的数据绑定到 HTML 属性上，只能实现数据的从 Vue 实例到 DOM 元素的单向传递。
   - `v-model` 用于实现表单元素与 Vue 实例中数据的双向绑定，不仅可以将 Vue 实例中的数据动态地显示在表单元素上，还可以将用户的输入同步到 Vue 实例中的数据中。

### 6.3.3 示例用法：

```html
<!-- 使用 v-bind 将数据绑定到 HTML 属性上 -->
<a v-bind:href="url">Link</a>
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

<!-- 使用 v-model 实现双向数据绑定 -->
<input v-model="message" type="text">
<textarea v-model="message"></textarea>
<select v-model="selectedOption">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

在实际开发中，`v-bind` 和 `v-model` 通常会结合使用，用于实现复杂的数据绑定和交互效果。

# 7 修饰符

下表总结了 Vue.js 中常用的修饰符及其用法：

| 修饰符        | 用法                                              | 描述                                 |
| ---------- | ----------------------------------------------- | ---------------------------------- |
| `.stop`    | `<button @click.stop="handleClick">`            | 阻止事件继续传播，即阻止事件冒泡。                  |
| `.prevent` | `<form @submit.prevent="handleSubmit">`         | 阻止默认事件行为。                          |
| `.capture` | `<div @click.capture="handleClick">`            | 使用事件捕获模式进行事件监听。                    |
| `.self`    | `<div @click.self="handleClick">`               | 只有在事件的目标对象是元素本身时，才触发事件处理函数。        |
| `.once`    | `<button @click.once="handleClick">`            | 事件将只会触发一次，之后将自动移除事件监听器。            |
| `.passive` | `<div @scroll.passive="handleScroll">`          | 使用被动事件监听器，可以提高滚动性能。                |
| `.native`  | `<child-component @click.native="handleClick">` | 在子组件上监听父组件传递的原生 DOM 事件。            |
| `.sync`    | `<input v-model:sync="value">`                  | 双向绑定父组件和子组件的数据。                    |
| `.lazy`    | `<input v-model.lazy="value">`                  | 将输入事件转换为 `change` 事件，默认在失去焦点时同步数据。 |
| `.trim`    | `<input v-model.trim="value">`                  | 去除输入框中的首尾空格。                       |
| `.number`  | `<input v-model.number="value">`                | 将输入值转换为数字类型。                       |
| `.camel`   | `<child-component :foo-bar.camel="value">`      | 将属性名转换为驼峰命名格式。                     |

这些修饰符可以根据需要灵活地应用于 Vue.js 的指令中，帮助我们更加方便地控制和处理 DOM 事件、数据绑定等操作。


# 8 条件渲染

条件渲染是通过条件判断选择性地渲染某些元素或组件。Vue 提供了 `v-if`、`v-else`、`v-else-if`、`v-show` 等指令。

> 如果想渲染后不再改变可以使用 `v-once` 指令实现，插值只会实现一次

1. `v-if` 根据表达式的真假来有条件地渲染元素:

```html
<div v-if="show">Hello</div>
```

2. `v-else` 为 `v-if` 添加"else 块"

3. `v-else-if` 在 `v-else` 之前添加额外的条件判断

4. `v-show` 根据表达式的真假来切换元素的显示状态,

```html
<div id="app">
  <div v-if="score >= 90">
    A
  </div>
  <div v-else-if="score >= 80">
    B 
  </div>
  <div v-else-if="score >= 60">
    C
  </div>
  <div v-else>
    D
  </div>

  <div v-show="show">Hello</div>
</div>

<script>
var app = new Vue({
  el: '#app', 
  data: {
    score: 85,
    show: true
  }
})
</script>
```

## 8.1 template 分组

推荐使用 template 进行分组，因为在 HTML 渲染的时候不会渲染 template 便签本身



## 8.2 `v-show` 指令

`v-show` 不支持 template 模版，也不可以和 ` v-else` 结合使用

`v-if` 才是真正意义的条件渲染，而 `v-show` 只是视觉上的条件渲染，无论设置的条件真值，当前的元素都会被渲染，`v-show` 只是切换 CSS 中的 `display: none;` 属性来实现展示效果



# 9 循环渲染

```html
<body>
    <div id="Application">
        <ul>
            <li v-for="item in items">
                <div>{{ item.name }}</div>
                <div>{{ item.phoneNumber }}</div>
            </li>
        </ul>
        <button @click="click">
            逆序
        </button>
    </div>
    <script>
        const App = {
            data() {
                return {
                    items: [
                        { name: "Alice", phoneNumber: "123-456-7890" },
                        { name: "Bob", phoneNumber: "456-789-0123" },
                        { name: "Charlie", phoneNumber: "789-012-3456" }
                    ]
                }
            },
            methods: {
                click() {
                    this.items.reverse();
                }
            }
        };
        Vue.createApp(App).mount("#Application");
    </script>
</body>
```

在实际开发中，不能直接渲染列表到页面，通常需要进行而外的处理：

```html
<ul>
    <li v-for="(item, index) in handle(list)">
        <div>{{ index + "." + item.name }}</div>
        <div>{{ item.phoneNumber }}</div>
    </li>
</ul>
```

```js
handle(l) {
	return l.filter(obj => obj.name != "Bob");
}
```

当同时渲染多个元素时，与 v-if 指令相似，常用 template 标签进行包装




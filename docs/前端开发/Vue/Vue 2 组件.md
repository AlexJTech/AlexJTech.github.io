
# 1 I Vue 组件属性

## 1.1 计算属性与函数


### 1.1.1 计算属性定义

使用 `computed` 选项定义计算属性

```js
const App = {
	...
	computed: {
		type() {
			return.count > 10 ? "大" : "小";
		}
	}
}
```



### 1.1.2 计算属性赋值

实现计算属性的赋值与取值

```js
const App = {
	...
	computed: {
		type: {
			// 实现计算属性的取值
			get() {
				return this.count > 10 ? "大" : "小";
			}
			// 实现计算属性的set方法，用来设置值
			set(newValue) {
				if (newValue == "大") {
					this.count = 11;
				} else {
					this.count = 0;
				}
			}
		}
	}
}
```

可以直接使用**组件实例**计算属性 type 值的赋值，赋值会调用我们定义的 set 方法，从而实现对存储属性 count 的修改：
```js
let instance Vue.createApp(App).mount("#Application");
// 初始值为0
console.log(instance.count);
// 初始值为小
console.log(instance.type);
// 对计算属性进行修改
instance.type = "大";
// 打印结果 11
console.log(instance.count);
```

> 需要注意的是，当只实现了 get 方法，没有实现 set 方法的计算属性，被称为**只读属性**


### 1.1.3 总结

- 计算属性：基于所依赖的存储属性值的变化而重新计算，计算结束后结果会缓存，只有所依赖的属性发生变化，才会重新进行计算；
- 函数：每次访问其都要进行重新执行函数内的逻辑代码得到结果



## 1.2 属性侦听器

用于监听某个属性的变化，完成复杂的业务逻辑，譬如搜索引擎：
![](Vue%202%20组件.assets/image-20240402161026571.png)


通过 `watch` 选项定义属性侦听器：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>属性侦听器</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.min.js"></script>
</head>

<body>
    <div id="Application">
        <input v-model="searchText" />
    </div>
    <script>
        const App = {
            data() {
                return {
                    searchText: "",
                }
            },
            watch: {
                searchText(oldValue, newValue) {
                    if (newValue.length > 10) {
                        alert("文本太长了")
                    }
                }
            }
        }
        Vue.createApp(App).mount("#Application");
    </script>
</body>

</html>
```



## 1.3 函数限流


用于处理用户频繁的操作，常见的限流方案是根据时间间隔进行限流，即在制定的时间间隔内不允许重复执行同一个函数。


### 1.3.1 I.3.1 手动函数限流


**思想**：使用一个变量来控制按钮事件是否可以触发，在触发按钮事件时，对此变量进行修改，并使用 `setTimeout` 函数来控制 2 秒好将变量的值恢复。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>限流函数</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.min.js"></script>
</head>

<body>
    <div id="Application">
        <button @click="click">按钮</button>
    </div>
    <script>
        const App = {
            data() {
                return {
                    throuttle: false,
                }
            },
            methods: {
                click() {
                    if (!this.throuttle) {
                        console.log(Date());
                    } else {
                        return;
                    }
                    this.throuttle = true;
                    setTimeout(() => {
                        this.throuttle = false;
                    }, 2000);
                }
            }
        }
        Vue.createApp(App).mount("#Application");
    </script>
</body>

</html>
```

通过上面的手动限流可以实现，无论按钮被点击了多少次，打印方法按照 2 秒最多执行 1 次的频率进行限流。但是，在具体的业务开发的流程中，限流只是一种通用的逻辑，可以将限流封装成为单独的工具方法：

```js
var throuttle = false;
function throuttleTool(callback, timeout) {
	if(!throuttle) {
		callback();
	} else {
		return;
	}
	throuttle = true;
	setTimeout(() => {
		throuttle = false;
	}, timeout)
}
const App = {
	methods: {
		click() {
			trouttleTool(() => {
				console.log(Date());
			}, 2000) // 两秒
		}
	}
}
```

现在只需要在需要的方法逻辑内使用手写的限流函数即可实现**限流操作**


### 1.3.2 I.3.2 使用 Lodash 库进行函数限流

Lodash 是一款高性能的 JavaScript 库。其中提供了 debounce 函数来进行方法的调用限流，使用前，需要先引入 Lodash 库：

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
```

`_.debounce` 是 Lodash 库中的一个函数，用于延迟执行一个函数，并且在连续触发函数调用时只执行一次。下面来详细介绍 debounce 的原理和用法，并拓展一些相关知识点：

#### 3.2.1 I.3.2.1 原理：

1. **延迟执行**：
   - 当调用 debounce 包装后的函数时，不会立即执行函数，而是等待一段指定的时间间隔后执行。

2. **连续调用合并**：
   - 如果在等待时间间隔内连续调用了 debounce 包装后的函数，则会忽略前面的调用，只执行最后一次调用。

3. **定时器**：
   - debounce 使用定时器来延迟执行函数，每次调用时会清除之前的定时器，并设置新的定时器。

#### 3.2.2 I.3.2.2 用法：

1. **基本用法**：
   - 使用 `_.debounce` 将一个函数包装起来。
   - 可以传入第二个参数来指定等待的时间间隔。

```javascript
// 包装函数
let debouncedFunction = _.debounce(function() {
    console.log('Function debounced');
}, 2000);

// 调用包装后的函数
debouncedFunction();
```

2. **应用场景**：
   - 输入框搜索建议：当用户输入时，延迟一段时间后再进行搜索，以避免频繁的网络请求。
   - 按钮点击防抖：当用户连续点击按钮时，只执行一次点击事件处理函数，避免多次点击导致的重复操作。

#### 3.2.3 I.3.2.3 拓展：

1. **立即执行**：
   - debounce 函数默认会在第一次调用时立即执行函数，可以传入第三个参数 `{ leading: false }` 来禁用此行为，使得第一次调用不立即执行。

2. **取消延迟**：
   - 可以通过返回的函数来取消延迟执行，即使在等待时间内也可以取消。

3. **最大等待时间**：
   - 可以传入第三个参数 `{ maxWait: 5000 }` 来设置最大等待时间，即使连续调用间隔超过了指定的等待时间，也会执行函数。

```javascript
// 立即执行，并且取消延迟
let debouncedFunction = _.debounce(function() {
    console.log('Function debounced');
}, 2000, { leading: true });

// 取消延迟执行
debouncedFunction.cancel();
```

`_.debounce` 函数在实际开发中非常有用，能够有效地控制函数的执行频率，提升用户体验和性能。


## 1.4 表单数据的双向绑定


### 1.4.1 文本输入框


使用 v-model 指令即可直接绑定：
```html
<body>
    <div id="Application">
        <input v-model="textField" />
        <p>文本输入框: {{ textField }}</p>
    </div>
    <script>
        const App = {
            data() {
                return {
                    textField: "",
                }
            }
        }
        Vue.createApp(App).mount("#Application");
    </script>
</body>
```


### 1.4.2 多行文本输入区域


```html
<textarea v-model="textarea" cols="30" rows="10"></textarea>
<p style="white-space: pre-line;">多行文本内容: {{ textarea }}</p>
```

> p 标签的样式为了可以显示多行文本


在 Vue.js 中，可以通过 `v-model` 指令将表单元素与 Vue 实例中的数据进行双向绑定。但是，在 `<textarea>` 元素上直接使用 `v-model` 指令并同时插入表达式 `{{ textarea }}` 是不正确的用法。

在 `<textarea>` 元素上使用 `v-model` 指令时，Vue.js 会自动将其绑定到指定的数据属性，而不需要再使用插值表达式 `{{ textarea }}` 来显示绑定的数据。正确的用法是：

```html
<textarea v-model="textarea"></textarea>
```

这样，Vue 实例中的 `textarea` 数据属性会与 `<textarea>` 元素的内容进行双向绑定，无需额外使用插值表达式来显示内容。

如果你希望在 `<textarea>` 中显示绑定的数据，可以将 `textarea` 数据属性初始化为需要显示的文本，或者在其他地方使用插值表达式来显示。例如：

```html
<textarea v-model="textarea"></textarea>
<p>{{ textarea }}</p>
```

这样，`<textarea>` 中的内容会与 `textarea` 数据属性双向绑定，同时 `<p>` 元素中会显示相同的文本内容。



### 1.4.3 复选框和单选框


1. **只有一个复选框时**

```html
<input>
```
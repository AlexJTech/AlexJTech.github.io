
# 1 访问修饰符

访问修饰符 public main 必须加上



# 2 类名规则
Java 中所有的内容必须放在类中，类名标准命名是类似于 CamelCase 的骆驼命名法

Java 源代码的文件名必须和公共类的名字相同，即如果你创建了一个 `Welcome` 类，你的源代码文件名必须为 `Welcome.java` 否则会出现错误




# 3 终止程序
如果想以其他退出码终止程序，必须使用 `System.exit` 方法




# 4 注释
和 C++ 的注释差不多，都使用 `//`、`/* */`
需要特别注意的是，`/* */` 内不能够嵌套注释




# 5 数据类型
4 种整型、2 种浮点型、1 种字符型和 1 种布尔型




## 5.1 整型

| 类型  | 存储需求 |
|:-----:|:--------:|
|  int  |  4 字节  |
| short |  2 字节  |
| long  |  8 字节  |
| byte  |  1 字节  |

Java 中整型的范围于运行的 Java 代码的机器无关

> **C++ 中，int 和 long 等类型的大小与目标平台相关**。在 8086 这样的 16 位处理器上，整数占 2 字节；不过在 32 位处理器上（比如 Pentium 或者 SPARC）整数为 4 字节。类似地，在 32 位处理器上，long 值为 4 字节，64 位则为 8 字节。
> **Java 没有无符号类型**




## 5.2 浮点类型

|  类型  | 存储需求 |
|:------:|:--------:|
| float  |  4字节   |
| double |  8字节   |

所有的浮点数都遵循 IEEE 754 规范，存在三个特殊值：

|    特殊浮点值     |         对应常量         |
| :---------------: | :----------------------: |
|     正无穷大      | Double.POSITIVE_INFINITY |
|     负无穷大      | Double.NEGATIVE_INFINITY |
| NaN（不是一个数） |        Double.NaN        |

> 所有的 NaN 的值都被认为是**不相同的**。可以使用 `Double.isNaN` 方法来进行判断

> 如果用来精确计算，不想出现误差，应该使用 `BigDecimal` 类



## 5.3 char 类型

采用 UTF-16 编码表示 Unicode 码点的一个代码单元
char 类型的字面值使用单引号 `'A'` 是编码值为 65 的字符，而 `"A"` 是包含一个字符的字符串

| 转义字符     | 含义      |
| -------- | ------- |
| \u       | Unicode |
| \n       | 换行      |
| \r       | 回车      |
| \f       | 换页      |
| \s       | 空格      |
| \newline | 连接行     |


## 5.4 boolean 类型
布尔类型有两个值：`true` 和 `false`

> 整数值和布尔值之间不能互相转换

在 C++ 中，数值甚至指针都可以代替布尔值，值为 0 相当于布尔值 false。**而在 Java 中不是这样**，在 C++ 中，`if (x = 0) ...` 可以通过编译，结果都是 false，而 Java 中则无法通过编译
```java
package welcome;
public class Welcome {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int x;
		if (x = 0) {
		}
	}
}
```
![](1%20Java%20基础知识概念.assets/image-20240324223634266.png)

# 6 变量与常量

初始化变量，可以直接赋值

> 从 Java 10 开始，对于局部变量可以通过变量的初始值判断出类型，只需要使用关键字 var 而无需指定类型：
> `var a = 12`
> 这个特性能够使得对象声明更加简洁

在 C++ 中变量的声明和定义会进行区分，如
`int i = 10;` 是定义，
`extern int i;` 是声明，
在 Java 中不需要区分变量的定义和声明

## 6.1 常量

Java 中可以使用关键字 final 指示常量。如：
```Java
public class Constants
{
	public static void main(String[] args)
	{
		final double CM_PER_INCH = 2.54;
		double paperwidth = 8.5;
		...
	}
}
```
关键字 **final** 表示这个变量**只能被赋值一次**。一旦被赋值，就不能进行更改。在 C++ 中 final 则可以用来类方法的定义，表示该方法不能被子类重写（override），const 与 Java 中的 final 用法较为相像

### 6.1.1 类常量

在一个类的多个方法可以使用，使用 `static final` 设置一个类常量，如果变量在声明为 `public`，那么其他类方法也可以使用这个常量

## 6.2 枚举类型

枚举类型包括有限个命名值，例如：
```java
enum Size { SMALL, MEDIUM, LARGE };
```
现在可以声明这种类型
```Java
Size s = Size.MEDIUM
```



# 7 静态方法


静态方法被称为**函数**。修饰符 `static` 将这类方法与实例方法区分开



# 8 运算符

静态方法：形如 `Math.sqrt()`

`floorMod` 解决一个长期存在的有关整数余数的问题
```Java
floorMod(position + adjustment, 12)
```
总是会得到一个 0~11 之间的数（需要注意的是，对于负除数，floorMod 会得到负数结果，不过在实际应用中不常出现）

> 最好不要在程序中使用 char 类型，除非确实需要处理 UTF-16 代码单元，最好将字符串作为**抽象数据类型进行处理**

`Math` 类提供了常用的函数：

|   函数   |                        具体                         |
| :------: | :-------------------------------------------------: |
| 三角函数 | Math.sin, Math.cos, Math.tan, Math.atan, Math.atan2 |
| 指数函数 |           Math.exp, Math.log, Math.log10            |
|   常量   |                   Math.PI, Math.E                   |
不必在数学方法名和变量名前面加 Math，只要在源文件最上面导入 Math 包就行：（静态导入）
```java
import static javva.lang.Math.*;
```

> 如果想要达到完全可预测的结果，应该使用 StrictMath 代替 Math，确保在所有平台都能得到一样的结果。

## 8.1 Math 安全的整数运算

Math 提供了一些方法用于安全的整数运算：

| 运算 |      方法      |
|:----:|:--------------:|
| 乘法 | multiplyExact  |
| 加法 |    addExact    |
| 减法 | subtractExact  |
| 加 1 | incrementExact |
| 减 1 | decrementExact |
| 反号 |  negateExact   |
| 除法 |    absExact    |
## 8.2 数值类型之间的转换

![](1%20Java%20基础知识概念.assets/image-20240325030527129.png)

虚线箭头表示有损失精度

## 8.3 强制类型转换

```java
double x = 9.997;
int nx = (int) x;
```
这样 nx 的值就变成 9，如果想要舍入，可以使用 Math 类的 round 方法，返回 long 类型的，由于存在信息丢失的可能，只能使用显式的强制类型转换才能将一个 long 值赋给 int 类型的变量。
```java
double x = 9.997;
int nx = (int) Math.round(x);
```
现在 nx 的值为 10。

> 不建议对 boolean 变量强制类型转换，可能会出现错误



## 8.4 关系和 boolean 运算符

**需要明确**：
`&&` 和 `||` 是按照“短路”的方式求值的，如果第一个表达式能够确定表达式的值，那么第二个表达式将不必计算
而 `&` 和 `|` 不是通过“短路”实现的，因此两个表达式都需要计算

## 8.5 条件运算符

Java 提供了 condithional ?: 运算符
`condition ? expression1 : expression2`
如果 condition 为 true 则计算 expression 1，反之计算 expression 2。


## 8.6 switch 表达式

对比 C++ 与 Java 中 switch 的不同：

- C++：
```c++
#include <iostream>
using namespace std;

int main() {
    int choice;
    cout << "Enter your choice (1, 2, 3): ";
    cin >> choice;

    switch(choice) {
        case 1:
            cout << "You chose option 1" << endl;
            break;
        case 2:
            cout << "You chose option 2" << endl;
            break;
        case 3:
            cout << "You chose option 3" << endl;
            break;
        default:
            cout << "Invalid choice" << endl;
    }

    return 0;
}
```

- Java：
1. 直接输出型：
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your choice (1, 2, 3): ");
        int choice = scanner.nextInt();

        switch(choice) {
            case 1:
                System.out.println("You chose option 1");
                break;
            case 2:
                System.out.println("You chose option 2");
                break;
            case 3:
                System.out.println("You chose option 3");
                break;
            default:
                System.out.println("Invalid choice");
        }
    }
}
```

2. 返回值型：
使用 `->` 即可指定返回值
```java
public class Main {
    public static void main(String[] args) {
        String name = switch (getChoice()) {
            case 1 -> "John";
            case 2 -> "Alice";
            case 3 -> "Bob";
            default -> "Unknown";
        };

        System.out.println("Name: " + name);
    }

    public static int getChoice() {
        // 假设此处是从用户输入或其他逻辑中获取选择的方法
        return 2; // 返回一个假设的选择
    }
}
```

如果操作数位 null 时，会抛出一个 NullPointerException 异常



## 8.7 位运算符

| 运算符 | 用法 |
| :----: | :--: |
|   &    | and  |
|   \|   |  or  |
|   ^    | xor  |
|   ~    | not  |

### 8.7.1 移位运算符

`>> 1` 右移 1 位相当于除 2，高位补符号位
`<< 2` 左移 2 位相当于乘 $2^2$ 
`>>> 1` 右移 1 位，高位补 0

> 没有 `<<<`



# 9 字符串

Java 字符串就是 Unicode 字符序列

## 9.1 子串

String 类的 substring 方法可以从较大的字符串中提取出一个子串，如
```java
String greeting = "Hello";
String s = greeting.substring(0, 3);
```
表示从 0 开始到 3 结束（不包含 3）

substring 的优点：容易计算子串的长度（3-0 = 3）


## 9.2 拼接

Java 允许使用 + 号拼接两个字符串，当将一个非字符串的值与一个字符串相拼接的时候，非字符串会转变成字符串



## 9.3 字符串不可变

Java 规定 String 类对象是不可变的（immutable）
而，C++ 中 string 对象的字符串是可修改的



## 9.4 检测字符串是否相等

使用 `equals` 方法检测是否相等
`equalsIgnoreCase` 检测不分大小写，字符串是否相等

> 对于 C++ 来说，重载了 string 类的 == 运算符，可以直接使用 == 来判断字符串是否相等，而 C 来说，使用 strcmp 来判断是否相等。Java 的 compareTo 方法类似于 strcmp，使用如下：
> `if (greeting.compareTo("Hello") == 0)`



## 9.5 空串与 Null 串

空串 "" 是长度为 0 的字符串，可以使用 str. length() 来检查是否为空
String 类也可以存放一个特殊值 null

判定一个字符串是否为 null，可以使用：
```java
if (str == null)
```
检查一个字符串就是 null 也不是空串，可以使用：
```java
if (str != null && str.length() != 0)
```
（如果在 null 上调用方法会报错）



## 9.6 码点与代码单元

-  `length()` 方法将返回采用 UTF-16 编码的代码单元个数
-  `codePointCount()` 将得到实际长度，即码点个数
-  `charAt(n)` 将返回位置 n 的代码单元，如
```java
char first = greeting.charAt(0); // first is "H"
```
- 要想得到第 i 个码点，可以：
```java
int index = greeting.offsetCodePoints(0, i);
int cp = greeting.codePointAt(index);
```


## 9.7 String 类常用 API

 Java 中 `String` 类常用的 API 及其功能：

| 方法                                                       | 描述                               |
| :------------------------------------------------------- | -------------------------------- |
| `length()`                                               | 返回字符串的长度。                        |
| `charAt(int index)`                                      | 返回指定索引处的字符。                      |
| `isEmpty()`                                              | 判断字符串是否为空（长度为 0）。                |
| `equals(Object obj)`                                     | 比较字符串是否相等。                       |
| `equalsIgnoreCase(String another)`                       | 忽略大小写比较字符串是否相等。                  |
| `compareTo(String another)`                              | 比较字符串与另一个字符串的大小关系。               |
| `compareToIgnoreCase(String another)`                    | 忽略大小写比较字符串与另一个字符串的大小关系。          |
| `startsWith(String prefix)`                              | 判断字符串是否以指定的前缀开始。                 |
| `endsWith(String suffix)`                                | 判断字符串是否以指定的后缀结束。                 |
| `indexOf(int ch)`                                        | 返回指定字符在字符串中第一次出现的索引。             |
| `indexOf(int ch, int fromIndex)`                         | 返回指定字符在字符串中从指定位置开始的第一次出现的索引。     |
| `indexOf(String str)`                                    | 返回指定子字符串在字符串中第一次出现的索引。           |
| `indexOf(String str, int fromIndex)`                     | 返回指定子字符串在字符串中从指定位置开始的第一次出现的索引。   |
| `lastIndexOf(int ch)`                                    | 返回指定字符在字符串中最后一次出现的索引。            |
| `lastIndexOf(int ch, int fromIndex)`                     | 返回指定字符在字符串中从指定位置开始的最后一次出现的索引。    |
| `lastIndexOf(String str)`                                | 返回指定子字符串在字符串中最后一次出现的索引。          |
| `lastIndexOf(String str, int fromIndex)`                 | 返回指定子字符串在字符串中从指定位置开始的最后一次出现的索引。  |
| `substring(int beginIndex)`                              | 返回从指定索引开始到字符串末尾的子字符串。            |
| `substring(int beginIndex, int endIndex)`                | 返回从指定的开始索引到指定的结束索引之间的子字符串。       |
| `toLowerCase()`                                          | 将字符串中的所有字符转换为小写。                 |
| `toUpperCase()`                                          | 将字符串中的所有字符转换为大写。                 |
| `trim()`                                                 | 返回字符串的副本，去除字符串前后的空白。             |
| `replace(char oldChar, char newChar)`                    | 将字符串中的指定字符替换为新的字符。               |
| `replace(CharSequence target, CharSequence replacement)` | 将字符串中的指定子字符串替换为新的子字符串。           |
| `split(String regex)`                                    | 根据给定的正则表达式拆分字符串。                 |
| `concat(String str)`                                     | 将指定的字符串连接到该字符串的末尾。               |
| `join(CharSequence delimiter, CharSequence... elements)` | 使用指定的分隔符连接多个字符串。                 |
| `contains(CharSequence s)`                               | 判断字符串是否包含指定的字符序列。                |
| `startsWith(String prefix, int toffset)`                 | 判断字符串从指定位置开始是否以指定的前缀开始。          |
| `endsWith(String suffix)`                                | 判断字符串是否以指定的后缀结束。                 |
| `matches(String regex)`                                  | 判断字符串是否匹配指定的正则表达式。               |
| `replaceAll(String regex, String replacement)`           | 使用给定的替换替换字符串中所有匹配给定的正则表达式的子字符串。  |
| `replaceFirst(String regex, String replacement)`         | 使用给定的替换替换字符串中第一个匹配给定的正则表达式的子字符串。 |
| `toCharArray()`                                          | 将字符串转换为字符数组。                     |
| `getBytes()`                                             | 将字符串转换为字节数组。                     |
| `valueOf(Object obj)`                                    | 将给定对象转换为字符串。                     |
| `intern()`                                               | 返回字符串对象的规范化表示形式。                 |


## 9.8 构建字符串

> 使用 String 对象既耗时，又浪费空间。

使用 StringBuilder 类可以避免
```java
StringBuilder builder = new StringBuilder();
```
当需要添加另一部分的时候，调用 `append` 方法
```java
builder.append(ch);
builder.append(atr);
```
当字符串构建完成时候，使用 `toString` 可以得到一个 String 对象

> 如果所有的字符串编辑操作都在单线程操作，使用 `StringBuilder`。反之，使用 `StringBuffer`

`StringBuilder`类常用的API及其功能的总结表格：

| 方法                                                  | 描述                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `StringBuilder()`                                     | 构造一个空的StringBuilder对象。                              |
| `length()`                                            | 返回构造器或缓冲器中的代码单元个数                           |
| `append(String str)`                                  | 将指定字符串添加到此字符序列的末尾。                         |
| `append(char c)`                                      | 将指定字符添加到此字符序列的末尾。                           |
| `appendCodePoint(int codePoint)`                      | 将指定的Unicode代码点附加到此字符序列。                      |
| `delete(int start, int end)`                          | 移除此序列的子字符串中的字符。                               |
| `deleteCharAt(int index)`                             | 移除此序列指定位置的字符。                                   |
| `insert(int offset, String str)`                      | 在指定位置插入字符串。                                       |
| `insert(int offset, char[] str)`                      | 在指定位置插入字符数组。                                     |
| `insert(int offset, Object obj)`                      | 在指定位置插入对象的字符串表示形式。                         |
| `insert(int offset, char[] str, int offset, int len)` | 在指定位置插入字符数组的子数组。                             |
| `reverse()`                                           | 逆转此字符序列。                                             |
| `setCharAt(int index, char ch)`                       | 将指定索引处的字符设置为指定字符。                           |
| `setLength(int newLength)`                            | 设置此字符序列的长度。                                       |
| `subSequence(int start, int end)`                     | 返回一个新的字符序列，该字符序列是此序列的子序列。           |
| `substring(int start)`                                | 返回一个新的字符串，其中包含此字符序列当前所包含的字符的子序列，从指定索引开始。 |
| `substring(int start, int end)`                       | 返回一个新的字符串，其中包含此字符序列当前所包含的字符的子序列，从指定索引开始到指定索引结束。 |
| `toString()`                                          | 返回此序列中数据的字符串表示形式。                           |



## 9.9 文本块


text block 特性（Java 15 新增）
文本块适合包含其他语言编写的代码，如 SQL 或 HTML
```java
String html = """
<div class="Warning">
</div>
"""
```




# 10 输入与输出

希望程序能够接受输入，并适当格式化输出
导包：`import java.util.*;`

## 10.1 读取输入

想要读取输入, 要构建“标准输入流” `System.in` 关联的 Scanner 对象
```java
Scanner in = new Scanner(System.in);
```

-  `nextLine` 读取一行输入
```java
String firstName = in.nextLine();
```

-  `next` 可以读取一个单词（以空白符为分割）
```java
String firstName = in.next();
```

- `nextInt` 可以读取一个整数。同理，`nextDouble` 可以读取一个浮点数

 > 因为 Scanner 类对所有人可见，不可以用于从控制台读取密码，可以使用 Console 类实现读取密码

```java
Console cons = System.console();
String username = cons.readLine("User name: ");
Char[] passswd = cons.readPassword("Password: ");
```
为了安全，将密码存放在一个字符数组中，完成处理后，马上填充值覆盖数组元素

其他 API：
```java
boolean hasNext()  // 检查输入中是否还有其他单词
boolean hasNextInt()
boolean hasNextDouble()  // 检查下一个字符序列是否表示一个整数或者浮点数
```



## 10.2 格式化输出（P 59）

可以使用类 C 的格式化输出
```java
System.out.printf("%8.2f", x);
```
8 表示输出八个字符，2 f 表示精度为 2。输出结果为 `3333.33` 因为包含前面的前导空格。

可以使用静态方法 `String.format` 创建一个格式化的字符串，而不打印输出：
```java
String message = String.format("Hello, %s. Next year, you'll be %d", name, age + 1);
```

> 在 Java 15 中，可以使用 formatted 方法，这样可以少敲 5 个字符

```java
String message = "Hello, %s. Next year, you'll be %d".formatted(name, age + 1);
```


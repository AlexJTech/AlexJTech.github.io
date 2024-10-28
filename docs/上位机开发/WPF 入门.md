## 1 HelloWorld 项目

![](WPF%20入门.assets/Pasted%20image%2020241018202410.png)

在 MainWindow. xaml 的 Grid 容器内，可以使用 TextBlock 标签展示 HelloWorld 文字
![](WPF%20入门.assets/image-20241018202550119.png)

项目管理解释
![](WPF%20入门.assets/image-20241018203144498.png)

### 1.1 App. xaml 与 Application 类

`xaml` 类型的文件包含两部分：
- 以 `xaml` 扩展名结尾的**前端代码**
- 以 `xaml.cs` 扩展名结尾的**后端代码**（也称为**隐藏代码**）

前端代码的全称为 Extensible Application Markup Language，简称 XAML。

前端代码
```xml
//前端代码
<Application x:Class="WpfApp1.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:WpfApp1"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

后端代码
```c#
//后端代码
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace WpfApp1
{
    /// <summary>
    /// App.xaml 的交互逻辑
    /// </summary>
    public partial class App : Application
    {
    }
}

```

这里定义了一个名叫 App 的类型，且修饰符为 `partial` 关键字，标明 `App` 是一个局部类型。最后，App 将继承 Application 父类。

> `partial` 的作用：可以将一个类、结构体、接口或者方法分为多个部分进行声明，xaml 主外，cs 主内，两者合二为一，才能形成一个完整的 App 类型。

![](WPF%20入门.assets/image-20241018204037814.png)

Application 类拥有一些属性、事件、和方法，与过去在 `C#` 学习中碰到的其它类型从结构上没什么不同。摘要显示，Application 类是封装 Windows Presentation Foundation (WPF) 的应用程序。我们开发一款 WPF 应用程序，本质上是去继承了这个类，并创建了一些窗体和对话框，通过 `C#` 语言编写一系列的业务逻辑实现，最终编译成软件交付给用户。

**如何在启动程序时决定先显示哪个窗体呢？**
答案是 Application 类的 StartupUri 属性。StartupUri 属性是 Uri 类型，即统一资源标识符 (URI)，它可以指定应用程序第一次启动时显示的用户界面 (UI)。

**如何在 WPF 应用程序中设计出不同风格的界面？**
答案是，我们只需要将这些设计要素（资源）放在 Application 的 Resources 属性中即可。换句话，我们希望窗体的背景颜色、字体大小、对各种控件所设计的模板样式等内容，全部都只需要放到 Resources 属性中，这样整个应用都会从 Resources 中去获取我们提供的资源，并最终呈现出我们想要的样子。

### 1.2 Application 的生命周期

关于软件的生命周期，是指从启动软件到关闭软件的整个过程。

```xml
//前端代码
<Application x:Class="WpfApp1.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:WpfApp1"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

我们观察一下 HelloWorld 应用程序的 App. xaml 前端代码，`StartupUri="MainWindow.xaml"` 表示本程序第一个启动的窗体是 MainWindow，在**前端代码中按下 F7 将进入到 App 的后端代码**界面，在后端代码中，键入下面这些代码。
```C#
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace WpfApp1
{
    /// <summary>
    /// App.xaml 的交互逻辑
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            Console.WriteLine("1. OnStartup被触发...");
        }

        protected override void OnActivated(EventArgs e)
        {
            base.OnActivated(e);
            Console.WriteLine("2. OnActivated被触发...");
        }

        protected override void OnDeactivated(EventArgs e)
        {
            base.OnDeactivated(e);
            Console.WriteLine("3. OnDeactivated被触发...");
        }

        protected override void OnExit(ExitEventArgs e)
        {
            base.OnExit(e);
            Console.WriteLine("4. OnExit被触发...");
        }
    }
}

```

我们可以明确的看到，在输入信息中所打印的信息按如下的顺序显示：
- 1. OnStartup 被触发
- 2. OnActivated 被触发
- 3. OnDeactivated 被触发
- 2. OnActivated 被触发
- 3. OnDeactivated 被触发
- 4. OnExit 被触发
![](WPF%20入门.assets/image-20241018205227423.png)

#### 1.2.1 结论

当我们启动 WPF 应用时，首先被执行的是 OnStartup 方法，其次是 OnActivated 方法，如果我们把当前应用最小化或者切换到其他应用，这时候 OnDeactivated 会被执行，再切回来再次执行 OnActivated 方法，最后关闭程序时也会执行 OnDeactivated 方法，最后的最后执行 OnExit 方法。

>**Application 的生命周期**：OnStartup->OnActivated->OnDeactivated->OnExit


### 1.3 Window 窗体的生命周期

Window 窗体，其实也是一个控件，一个 Application 应用实例可能会有多个窗体，这些窗体随着用户的操作被创建于内存，最后被销毁于内存。大多数情况下，销毁的请求虽然由用户发起，但最终回收内存则是由 GC 垃圾回收器在干活儿。

![](WPF%20入门.assets/image-20241018205721939.png)

鼠标悬停在 Window 上，按下 F12 可以直接导航到 Window 类的定义
![](WPF%20入门.assets/image-20241018205828526.png)

MainWindow 主要的继承路线图
```
MainWindow -> Window -> ContentControl -> Control -> FrameworkElement -> UIElement -> Visual -> DependencyObject -> DispatcherObject
```

从代码看 MainWindow 的生命周期：
```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp1
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            this.SourceInitialized += (s, e) => Console.WriteLine("1.MainWindow的SourceInitialized被执行");

            this.Activated += (s, e) => Console.WriteLine("2.MainWindow的Activated被执行");

            this.Loaded += (s, e) => Console.WriteLine("3.MainWindow的Loaded被执行");

            this.ContentRendered += (s, e) => Console.WriteLine("4.MainWindow的ContentRendered被执行");

            this.Deactivated += (s, e) => Console.WriteLine("5.MainWindow的Deactivated被执行");

            this.Closing += (s, e) => Console.WriteLine("6.MainWindow的Closing被执行");

            this.Closed += (s, e) => Console.WriteLine("7.MainWindow的Closed被执行");

            this.Unloaded += (s, e) => Console.WriteLine("8.MainWindow的Unloaded被执行");
        }
    }
}

```

![](WPF%20入门.assets/image-20241018210107338.png)

Application 的生命周期和主窗体的生命周期是充满交织的，首先是 Application 的 OnStartup，然后是主窗体的 SourceInitialized，然后依次执行了 Application 的 OnActivated 和 MainWindow 的 Activated，最后直到主窗体 Closed，才轮到 Application 的 OnExit。

|       事件        |                      解释                      |
|:-----------------:|:----------------------------------------------:|
| SourceInitialized |             创建窗体源时引发此事件             |
|     Activated     |        当前窗体成为前台窗体时引发此事件        |
|      Loaded       | 当前窗体内部所有元素完成布局和呈现时引发此事件 |
|  ContentRendered  |        当前窗体的内容呈现之后引发此事件        |
|      Closing      |           当前窗体关闭之前引发此事件           |
|    Deactivated    |        当前窗体成为后台窗体时引发此事件        |
|      Closed       |           当前窗体关闭之后引发此事件           |
|     Unloaded      |       当前窗体从元素树中删除时引发此事件       |

#### 1.3.1 结论

Window 窗体的生命周期：
![](WPF%20入门.assets/Pasted%20image%2020241018210311.jpg)

### 1.4 Window 窗体的构成

Window 窗体本质上也是一个控件，只不过它和一般控件有所区别。比如它具有 Closing 和 Closed 事件，而一般控件是不可以关闭的；另外，Window 窗体可以容纳其它控件，最后，窗体由两部分构成，即工作区和非工作区。
![](WPF%20入门.assets/Pasted%20image%2020241018210424.png)

**非工作区**

非工作区主要包含以下几个要素，它们分别是：图标、标题、窗体菜单、最小化按钮、最大化按钮、关闭按钮、窗体边框、右下角鼠标拖动调整窗体尺寸。

**工作区**

如图所示，我们在窗体中最中心放置了一个 TextBlock 文字块控件，说明在这个区域内可以容纳和呈现一般控件。具体情况我们先看一下本例中的前端代码。

关于 Window 窗体的的工作区，本质上是指 Window 类的 Content 属性。Content 属性表示窗体的内容，类型为 object，即可以是任意的引用类型。需要注意的是，Content 属性并不在 Window 类中，而在它的父类 ContentControl 类中。

>默认的<Window></Window>之中只能存在一个控件，就是**因为 Content 是 object 类型，意思是只接受一个对象**。那如何向窗体中增加多个控件呢？微软给出了示例，就是**先放一个 Grid 布局控件，因为 Grid 控件是一个集合控件，我们可以将多个控件放在 Grid 控件中**，关于这些知识的扩展，我们将在 WPF 的《可视化树》章节中详细的探讨。

## 2 控件父类

### 2.1 控件的父类们

在 `C#` 的世界里，除了 `object`，没有人敢称终极父类，而在 `WPF` 的世界里，`DispatcherObject` 坐上了头把交椅。这个类位于 `程序集:WindowsBase.dll` 中，根据微软官网资料显示，`DispatcherObject` 继承于 `object`，虽然它在 WPF 框架算是终极父类，但在整个 .NET 中来看，仍然只不过是千年老二。

我们以最常用的 Button 控件为例。首先看看它的父类们：
Button->ButtonBase->ContentControl->Control->FrameworkElement->UIElement->Visual->DependencyObject->DispatcherObject。

然后再看一个最常用的 StackPanel 控件的继承路线：
StackPanel->Panel->FrameworkElement->UIElement->Visual->DependencyObject->DispatcherObject。

最后再看一个 Rectangle 矩形图形的继承路线：
Rectangle->Shape->FrameworkElement->UIElement->Visual->DependencyObject->DispatcherObject。

我们会发现它们的继承路线最终都在 FrameworkElement 这一层汇合，换句话说，这三种控件的身上都流着 FrameworkElement 的血，那自然也流淌着 UIElement->Visual->DependencyObject->DispatcherObject 这四个父类的血了。

由此我们可以得出结论，控件的父类们 (准确的说，应该叫父类的父类的父类)，至少有如下几个类型：

- DispatcherObject
- DependencyObject
- Visual
- UIElement
- FrameworkElement

WPF 几乎所有的控件都从上面这五个父类继承，它们的相互继承关系，形成了一棵树。
![](WPF%20入门.assets/Pasted%20image%2020241018211028.png)

### 2.2 DispatcherObject 类

话说这个千年老二 DispatcherObject 类，但在 WPF 世界中，那也是一位顶级的带头大哥，位高权重。根据常识，像这样的顶级类型，基本上都不怎么干活的，主要是把握方针路线。

.NET 为 WPF 准备了两个线程（WPF 应用启动时），分别用于呈现界面（后台线程）和管理界面（UI 线程）。后台线程一直隐藏于后台默默运行，我们感知不到，我们唯一能操作的就是 UI 线程。

绝大多数对象或控件都必须在 UI 线程上创建，而且，其它后台子线程不能直接访问 UI 线程上的控件，那么，后台线程非要访问 UI 线程的控件或对象，该怎么办呢？微软说，这样吧，我在 UI 线程上给你们提供一个中间商 Dispatcher（调度员），将 Dispatcher 放到一个抽象类 DispatcherObject，然后我向你保证，**我所有的控件都从这个 DispatcherObject 类继承**，这样当你们在后台线程中要访问控件时，就可以从控件中找到那位中间商 Dispatcher，由中间商来完成你要对控件的操作访问。

从此，DispatcherObject 在 WPF 的世界中，便登上了至高无上的宝座，成为了几乎所有类型的终极基类。

而作为 DispatcherObject 类的成员 Dispatcher（调度员）又提供了哪些功能？简单点说，它便是后台线程和前台线程的架海紫金梁，虽然所有的控件都必须在前台 UI 线程中创建，但是在开发过程中，难免需要在后台线程中去操作控件，于是 Dispatcher 调度员提供了 Invoke 和 BeginInvoke 两个方法，供我们可以安全的访问 UI 线程中的控件。

>官方解释：在 WPF 中， DispatcherObject 只能由 Dispatcher 它与之关联的访问。例如，后台线程无法更新与 Dispatcher UI 线程上关联的内容 Button。为了使后台线程访问该 Content 属性 Button，后台线程必须将工作委托给 Dispatcher 与 UI 线程关联的工作。这是通过使用 Invoke 或 BeginInvoke。 Invoke 是同步的， BeginInvoke 是异步的。操作将添加到指定 DispatcherPriority 位置的队列 Dispatcher 中。

我们以前面课程中的 HelloWorld 项目为例，在 Grid 中添加一个 button，在 MainWindow 的构造函数中增加如下代码。

前端代码

```xml
<Window x:Class="WpfApp1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp1"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <TextBlock Text="Hello, World!" FontSize="48" ></TextBlock>
        <Button x:Name="button"/>
    </Grid>
</Window>

```

后端代码

```C#
namespace WpfApp1
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            Task.Factory.StartNew(() =>
            {
                Task.Delay(3000).Wait();

                button.Dispatcher.Invoke(() =>
                {
                    button.Content = "www.wpfsoft.com";
                });
            });
        }
    }
}

```

最后 F5 运行调试，我们会看到 3 秒后，button 控件的 Content 属性被我们改成了 `www.wpfsoft.com`。
![](WPF%20入门.assets/Pasted%20image%2020241018211803.png)

我们利用 **Task 工厂**创建了一个子线程（后台线程），然后调用了 button 的 Dispatcher 调度员，其 Invoke 方法中传入了一个匿名函数，在这个匿名函数中去改变 button 按钮的 Content 属性。

为什么 button 按钮有 Dispatcher？**因为 button 按钮继承了 WPF 的带头大哥 DispatcherObject 类，而 DispatcherObject 类有 Dispatcher 成员**。

那么 DispatcherObject 类的主要方针路线到底是什么呢？主要有**两个职责**：

- 提供对对象所关联的当前 Dispatcher 的访问权限，意思是说谁继承了它，谁就拥有了 Dispatcher。
- 提供方法以检查 (CheckAccess) 和验证 (VerifyAccess) 某个线程是否有权访问对象（派生于 DispatcherObject）。**CheckAccess 与 VerifyAccess 的区别在于 CheckAccess 返回一个布尔值，表示当前线程是否有可以使用的对象，而 VerifyAccess 则在线程无权访问对象的情况下引发异常**。

### 2.3 DependencyObject 类

如果您有 Winform 的基础，对于控件属性值的赋值一定不陌生。比如：

```
button1.Text = "确定";
```

我们将“确定”字符串赋值给一个按钮的 Text 属性，这样前端的 button1 的内容为显示为”确定“。如果根据某些业务要求，需要将这个 button1 的内容翻译成英语“OK"显示呢？其实也很简单。

```
button1.Text = "OK";
```

**这种在需要的时候主动去改变控件的值的开发模式，我们称为事件驱动模式。**

于是微软在 WPF 框架中推出了更省事的处理方式——数据驱动模式。什么是数据驱动模式？**控件的属性不再被直接赋值，而是绑定了另一个”变量“，当这个”变量“发生改变时，控件的属性也会跟着改变，这样的属性也被称为依赖属性**。这有点像初中数学中的 y=x 这样的函数，y 是因变量，x 是自变量，y 随着 x 的变化而变化。

几乎 WPF 控件的所有属性都可以采用这种模式去更新属性的值，为什么？因为所有控件都继承了 DependencyObject 这个基类。换句话说，也只有继承了这个基类的控件，才能享受这一特殊待遇。

我们来看一下 DependencyObject 类的定义，比较常用的是 GetValue 和 SetValue。GetValue 表示获取某一个依赖属性的值，由于不确定这个值是什么类型，所以微软把这个函数的返回值设计成 object。SetValue 表示设置某一个依赖属性的值，所有它有两个参数，第一个参数 dp 表示要设置的依赖属性，第二个参数 value 表示新值。

```cs
public class DependencyObject : DispatcherObject
{
    public DependencyObject();
 
    public DependencyObjectType DependencyObjectType { get; }
    public bool IsSealed { get; }
 
    public void ClearValue(DependencyProperty dp);
    public void ClearValue(DependencyPropertyKey key);
    public void CoerceValue(DependencyProperty dp);
    public sealed override bool Equals(object obj);
    public sealed override int GetHashCode();
    public LocalValueEnumerator GetLocalValueEnumerator();
    public object GetValue(DependencyProperty dp);
    public void InvalidateProperty(DependencyProperty dp);
    public object ReadLocalValue(DependencyProperty dp);
    public void SetCurrentValue(DependencyProperty dp, object value);
    public void SetValue(DependencyProperty dp, object value);
    public void SetValue(DependencyPropertyKey key, object value);
    protected virtual void OnPropertyChanged(DependencyPropertyChangedEventArgs e);
    protected internal virtual bool ShouldSerializeProperty(DependencyProperty dp);
 
}
```

### 2.4 Visual 类

Visual 类是 WPF 框架中第三个父类，主要是为 WPF 中的呈现提供支持，其中包括命中测试、坐标转换和边界框计算。它位于程序集: PresentationCore. dll 库文件中，它的命名空间: System. Windows. Media。

> 官方引用
> Visual 类是派生每个 FrameworkElement 对象的基本抽象。该类还用作在 WPF 中编写新控件的入口点，在 Win32 应用程序模型中，该类在许多方面可视为窗口句柄 (HWND)。Visual 对象是一个核心 WPF 对象，它的主要作用是提供呈现支持。用户界面控件如 Button 和 TextBox）派生自 Visual 类，并使用该类来保存它们的呈现数据。 Visual 对象为以下项提供支持：  
> 输出显示：呈现视觉对象的持久、序列化的绘图内容。  
> 转换：针对视觉对象执行转换。  
> 剪裁：为视觉对象提供剪裁区域支持。  
> 命中测试：确定坐标或几何形状是否包含在视觉对象的边界内。  
> 边框计算：确定视觉对象的边框。

换句话说，将来我们要学习的 Button、TextBox、CheckBox、Gird、ListBox 等所有控件都继承了 Visual 类，控件在绘制到界面的过程中，涉及到转换、裁剪、边框计算等功能，都是使用了 Visual 父类的功能。我们先来看一下这个类的结构定义。

```cs
public abstract class Visual : DependencyObject, IResource
{
    protected Visual();
 
    protected DependencyObject VisualParent { get; }
    protected virtual int VisualChildrenCount { get; }
    protected internal DoubleCollection VisualYSnappingGuidelines { get; protected set; }
    protected internal Vector VisualOffset { get; protected set; }
    protected internal Geometry VisualClip { get; protected set; }
    protected internal Rect? VisualScrollableAreaClip { get; protected set; }
    protected internal CacheMode VisualCacheMode { get; protected set; }
    protected internal BitmapEffectInput VisualBitmapEffectInput { get; protected set; }
    protected internal BitmapEffect VisualBitmapEffect { get; protected set; }
    protected internal Effect VisualEffect { get; protected set; }
    protected internal Transform VisualTransform { get; protected set; }
    protected internal BitmapScalingMode VisualBitmapScalingMode { get; protected set; }
    protected internal DoubleCollection VisualXSnappingGuidelines { get; protected set; }
    protected internal double VisualOpacity { get; protected set; }
    protected internal EdgeMode VisualEdgeMode { get; protected set; }
    protected internal ClearTypeHint VisualClearTypeHint { get; set; }
    protected internal TextRenderingMode VisualTextRenderingMode { get; set; }
    protected internal TextHintingMode VisualTextHintingMode { get; set; }
    protected internal Brush VisualOpacityMask { get; protected set; }
 
    public DependencyObject FindCommonVisualAncestor(DependencyObject otherVisual);
    public bool IsAncestorOf(DependencyObject descendant);
    public bool IsDescendantOf(DependencyObject ancestor);
    public Point PointFromScreen(Point point);
    public Point PointToScreen(Point point);
    public GeneralTransform2DTo3D TransformToAncestor(Visual3D ancestor);
    public GeneralTransform TransformToAncestor(Visual ancestor);
    public GeneralTransform TransformToDescendant(Visual descendant);
    public GeneralTransform TransformToVisual(Visual visual);
    protected void AddVisualChild(Visual child);
    protected virtual Visual GetVisualChild(int index);
    protected virtual GeometryHitTestResult HitTestCore(GeometryHitTestParameters hitTestParameters);
    protected virtual HitTestResult HitTestCore(PointHitTestParameters hitTestParameters);
    protected virtual void OnDpiChanged(DpiScale oldDpi, DpiScale newDpi);
    protected void RemoveVisualChild(Visual child);
    protected internal virtual void OnVisualChildrenChanged(DependencyObject visualAdded, DependencyObject visualRemoved);
    protected internal virtual void OnVisualParentChanged(DependencyObject oldParent);
 
}
```

**代码分析**

首先，我们可以看到，Visual 类继承了 DependencyObject 类。另外 Visual 类是一个抽象类，不可以被实例。Visual 类提供了一系列的属性和方法。我们在这里捡一些比较重要的分析一下。

VisualParent 属性：这个属性表示获取一个可视化父对象。因为 XAML 的代码结构就是一棵 xml 树，每个控件都对象几乎都有一个可视化父对象。

VisualChildrenCount 属性：获取当前对象的子元素数量。

VisualOffset 属性：指当前可视对象的偏移量值。需要注意的是这个属性被声明成 protected internal。啥意思呢？VisualOffset 属性只能由同一个程序集的其它类访问，或 Visual 的子类访问。

> `protected internal` 关键字组合是一种成员访问修饰符，表示受保护的内部成员。

VisualOpacity 属性：获取或设置 Visual 的不透明度。

VisualEffect 属性：获取或设置要应用于 Visual 的位图效果。

VisualTransform 属性：获取或设置 Transform 的 Visual 值。

这些属性都只读为了解 Visual 类的基础，因为这些属性都被设计成 protected internal，我们的控件虽然继承了这个 Visual 类，但在实际的使用过程中是感知不到这些属性的，自然也不能实操它们。

#### 2.4.1 Visual 类总结

我们真正能在继承的控件中直接使用的是 Visual 类中被声明为 public 的方法成员。它们有以下几个：

- DependencyObject **FindCommonVisualAncestor**(DependencyObject otherVisual); //返回两个可视对象的公共上级。
- bool **IsAncestorOf**(DependencyObject descendant); //确定可视对象是否为后代可视对象的上级。
- bool **IsDescendantOf**(DependencyObject ancestor); //确定可视对象是否为上级可视对象的后代。
- Point **PointFromScreen**(Point point); //将屏幕坐标中的 Point 转换为表示 Point 的当前坐标系的 Visual。
- Point **PointToScreen**(Point point); //将表示 Point 的当前坐标系的 Visual 转换为屏幕坐标中的 Point。
- GeneralTransform2DTo3D **TransformToAncestor**(Visual3D ancestor); //返回一个转换，该转换可用于将 Visual 中的坐标转换为可视对象的指定 Visual3D 上级。
- GeneralTransform **TransformToAncestor**(Visual ancestor); //返回一个转换，该转换可用于将 Visual 中的坐标转换为可视对象的指定 Visual 上级。
- GeneralTransform **TransformToDescendant**(Visual descendant); //返回一个转换，该转换可用于将 Visual 中的坐标转换为指定的可视对象后代。
- GeneralTransform **TransformToVisual**(Visual visual); //返回一个转换，该转换可用于将 Visual 中的坐标转换为指定的可视对象。

由此可见，Visual 类所做的事情只为控件呈现相关，但还不是去呈现控件，只是提供呈现的基础。那么，谁又去继承了 Visual 类，成为继 Visual 类之后又一个控件的基类呢？答案是 UIElement 类。

### 2.5 UIElement 类

UIElement 类继承了 Visual 类，在 WPF 框架中排行老四（第 4 个基类）。它位于程序集: PresentationCore. dll 之中，命名空间: System. Windows。

这个基类非常非常重要，理解了这个类，就理解了 WPF 所有控件 1/3 的知识与用法。

```cs
public class UIElement : Visual, IAnimatable, IInputElement
{
	public static readonly RoutedEvent PreviewMouseDownEvent;
	public static readonly DependencyProperty AreAnyTouchesOverProperty;
	public static readonly DependencyProperty AreAnyTouchesDirectlyOverProperty;
	public static readonly DependencyProperty IsKeyboardFocusedProperty;
	public static readonly DependencyProperty IsStylusCaptureWithinProperty;
	public static readonly DependencyProperty IsStylusCapturedProperty;
	public static readonly DependencyProperty IsMouseCaptureWithinProperty;
	public static readonly DependencyProperty IsMouseCapturedProperty;
	public static readonly DependencyProperty IsKeyboardFocusWithinProperty;
	public static readonly DependencyProperty IsStylusOverProperty;
	public static readonly DependencyProperty IsMouseOverProperty;
	public static readonly DependencyProperty IsMouseDirectlyOverProperty;
	public static readonly RoutedEvent TouchLeaveEvent;
	public static readonly RoutedEvent TouchEnterEvent;
	public static readonly RoutedEvent LostTouchCaptureEvent;
	public static readonly RoutedEvent GotTouchCaptureEvent;
	public static readonly RoutedEvent TouchUpEvent;
	public static readonly RoutedEvent PreviewTouchUpEvent;
	public static readonly RoutedEvent TouchMoveEvent;
	public static readonly RoutedEvent PreviewTouchMoveEvent;
	public static readonly RoutedEvent TouchDownEvent;
	public static readonly RoutedEvent PreviewTouchDownEvent;
	public static readonly RoutedEvent DropEvent;
	public static readonly RoutedEvent PreviewDropEvent;
	public static readonly RoutedEvent DragLeaveEvent;
	public static readonly RoutedEvent PreviewDragLeaveEvent;
	public static readonly DependencyProperty AreAnyTouchesCapturedProperty;
	public static readonly DependencyProperty AreAnyTouchesCapturedWithinProperty;
	public static readonly DependencyProperty AllowDropProperty;
	public static readonly DependencyProperty RenderTransformProperty;
	public static readonly RoutedEvent ManipulationCompletedEvent;
	public static readonly RoutedEvent ManipulationBoundaryFeedbackEvent;
	public static readonly RoutedEvent ManipulationInertiaStartingEvent;
	public static readonly RoutedEvent ManipulationDeltaEvent;
	public static readonly RoutedEvent ManipulationStartedEvent;
	public static readonly RoutedEvent ManipulationStartingEvent;
	public static readonly DependencyProperty IsManipulationEnabledProperty;
	public static readonly DependencyProperty FocusableProperty;
	public static readonly DependencyProperty IsVisibleProperty;
	public static readonly DependencyProperty IsHitTestVisibleProperty;
	public static readonly DependencyProperty IsEnabledProperty;
	public static readonly DependencyProperty IsFocusedProperty;
	public static readonly RoutedEvent DragOverEvent;
	public static readonly RoutedEvent LostFocusEvent;
	public static readonly DependencyProperty SnapsToDevicePixelsProperty;
	public static readonly DependencyProperty ClipProperty;
	public static readonly DependencyProperty ClipToBoundsProperty;
	public static readonly DependencyProperty VisibilityProperty;
	public static readonly DependencyProperty UidProperty;
	public static readonly DependencyProperty CacheModeProperty;
	public static readonly DependencyProperty BitmapEffectInputProperty;
	public static readonly DependencyProperty EffectProperty;
	public static readonly DependencyProperty BitmapEffectProperty;
	public static readonly DependencyProperty OpacityMaskProperty;
	public static readonly DependencyProperty OpacityProperty;
	public static readonly DependencyProperty RenderTransformOriginProperty;
	public static readonly RoutedEvent GotFocusEvent;
	public static readonly RoutedEvent PreviewDragOverEvent;
	public static readonly DependencyProperty IsStylusDirectlyOverProperty;
	public static readonly RoutedEvent PreviewDragEnterEvent;
	public static readonly RoutedEvent StylusMoveEvent;
	public static readonly RoutedEvent PreviewStylusMoveEvent;
	public static readonly RoutedEvent StylusUpEvent;
	public static readonly RoutedEvent PreviewStylusUpEvent;
	public static readonly RoutedEvent StylusDownEvent;
	public static readonly RoutedEvent PreviewStylusDownEvent;
	public static readonly RoutedEvent QueryCursorEvent;
	public static readonly RoutedEvent LostMouseCaptureEvent;
	public static readonly RoutedEvent GotMouseCaptureEvent;
	public static readonly RoutedEvent MouseLeaveEvent;
	public static readonly RoutedEvent MouseEnterEvent;
	public static readonly RoutedEvent MouseWheelEvent;
	public static readonly RoutedEvent PreviewStylusInAirMoveEvent;
	public static readonly RoutedEvent PreviewMouseWheelEvent;
	public static readonly RoutedEvent PreviewMouseMoveEvent;
	public static readonly RoutedEvent MouseRightButtonUpEvent;
	public static readonly RoutedEvent PreviewMouseRightButtonUpEvent;
	public static readonly RoutedEvent MouseRightButtonDownEvent;
	public static readonly RoutedEvent PreviewMouseRightButtonDownEvent;
	public static readonly RoutedEvent DragEnterEvent;
	public static readonly RoutedEvent PreviewMouseLeftButtonUpEvent;
	public static readonly RoutedEvent MouseLeftButtonDownEvent;
	public static readonly RoutedEvent PreviewMouseLeftButtonDownEvent;
	public static readonly RoutedEvent MouseUpEvent;
	public static readonly RoutedEvent PreviewMouseUpEvent;
	public static readonly RoutedEvent MouseDownEvent;
	public static readonly RoutedEvent MouseMoveEvent;
	public static readonly RoutedEvent StylusInAirMoveEvent;
	public static readonly RoutedEvent MouseLeftButtonUpEvent;
	public static readonly RoutedEvent StylusLeaveEvent;
	public static readonly RoutedEvent StylusEnterEvent;
	public static readonly RoutedEvent GiveFeedbackEvent;
	public static readonly RoutedEvent PreviewGiveFeedbackEvent;
	public static readonly RoutedEvent QueryContinueDragEvent;
	public static readonly RoutedEvent TextInputEvent;
	public static readonly RoutedEvent PreviewTextInputEvent;
	public static readonly RoutedEvent LostKeyboardFocusEvent;
	public static readonly RoutedEvent PreviewLostKeyboardFocusEvent;
	public static readonly RoutedEvent GotKeyboardFocusEvent;
	public static readonly RoutedEvent PreviewGotKeyboardFocusEvent;
	public static readonly RoutedEvent KeyUpEvent;
	public static readonly RoutedEvent PreviewKeyUpEvent;
	public static readonly RoutedEvent KeyDownEvent;
	public static readonly RoutedEvent PreviewQueryContinueDragEvent;
	public static readonly RoutedEvent PreviewStylusButtonUpEvent;
	public static readonly RoutedEvent PreviewKeyDownEvent;
	public static readonly RoutedEvent StylusInRangeEvent;
	public static readonly RoutedEvent PreviewStylusInRangeEvent;
	public static readonly RoutedEvent StylusOutOfRangeEvent;
	public static readonly RoutedEvent PreviewStylusSystemGestureEvent;
	public static readonly RoutedEvent PreviewStylusOutOfRangeEvent;
	public static readonly RoutedEvent GotStylusCaptureEvent;
	public static readonly RoutedEvent LostStylusCaptureEvent;
	public static readonly RoutedEvent StylusButtonDownEvent;
	public static readonly RoutedEvent StylusButtonUpEvent;
	public static readonly RoutedEvent PreviewStylusButtonDownEvent;
	public static readonly RoutedEvent StylusSystemGestureEvent;
	 
	public UIElement();
	 
	public string Uid { get; set; }
	public Visibility Visibility { get; set; }
	public bool ClipToBounds { get; set; }
	public Geometry Clip { get; set; }
	public bool SnapsToDevicePixels { get; set; }
	public bool IsFocused { get; }
	public bool IsEnabled { get; set; }
	public bool IsHitTestVisible { get; set; }
	public bool IsVisible { get; }
	public bool AreAnyTouchesCapturedWithin { get; }
	public int PersistId { get; }
	public bool IsManipulationEnabled { get; set; }
	public bool AreAnyTouchesOver { get; }
	public bool AreAnyTouchesDirectlyOver { get; }
	public bool AreAnyTouchesCaptured { get; }
	public IEnumerable<TouchDevice> TouchesCaptured { get; }
	public IEnumerable<TouchDevice> TouchesCapturedWithin { get; }
	public IEnumerable<TouchDevice> TouchesOver { get; }
	public CacheMode CacheMode { get; set; }
	public bool Focusable { get; set; }
	public BitmapEffectInput BitmapEffectInput { get; set; }
	public bool IsMouseDirectlyOver { get; }
	public BitmapEffect BitmapEffect { get; set; }
	public Size RenderSize { get; set; }
	public bool IsArrangeValid { get; }
	public bool IsMeasureValid { get; }
	public Size DesiredSize { get; }
	public bool AllowDrop { get; set; }
	public CommandBindingCollection CommandBindings { get; }
	public InputBindingCollection InputBindings { get; }
	public bool HasAnimatedProperties { get; }
	public bool IsMouseOver { get; }
	public Effect Effect { get; set; }
	public bool IsStylusOver { get; }
	public bool IsMouseCaptured { get; }
	public bool IsMouseCaptureWithin { get; }
	public bool IsStylusDirectlyOver { get; }
	public bool IsStylusCaptured { get; }
	public bool IsStylusCaptureWithin { get; }
	public bool IsKeyboardFocused { get; }
	public bool IsInputMethodEnabled { get; }
	public double Opacity { get; set; }
	public Brush OpacityMask { get; set; }
	public bool IsKeyboardFocusWithin { get; }
	public IEnumerable<TouchDevice> TouchesDirectlyOver { get; }
	public Point RenderTransformOrigin { get; set; }
	public Transform RenderTransform { get; set; }
	protected StylusPlugInCollection StylusPlugIns { get; }
	protected virtual bool IsEnabledCore { get; }
	protected internal virtual bool HasEffectiveKeyboardFocus { get; }
	 
	public event KeyEventHandler KeyUp;
	public event EventHandler<TouchEventArgs> TouchMove;
	public event EventHandler<TouchEventArgs> PreviewTouchMove;
	public event EventHandler<TouchEventArgs> TouchDown;
	public event EventHandler<TouchEventArgs> PreviewTouchDown;
	public event DragEventHandler Drop;
	public event DragEventHandler PreviewDrop;
	public event DragEventHandler DragLeave;
	public event DragEventHandler PreviewDragLeave;
	public event DragEventHandler DragOver;
	public event DragEventHandler PreviewDragOver;
	public event DragEventHandler DragEnter;
	public event DragEventHandler PreviewDragEnter;
	public event GiveFeedbackEventHandler GiveFeedback;
	public event GiveFeedbackEventHandler PreviewGiveFeedback;
	public event QueryContinueDragEventHandler QueryContinueDrag;
	public event QueryContinueDragEventHandler PreviewQueryContinueDrag;
	public event TextCompositionEventHandler TextInput;
	public event EventHandler<TouchEventArgs> PreviewTouchUp;
	public event EventHandler<TouchEventArgs> TouchUp;
	public event EventHandler<TouchEventArgs> LostTouchCapture;
	public event TextCompositionEventHandler PreviewTextInput;
	public event EventHandler<ManipulationInertiaStartingEventArgs> ManipulationInertiaStarting;
	public event EventHandler<ManipulationDeltaEventArgs> ManipulationDelta;
	public event EventHandler<ManipulationStartedEventArgs> ManipulationStarted;
	public event EventHandler<ManipulationStartingEventArgs> ManipulationStarting;
	public event DependencyPropertyChangedEventHandler FocusableChanged;
	public event DependencyPropertyChangedEventHandler IsVisibleChanged;
	public event DependencyPropertyChangedEventHandler IsHitTestVisibleChanged;
	public event DependencyPropertyChangedEventHandler IsEnabledChanged;
	public event RoutedEventHandler LostFocus;
	public event EventHandler<TouchEventArgs> GotTouchCapture;
	public event RoutedEventHandler GotFocus;
	public event DependencyPropertyChangedEventHandler IsKeyboardFocusedChanged;
	public event DependencyPropertyChangedEventHandler IsStylusCaptureWithinChanged;
	public event DependencyPropertyChangedEventHandler IsStylusDirectlyOverChanged;
	public event DependencyPropertyChangedEventHandler IsMouseCaptureWithinChanged;
	public event DependencyPropertyChangedEventHandler IsMouseCapturedChanged;
	public event DependencyPropertyChangedEventHandler IsKeyboardFocusWithinChanged;
	public event DependencyPropertyChangedEventHandler IsMouseDirectlyOverChanged;
	public event EventHandler<TouchEventArgs> TouchLeave;
	public event EventHandler<TouchEventArgs> TouchEnter;
	public event EventHandler LayoutUpdated;
	public event KeyboardFocusChangedEventHandler LostKeyboardFocus;
	public event KeyboardFocusChangedEventHandler PreviewLostKeyboardFocus;
	public event KeyboardFocusChangedEventHandler GotKeyboardFocus;
	public event StylusEventHandler PreviewStylusMove;
	public event StylusEventHandler StylusMove;
	public event StylusEventHandler PreviewStylusInAirMove;
	public event StylusEventHandler StylusInAirMove;
	public event StylusEventHandler StylusEnter;
	public event StylusEventHandler StylusLeave;
	public event StylusEventHandler PreviewStylusInRange;
	public event StylusEventHandler StylusInRange;
	public event StylusEventHandler PreviewStylusOutOfRange;
	public event StylusEventHandler StylusOutOfRange;
	public event StylusSystemGestureEventHandler PreviewStylusSystemGesture;
	public event StylusSystemGestureEventHandler StylusSystemGesture;
	public event StylusEventHandler GotStylusCapture;
	public event StylusEventHandler LostStylusCapture;
	public event StylusButtonEventHandler StylusButtonDown;
	public event StylusButtonEventHandler StylusButtonUp;
	public event StylusButtonEventHandler PreviewStylusButtonDown;
	public event StylusButtonEventHandler PreviewStylusButtonUp;
	public event KeyEventHandler PreviewKeyDown;
	public event KeyEventHandler KeyDown;
	public event KeyEventHandler PreviewKeyUp;
	public event StylusEventHandler StylusUp;
	public event KeyboardFocusChangedEventHandler PreviewGotKeyboardFocus;
	public event StylusEventHandler PreviewStylusUp;
	public event StylusDownEventHandler PreviewStylusDown;
	public event MouseButtonEventHandler PreviewMouseDown;
	public event MouseButtonEventHandler MouseDown;
	public event MouseButtonEventHandler PreviewMouseUp;
	public event MouseButtonEventHandler MouseUp;
	public event MouseButtonEventHandler PreviewMouseLeftButtonDown;
	public event MouseButtonEventHandler MouseLeftButtonDown;
	public event MouseButtonEventHandler PreviewMouseLeftButtonUp;
	public event MouseButtonEventHandler MouseLeftButtonUp;
	public event MouseButtonEventHandler PreviewMouseRightButtonDown;
	public event MouseButtonEventHandler MouseRightButtonDown;
	public event MouseButtonEventHandler PreviewMouseRightButtonUp;
	public event MouseButtonEventHandler MouseRightButtonUp;
	public event MouseEventHandler PreviewMouseMove;
	public event MouseEventHandler MouseMove;
	public event MouseWheelEventHandler PreviewMouseWheel;
	public event MouseWheelEventHandler MouseWheel;
	public event MouseEventHandler MouseEnter;
	public event MouseEventHandler MouseLeave;
	public event MouseEventHandler GotMouseCapture;
	public event MouseEventHandler LostMouseCapture;
	public event QueryCursorEventHandler QueryCursor;
	public event StylusDownEventHandler StylusDown;
	public event DependencyPropertyChangedEventHandler IsStylusCapturedChanged;
	public event EventHandler<ManipulationCompletedEventArgs> ManipulationCompleted;
	public event EventHandler<ManipulationBoundaryFeedbackEventArgs> ManipulationBoundaryFeedback;
	 
	public void AddHandler(RoutedEvent routedEvent, Delegate handler);
	public void AddHandler(RoutedEvent routedEvent, Delegate handler, bool handledEventsToo);
	public void AddToEventRoute(EventRoute route, RoutedEventArgs e);
	public void ApplyAnimationClock(DependencyProperty dp, AnimationClock clock, HandoffBehavior handoffBehavior);
	public void ApplyAnimationClock(DependencyProperty dp, AnimationClock clock);
	public void Arrange(Rect finalRect);
	public void BeginAnimation(DependencyProperty dp, AnimationTimeline animation, HandoffBehavior handoffBehavior);
	public void BeginAnimation(DependencyProperty dp, AnimationTimeline animation);
	public bool CaptureMouse();
	public bool CaptureStylus();
	public bool CaptureTouch(TouchDevice touchDevice);
	public bool Focus();
	public object GetAnimationBaseValue(DependencyProperty dp);
	public IInputElement InputHitTest(Point point);
	public void InvalidateArrange();
	public void InvalidateMeasure();
	public void InvalidateVisual();
	public void Measure(Size availableSize);
	public virtual bool MoveFocus(TraversalRequest request);
	public virtual DependencyObject PredictFocus(FocusNavigationDirection direction);
	public void RaiseEvent(RoutedEventArgs e);
	public void ReleaseAllTouchCaptures();
	public void ReleaseMouseCapture();
	public void ReleaseStylusCapture();
	public bool ReleaseTouchCapture(TouchDevice touchDevice);
	public void RemoveHandler(RoutedEvent routedEvent, Delegate handler);
	public bool ShouldSerializeCommandBindings();
	public bool ShouldSerializeInputBindings();
	public Point TranslatePoint(Point point, UIElement relativeTo);
	public void UpdateLayout();
	protected virtual void ArrangeCore(Rect finalRect);
	protected virtual Geometry GetLayoutClip(Size layoutSlotSize);
	protected override HitTestResult HitTestCore(PointHitTestParameters hitTestParameters);
	protected override GeometryHitTestResult HitTestCore(GeometryHitTestParameters hitTestParameters);
	protected virtual Size MeasureCore(Size availableSize);
	protected virtual void OnAccessKey(AccessKeyEventArgs e);
	protected virtual void OnChildDesiredSizeChanged(UIElement child);
	protected virtual AutomationPeer OnCreateAutomationPeer();
	protected virtual void OnDragEnter(DragEventArgs e);
	protected virtual void OnDragLeave(DragEventArgs e);
	protected virtual void OnDragOver(DragEventArgs e);
	protected virtual void OnDrop(DragEventArgs e);
	protected virtual void OnGiveFeedback(GiveFeedbackEventArgs e);
	protected virtual void OnGotFocus(RoutedEventArgs e);
	protected virtual void OnGotKeyboardFocus(KeyboardFocusChangedEventArgs e);
	protected virtual void OnGotMouseCapture(MouseEventArgs e);
	protected virtual void OnGotStylusCapture(StylusEventArgs e);
	protected virtual void OnGotTouchCapture(TouchEventArgs e);
	protected virtual void OnIsKeyboardFocusedChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsKeyboardFocusWithinChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsMouseCapturedChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsMouseCaptureWithinChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsMouseDirectlyOverChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsStylusCapturedChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsStylusCaptureWithinChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnIsStylusDirectlyOverChanged(DependencyPropertyChangedEventArgs e);
	protected virtual void OnKeyDown(KeyEventArgs e);
	protected virtual void OnKeyUp(KeyEventArgs e);
	protected virtual void OnLostFocus(RoutedEventArgs e);
	protected virtual void OnLostKeyboardFocus(KeyboardFocusChangedEventArgs e);
	protected virtual void OnLostMouseCapture(MouseEventArgs e);
	protected virtual void OnLostStylusCapture(StylusEventArgs e);
	protected virtual void OnLostTouchCapture(TouchEventArgs e);
	protected virtual void OnManipulationBoundaryFeedback(ManipulationBoundaryFeedbackEventArgs e);
	protected virtual void OnManipulationCompleted(ManipulationCompletedEventArgs e);
	protected virtual void OnManipulationDelta(ManipulationDeltaEventArgs e);
	protected virtual void OnManipulationInertiaStarting(ManipulationInertiaStartingEventArgs e);
	protected virtual void OnManipulationStarted(ManipulationStartedEventArgs e);
	protected virtual void OnManipulationStarting(ManipulationStartingEventArgs e);
	protected virtual void OnMouseDown(MouseButtonEventArgs e);
	protected virtual void OnMouseEnter(MouseEventArgs e);
	protected virtual void OnMouseLeave(MouseEventArgs e);
	protected virtual void OnMouseLeftButtonDown(MouseButtonEventArgs e);
	protected virtual void OnMouseLeftButtonUp(MouseButtonEventArgs e);
	protected virtual void OnMouseMove(MouseEventArgs e);
	protected virtual void OnMouseRightButtonDown(MouseButtonEventArgs e);
	protected virtual void OnMouseRightButtonUp(MouseButtonEventArgs e);
	protected virtual void OnMouseUp(MouseButtonEventArgs e);
	protected virtual void OnMouseWheel(MouseWheelEventArgs e);
	protected virtual void OnPreviewDragEnter(DragEventArgs e);
	protected virtual void OnPreviewDragLeave(DragEventArgs e);
	protected virtual void OnPreviewDragOver(DragEventArgs e);
	protected virtual void OnPreviewDrop(DragEventArgs e);
	protected virtual void OnPreviewGiveFeedback(GiveFeedbackEventArgs e);
	protected virtual void OnPreviewGotKeyboardFocus(KeyboardFocusChangedEventArgs e);
	protected virtual void OnPreviewKeyDown(KeyEventArgs e);
	protected virtual void OnPreviewKeyUp(KeyEventArgs e);
	protected virtual void OnPreviewLostKeyboardFocus(KeyboardFocusChangedEventArgs e);
	protected virtual void OnPreviewMouseDown(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseLeftButtonDown(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseLeftButtonUp(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseMove(MouseEventArgs e);
	protected virtual void OnPreviewMouseRightButtonDown(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseRightButtonUp(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseUp(MouseButtonEventArgs e);
	protected virtual void OnPreviewMouseWheel(MouseWheelEventArgs e);
	protected virtual void OnPreviewQueryContinueDrag(QueryContinueDragEventArgs e);
	protected virtual void OnPreviewStylusButtonDown(StylusButtonEventArgs e);
	protected virtual void OnPreviewStylusButtonUp(StylusButtonEventArgs e);
	protected virtual void OnPreviewStylusDown(StylusDownEventArgs e);
	protected virtual void OnPreviewStylusInAirMove(StylusEventArgs e);
	protected virtual void OnPreviewStylusInRange(StylusEventArgs e);
	protected virtual void OnPreviewStylusMove(StylusEventArgs e);
	protected virtual void OnPreviewStylusOutOfRange(StylusEventArgs e);
	protected virtual void OnPreviewStylusSystemGesture(StylusSystemGestureEventArgs e);
	protected virtual void OnPreviewStylusUp(StylusEventArgs e);
	protected virtual void OnPreviewTextInput(TextCompositionEventArgs e);
	protected virtual void OnPreviewTouchDown(TouchEventArgs e);
	protected virtual void OnPreviewTouchMove(TouchEventArgs e);
	protected virtual void OnPreviewTouchUp(TouchEventArgs e);
	protected virtual void OnQueryContinueDrag(QueryContinueDragEventArgs e);
	protected virtual void OnQueryCursor(QueryCursorEventArgs e);
	protected virtual void OnRender(DrawingContext drawingContext);
	protected virtual void OnStylusButtonDown(StylusButtonEventArgs e);
	protected virtual void OnStylusButtonUp(StylusButtonEventArgs e);
	protected virtual void OnStylusDown(StylusDownEventArgs e);
	protected virtual void OnStylusEnter(StylusEventArgs e);
	protected virtual void OnStylusInAirMove(StylusEventArgs e);
	protected virtual void OnStylusInRange(StylusEventArgs e);
	protected virtual void OnStylusLeave(StylusEventArgs e);
	protected virtual void OnStylusMove(StylusEventArgs e);
	protected virtual void OnStylusOutOfRange(StylusEventArgs e);
	protected virtual void OnStylusSystemGesture(StylusSystemGestureEventArgs e);
	protected virtual void OnStylusUp(StylusEventArgs e);
	protected virtual void OnTextInput(TextCompositionEventArgs e);
	protected virtual void OnTouchDown(TouchEventArgs e);
	protected virtual void OnTouchEnter(TouchEventArgs e);
	protected virtual void OnTouchLeave(TouchEventArgs e);
	protected virtual void OnTouchMove(TouchEventArgs e);
	protected virtual void OnTouchUp(TouchEventArgs e);
	protected internal virtual DependencyObject GetUIParentCore();
	protected internal virtual void OnRenderSizeChanged(SizeChangedInfo info);
	protected internal override void OnVisualParentChanged(DependencyObject oldParent);
 
}
```

**代码分析**

- 第一部分路由事件

UIElement 基类定义了大量的路由事件。什么是路由事件？路由事件和 xaml 的可视化树概念相关，控件的事件被触发后，会沿着这棵树广播，有两个方向，要么往树的根部广播，要么往树的枝叶广播，如果不广播就是直接事件。

所以，路由事件分为**冒泡事件**和**隧道事件**。冒泡，是从触发源为出发点，依次传递到父节点，直到最后的根节点。隧道事件是不管谁是触发源，都是从根节点触发，到子节点，直到触发节点。

从空间上来说，冒泡事件和隧道事件是成对出现的。从时间来说，都是**先触发隧道事件，然后是冒泡事件**。从命名来说，隧道事件都是以 Preview 开头的事件。

根据命名规则，我们可以大致猜测出一个结果，带 Key 的基本都是与键盘相关的事件（如按下键位、抬起键位），带 Mouse 的基本都是与鼠标相关的事件（如左键单击、双击），带 Stylus 的基本都是与触摸相关的事件，具体用到哪一类型的事件，再详细查阅一下相关说明文档即可。

**重点：关于这些事件的回调函数，即以 On 开头的方法成员，都被声明成了 protected virtual，意思是他们都可以被重载，这使得我们在开发业务时更加方便。**




- 第二部分依赖属性

UIElement 基类还定义了大量的依赖属性。前面的章节中，在 DependencyObject 类中我们简单提到过依赖属性。在这里我们以 UIElement 基类的 Visibility 属性为例。

```cs
public Visibility Visibility { get; set; }
 
public static readonly DependencyProperty VisibilityProperty;
```

上面有两个成员，Visibility 是普通的属性成员，VisibilityProperty 是 WPF 的依赖属性成员，以 Property 结尾的字样作为 WPF 的依赖属性命名规则。而这两个成员合起来，才能被称为一个完整的依赖属性。这个 Visibility 属性表示设置或获取控件的可见性。当我们要设置控件的可见性时，只需要如下设置即可。

```xml
	<TextBlock Text="WPF中文网" 
                   Visibility="Visible"
                   FontSize="48" 
                   HorizontalAlignment="Center" 
                   VerticalAlignment="Center"/>
```

Visibility 实际上是一个枚举，它包含 **3** 个值，分别是 **Visible、Hidden、Collapsed**。其含义分别是**显示**、**隐藏**、**彻底隐藏**（不占布局位置）。

**Visibility 状态会影响该元素的所有输入处理。不可见的元素不会参与命中测试，也不会接收输入事件，即使鼠标位于元素可见时所在的边界上也是如此。**

但是在这一节中，我们只是探讨 UIElement 基类提供了哪些方面的属性，并不详细探讨依赖属性，所以下面我们把目光聚焦到 UIElement 基类的常用属性上。另外由于 WPF 中几乎所有控件都继承了这个基类，意思就是说所有的控件都有这些属性可以使用。下面我在描述的时候将采用“控件”两字来解释一些技术细节。

**Uid 属性**: 获取或设置控件的唯一标识符，像人们的身份证一样。这个值默认是 string. Empty。

**Visibility 属性**：获取或设置控件的可见性。默认是 Visible。

**ClipToBounds 属性**：如果该值为 true，表示进行裁剪，以适配它的父控件。比如有时候我们外面有一个 Panel，里面的控件尺寸太大，势必会“撑破”外面的父控件，为了布局美观，只好削足适履。

**Clip 属性**：用于剪裁区域大小的几何图形。需要注意的是，这个属性和上面的 ClipToBounds 属性是有区别的。ClipToBounds 是裁剪控件自身，Clip 是裁剪控件里面的内容。比如 Image 图像控件，我们在显示一张图时，就可以运用 Clip 进行裁剪后显示，通常在显示用户头像时裁剪成圆形时使用。如下所示：

```xml
<Image 
  Source="sampleImages\Waterlilies.jpg" 
  Width="200" Height="150" HorizontalAlignment="Left">
  <Image.Clip>
    <EllipseGeometry
      RadiusX="100"
      RadiusY="75"
      Center="100,75"/>
  </Image.Clip>
</Image>
```

![](WPF%20入门.assets/Pasted%20image%2020241021221408.png)

**SnapsToDevicePixels 属性**：如果该值为 true，表示控件的呈现是否应使用特定于设备的像素设置。意思是开启后可以最大限度的防锯齿效果，默认为 false。

**IsFocused 属性**：这是一个只读属性，表示当前控件是否有焦点。

**IsEnabled 属性**：如果该值为 true，表示禁用控件，反之启用控件。

**IsHitTestVisible 属性**：获取或设置一个值，该值声明是否可以返回此元素作为其呈现内容的某些部分的点击测试结果。

**IsVisible 属性**：这是一个只读属性，表示当前控件是否显示。

**Focusable 属性**：如果该值为 true，表示控件可以得到焦点，大部份内容控件都默认可以获得焦点。

**IsKeyboardFocused 属性**：表示该控件是否具有键盘焦点。

**IsMouseOver 属性**：表示鼠标是否在控件上面。通常在设计控件的样式（Style）时会用到。

**IsStylusOver 属性**：表示触笔指针是否在控件的上方。

**IsSealed 属性**：表示当前类型是否为只读类。

**Opacity 属性**：设置控件的透明度，取值范围是 0-1 之间的 double 值。

**OpacityMask 属性**：设置一个画笔，作为控件的蒙板。比如我们给一张图片设置一个掩码，就可以使用 ImageBrush 这种图片画笔来实现。

```xml
<Image Height="150" Width="200" Source="sampleImages/Waterlilies.jpg" >
  <Image.OpacityMask>
    <ImageBrush ImageSource="sampleImages/tornedges.png"/>
  </Image.OpacityMask>
</Image>
```

**AllowDrop 属性**：表示控件是否允许拖拽操作。

**RenderTransform 属性**：（非常重要）如果要设置控件的移动、缩放、旋转，需要这此属性进行设置。

#### 2.5.1 UIElement 类总结

通过上述的代码分析，我们大致可以得出以下结论，UIElement 基类为我们提供了一系列的鼠标、键盘和触摸事件，并提供了一些常用的依赖属性。它可以呈现继承它的所有控件，为控件布局时调整位置和大小，响应用户的输入，引发一系列的路由事件，并继承了 IAnimatable 动画接口，用于支持动画的某些方面。

我们熟悉了 UIElement 的这些属性和事件之后，实际上意味着我们也熟悉了 WPF 所有控件的这些属性。下一节，我们将探讨 UIElement 的子类 FrameworkElement。

FrameworkElement 基类论重要性，完全不亚于 UIElement 基类。甚至论起与开发者的“亲密度”，FrameworkElement 更像是近水的楼台。


### 2.6 FrameworkElement 类

FrameworkElement 类继承于 UIElement 类，继承关系是：Object->DispatcherObject->DependencyObject->Visual->UIElement->FrameworkElement，**它也是 WPF 控件的众多父类中最核心的基类**，从这里开始，继承树开始分支，分别是 Shape 图形类、Control 控件类和 Panel 布局类三个方向。

![](WPF%20入门.assets/Pasted%20image%2020241021221619.png)

FrameworkElement 类本质上也是提供了一系列属性、方法和事件。同时又扩展 UIElement 并添加了以下功能：

![](WPF%20入门.assets/image-20241021221720612.png)

#### 2.6.1 FrameworkElement 类定义

```cs
public class FrameworkElement : UIElement, IFrameworkInputElement, IInputElement, ISupportInitialize, IHaveResources, IQueryAmbient
{
    public static readonly DependencyProperty StyleProperty;
    public static readonly DependencyProperty MaxHeightProperty;
    public static readonly DependencyProperty FlowDirectionProperty;
    public static readonly DependencyProperty MarginProperty;
    public static readonly DependencyProperty HorizontalAlignmentProperty;
    public static readonly DependencyProperty VerticalAlignmentProperty;
    public static readonly DependencyProperty FocusVisualStyleProperty;
    public static readonly DependencyProperty CursorProperty;
    public static readonly DependencyProperty ForceCursorProperty;
    public static readonly RoutedEvent UnloadedEvent;
    public static readonly DependencyProperty ToolTipProperty;
    public static readonly DependencyProperty ContextMenuProperty;
    public static readonly RoutedEvent ToolTipOpeningEvent;
    public static readonly RoutedEvent ToolTipClosingEvent;
    public static readonly RoutedEvent ContextMenuOpeningEvent;
    public static readonly RoutedEvent ContextMenuClosingEvent;
    public static readonly DependencyProperty MinHeightProperty;
    public static readonly DependencyProperty HeightProperty;
    public static readonly RoutedEvent LoadedEvent;
    public static readonly DependencyProperty MinWidthProperty;
    public static readonly DependencyProperty MaxWidthProperty;
    public static readonly DependencyProperty OverridesDefaultStyleProperty;
    public static readonly DependencyProperty UseLayoutRoundingProperty;
    public static readonly DependencyProperty BindingGroupProperty;
    public static readonly DependencyProperty LanguageProperty;
    public static readonly DependencyProperty NameProperty;
    public static readonly DependencyProperty TagProperty;
    public static readonly DependencyProperty DataContextProperty;
    public static readonly RoutedEvent RequestBringIntoViewEvent;
    public static readonly RoutedEvent SizeChangedEvent;
    public static readonly DependencyProperty ActualWidthProperty;
    public static readonly DependencyProperty ActualHeightProperty;
    public static readonly DependencyProperty LayoutTransformProperty;
    public static readonly DependencyProperty InputScopeProperty;
    public static readonly DependencyProperty WidthProperty;
    protected internal static readonly DependencyProperty DefaultStyleKeyProperty;
 
    public FrameworkElement();
 
    public Transform LayoutTransform { get; set; }
    public double Width { get; set; }
    public double MinWidth { get; set; }
    public double MaxHeight { get; set; }
    public double Height { get; set; }
    public double MinHeight { get; set; }
    public double ActualHeight { get; }
    public double MaxWidth { get; set; }
    public double ActualWidth { get; }
    public TriggerCollection Triggers { get; }
    public object Tag { get; set; }
    public string Name { get; set; }
    public XmlLanguage Language { get; set; }
    public BindingGroup BindingGroup { get; set; }
    public object DataContext { get; set; }
    public ResourceDictionary Resources { get; set; }
    public DependencyObject TemplatedParent { get; }
    public bool UseLayoutRounding { get; set; }
    public FlowDirection FlowDirection { get; set; }
    public InputScope InputScope { get; set; }
    public Thickness Margin { get; set; }
    public Style Style { get; set; }
    public VerticalAlignment VerticalAlignment { get; set; }
    public bool OverridesDefaultStyle { get; set; }
    public HorizontalAlignment HorizontalAlignment { get; set; }
    public ContextMenu ContextMenu { get; set; }
    public object ToolTip { get; set; }
    public DependencyObject Parent { get; }
    public bool IsInitialized { get; }
    public bool ForceCursor { get; set; }
    public Cursor Cursor { get; set; }
    public Style FocusVisualStyle { get; set; }
    public bool IsLoaded { get; }
    protected override int VisualChildrenCount { get; }
    protected internal InheritanceBehavior InheritanceBehavior { get; set; }
    protected internal virtual IEnumerator LogicalChildren { get; }
    protected internal object DefaultStyleKey { get; set; }
 
    public event ToolTipEventHandler ToolTipClosing;
    public event ToolTipEventHandler ToolTipOpening;
    public event RoutedEventHandler Unloaded;
    public event DependencyPropertyChangedEventHandler DataContextChanged;
    public event SizeChangedEventHandler SizeChanged;
    public event RequestBringIntoViewEventHandler RequestBringIntoView;
    public event EventHandler<DataTransferEventArgs> SourceUpdated;
    public event EventHandler<DataTransferEventArgs> TargetUpdated;
    public event RoutedEventHandler Loaded;
    public event EventHandler Initialized;
    public event ContextMenuEventHandler ContextMenuClosing;
    public event ContextMenuEventHandler ContextMenuOpening;
 
    public static FlowDirection GetFlowDirection(DependencyObject element);
    public static void SetFlowDirection(DependencyObject element, FlowDirection value);
    public bool ApplyTemplate();
    public virtual void BeginInit();
    public void BeginStoryboard(Storyboard storyboard, HandoffBehavior handoffBehavior, bool isControllable);
    public void BeginStoryboard(Storyboard storyboard);
    public void BeginStoryboard(Storyboard storyboard, HandoffBehavior handoffBehavior);
    public void BringIntoView();
    public void BringIntoView(Rect targetRectangle);
    public virtual void EndInit();
    public object FindName(string name);
    public object FindResource(object resourceKey);
    public BindingExpression GetBindingExpression(DependencyProperty dp);
    public sealed override bool MoveFocus(TraversalRequest request);
    public virtual void OnApplyTemplate();
    public sealed override DependencyObject PredictFocus(FocusNavigationDirection direction);
    public void RegisterName(string name, object scopedElement);
    public BindingExpressionBase SetBinding(DependencyProperty dp, BindingBase binding);
    public BindingExpression SetBinding(DependencyProperty dp, string path);
    public void SetResourceReference(DependencyProperty dp, object name);
    public bool ShouldSerializeResources();
    public bool ShouldSerializeStyle();
    public bool ShouldSerializeTriggers();
    public object TryFindResource(object resourceKey);
    public void UnregisterName(string name);
    public void UpdateDefaultStyle();
    protected sealed override void ArrangeCore(Rect finalRect);
    protected virtual Size ArrangeOverride(Size finalSize);
    protected override Geometry GetLayoutClip(Size layoutSlotSize);
    protected override Visual GetVisualChild(int index);
    protected sealed override Size MeasureCore(Size availableSize);
    protected virtual Size MeasureOverride(Size availableSize);
    protected virtual void OnContextMenuClosing(ContextMenuEventArgs e);
    protected virtual void OnContextMenuOpening(ContextMenuEventArgs e);
    protected override void OnGotFocus(RoutedEventArgs e);
    protected virtual void OnInitialized(EventArgs e);
    protected override void OnPropertyChanged(DependencyPropertyChangedEventArgs e);
    protected virtual void OnToolTipClosing(ToolTipEventArgs e);
    protected virtual void OnToolTipOpening(ToolTipEventArgs e);
    protected internal void AddLogicalChild(object child);
    protected internal DependencyObject GetTemplateChild(string childName);
    protected internal override DependencyObject GetUIParentCore();
    protected internal override void OnRenderSizeChanged(SizeChangedInfo sizeInfo);
    protected internal virtual void OnStyleChanged(Style oldStyle, Style newStyle);
    protected internal override void OnVisualParentChanged(DependencyObject oldParent);
    protected internal virtual void ParentLayoutInvalidated(UIElement child);
    protected internal void RemoveLogicalChild(object child);
 
}
```

#### 2.6.2 属性分析

1. LayoutTransform 属性：获取或设置在执行布局时应应用于此元素的图形转换。这个属性与 UIElement 类中的 RenderTransform 属性有相似之处，所以我们在此将两者进行对比说明一下。两个属性都是 Transform 类型，而 Transform 是一个抽象类，这个类可以实现控件在平面中的各种转换，包括

- 旋转 (System. Windows. Media. RotateTransform)
- 缩放 (System. Windows. Media. ScaleTransform)、
- 倾斜 (System. Windows. Media. SkewTransform) 、
- 平移 (System. Windows. Media. TranslateTransform)。

虽然两个属性都可以达到控件的变换效果，但是两者还是有区别的。LayoutTransform 属性是在控件布局之前对控件进行变换，而 RenderTransform 属性是在布局结束后执行控件的变换，LayoutTransform 开销比 RenderTransform 要大，所以，尽量使用 RenderTransform 属性去实现控件的变换。（我们会在后面专门探讨控件的变换）

2. Width 属性：这是表示控件的宽度。与之相关的还有以下几个属性。

- ActualWidth：获取此元素的呈现宽度。只读属性。
- MaxWidth：获取或设置一个控件的最大宽度。
- MinWidth：获取或设置一个控件的最小宽度。

3. Height 属性：这是表示控件的高度，与之相关的还有以下几个属性。

- ActualHeight：获取此元素的呈现高度。只读属性。
- MaxHeight：获取或设置一个控件的最大高度。
- MinHeight：获取或设置一个控件的最小高度。

4. Tag 属性：这个属性非常重要，它是 object 类型，意味着可以保存任意类型的对象值。它就像 FrameworkElement 类身上的一个小口袋，但确能容纳万物。我们通常会将一些与控件相关的数据临时存放在 Tag 属性中，当把控件作为参数传递时，小口袋里面的对象也随之传递过去了。

5. Name 属性：获取或设置控件的标识名称。在同一个窗体、页、用户控件中，Name 标识是唯一的。设置了控件的名称后，我们就可以在后端代码直接以这个标识去引用控件。

6. Margin 属性：获取或设置控件的外边距。如下所示，我们定义了一个 button 的 margin，距离左边、上边、右边和下边的像素分别是 20、40、60、80。

```xml
 <Grid>
     <Button Content="WPF中文网" Margin="20 40 60 80" />
</Grid>
```

![](WPF%20入门.assets/Pasted%20image%2020241021221841.png)

>**Padding 属性说明**：与 Margin 相对应的是 Padding，表示设置控件的内边距。但是这个属性并不在 FrameworkElement 中，而在 Control 类中，从本节第一张图所示，说明只有内容控件才具有 Padding，而 Shape 和 Panel 是没有 Padding 属性的。

7. HorizontalAlignment 属性：设置控件的水平对齐方式。这个对齐方式是相对于父元素而言的，比如我们有一个 Button 控件，在外面还包裹了一层 Grid 控件，那么，设置 Button 控件的 HorizontalAlignment 属性，可以将 Button 控件分别显示在 Grid 控件的左边、中间、右边三个位置。

8. VerticalAlignment 属性：设置控件的垂直对齐方式。与 HorizontalAlignment 属性类似，只是对方的方向不同，可以设置控件在垂直方向上是居于顶部、中间、还是底部三个位置。

总结：上述两个属性的值都是枚举型，它们都有一个共同的值，那就是 stretch，表示是拉伸的方式填充父元素的布局。

9. ToolTip 属性：获取或设置用户界面 (UI) 中为此元素显示的工具提示对象。指鼠标移到控件上方时显示的提示内容，它是一个 object 类型，意味着可以显示任意布局外观。

10. Parent 属性：获取此元素的逻辑父元素。它是一个只读属性。

接下来，我们将**介绍几个比较重要的属性**，这些属性是 WPF 框架中非常核心的知识概念，需要单独形成章节来学习，在这里，我们只是通过这些属性来引出其概念。

**WPF 样式**（Style）

什么是样式？简单来说，是指控件呈现时的样子。比如我们上班时会穿上工作服，休假时会穿上更个性化的衣服，我还是那个我，但是身上的衣服却不同，不管是颜色、款式，甚至包括我们的头饰、妆容，都会有所不同。

对于控件而言，同样都是 button 按钮，有的按钮是方的，有的是圆的，有的是蓝色，有的是红色，有的有文字，有的有图标，如果做到这些不同的样式呢？答案是 Style 属性。

11. Style 属性：获取或设置此元素呈现时所使用的样式。（关于 Style 样式我们会专门拿一章节来探讨）

与 Style 相关的还有一个属性，叫 FocusVisualStyle，顾名思义，控件在获得焦点时的样式。

**WPF 资源**（ResourceDictionary）

什么是资源？资源，也就是资源字典，也就是 ResourceDictionary 类，它提供一个哈希表/字典实现，其中包含组件所使用的 WPF 资源以及 WPF 应用程序的其他元素。我们可以把 WPF 的控件、窗体、Application 应用所用到的一切资源都放在其中，将多个 ResourceDictionary 元素合并起来形成一个 ResourceDictionary 元素（ResourceDictionary 也是一个隐式集合）。所以 FrameworkElement 类设计一个资源属性。

12. Resources 属性：获取或设置本地定义的资源字典。关于 Resources 资源我们会专门拿一章节来探讨）

**WPF 的数据上下文**（DataContext）

我们曾经在前面的《DependencyObject 类》一文中提到过数据驱动模式，控件的值绑定某个“变量”，当“变量”的值发生改变，控件的值也跟着改变，反过来说，当控件的值发生改变，“变量”的值也跟着改变。那么这个特指的“变量”是什么？它和我们今天要介绍的数据上下文有什么关系？

答案是，这个“变量”其实也是一个属性，且必须是一个属性（重点），它是谁的属性？WPF 说，它是某个 ViewModel 类的属性。

假定我们有一个 View 窗体，窗体有一个 TextBox 控件；又假如我们还有一个 ViewModel 实体，这个实体中有一个叫 Name 的属性。如果我们要将 TextBox 控件的 Text 属性和 ViewModel 实体的 Name 属性成功的建立绑定关系，必备的条件是什么？

首先，由于 View 窗体继承于 FrameworkElement 类，所以每个窗体（或控件）都有一个叫 DataContext 的数据上下文属性。所以必备的条件是：**ViewModel 实体必须先赋值给 View 窗体的 DataContext，ViewModel 的 Name 属性才能绑定到 TextBox 控件的 Text 属性。**换言之，领导之间要先搭好桥，下属和下属才好配合工作。这就是 DataContext 的概念和用途。（关于 DataContext 数据上下文我们会专门拿一章节来探讨）

13. DataContext 属性：获取或设置元素参与数据绑定时的数据上下文。

14. ContextMenu 属性：设置与获取控件的上下文菜单，就是鼠标在控件上右键时弹出来的菜单。

15. Cursor 属性：获取或设置在鼠标指针位于此元素上时显示的光标。

#### 2.6.3 事件分析

FrameworkElement 类提供了 12 个事件，一般比较常用的是：Initialized、Loaded、Unloaded、SizeChanged 等事件。

**方法成员**

FrameworkElement 类还提供了一些方法成员。

1. FindName (String)：表示查找某个元素。比如我们在窗体中要查找某个控件。

2. FindResource (Object)：查找某个资源。如果在调用对象上找不到该资源，则接下来搜索逻辑树中的父元素，然后搜索应用程序、主题，最后搜索系统资源。实在找不到就抛出异常。

3. TryFindResource (Object)：尝试去找某个资源。建议使用这个方法。

4. RegisterName (string , object )：注册控件的名称到父控件上。

```cs
	button2 = new Button();
	button2.Name = "Button2";
	            
	// 注册button2的名称到myMainPanel控件上
	myMainPanel.RegisterName(button2.Name, button2);
	button2.Content = "Button 2";
	button2.Click += new RoutedEventHandler(button2Clicked);
	myMainPanel.Children.Add(button2);
```

5. SetBinding (DependencyProperty, BindingBase) 和 SetBinding (DependencyProperty, String)，这两个成员都和绑定相关，我们将在后面做专题介绍。

最后，我们来看哪些类会继承这个 FrameworkElement 基类，以便于了解我们接下来要学哪些内容。

[Microsoft.Windows.Themes.BulletChrome](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.windows.themes.bulletchrome?view=windowsdesktop-7.0)  
[Microsoft.Windows.Themes.ScrollChrome](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.windows.themes.scrollchrome?view=windowsdesktop-7.0)  
[System.Windows.Controls.AccessText](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.accesstext?view=windowsdesktop-7.0)  
[System.Windows.Controls.AdornedElementPlaceholder](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.adornedelementplaceholder?view=windowsdesktop-7.0)  
[System.Windows.Controls.ContentPresenter](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.contentpresenter?view=windowsdesktop-7.0)  
[System.Windows.Controls.Control](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.control?view=windowsdesktop-7.0)  
[System.Windows.Controls.Decorator](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.decorator?view=windowsdesktop-7.0)  
[System.Windows.Controls.Image](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.image?view=windowsdesktop-7.0)  
[System.Windows.Controls.InkCanvas](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.inkcanvas?view=windowsdesktop-7.0)  
[System.Windows.Controls.ItemsPresenter](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.itemspresenter?view=windowsdesktop-7.0)  
[System.Windows.Controls.MediaElement](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.mediaelement?view=windowsdesktop-7.0)  
[System.Windows.Controls.Page](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.page?view=windowsdesktop-7.0)  
[System.Windows.Controls.Panel](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.panel?view=windowsdesktop-7.0)  
[System.Windows.Controls.Primitives.DocumentPageView](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.documentpageview?view=windowsdesktop-7.0)  
[System.Windows.Controls.Primitives.GridViewRowPresenterBase](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.gridviewrowpresenterbase?view=windowsdesktop-7.0)  
[System.Windows.Controls.Primitives.Popup](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.popup?view=windowsdesktop-7.0)  
[System.Windows.Controls.Primitives.TickBar](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.tickbar?view=windowsdesktop-7.0)  
[System.Windows.Controls.Primitives.Track](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.track?view=windowsdesktop-7.0)  
[System.Windows.Controls.TextBlock](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.textblock?view=windowsdesktop-7.0)  
[System.Windows.Controls.ToolBarTray](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.toolbartray?view=windowsdesktop-7.0)  
[System.Windows.Controls.Viewport3D](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.viewport3d?view=windowsdesktop-7.0)  
[System.Windows.Documents.Adorner](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.adorner?view=windowsdesktop-7.0)  
[System.Windows.Documents.AdornerLayer](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.adornerlayer?view=windowsdesktop-7.0)  
[System.Windows.Documents.DocumentReference](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.documentreference?view=windowsdesktop-7.0)  
[System.Windows.Documents.FixedPage](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.fixedpage?view=windowsdesktop-7.0)  
[System.Windows.Documents.Glyphs](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.glyphs?view=windowsdesktop-7.0)  
[System.Windows.Documents.PageContent](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.documents.pagecontent?view=windowsdesktop-7.0)  
[System.Windows.Interop.HwndHost](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.interop.hwndhost?view=windowsdesktop-7.0)  
[System.Windows.Shapes.Shape](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.shapes.shape?view=windowsdesktop-7.0)
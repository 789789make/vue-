模仿vue双向绑定

基本思路：数据劫持（setter/getter）和观察-订阅者模式；

具体实现：（这里只针对VueStep2）

页面渲染时，遍历data属性，给予一个简化的获取办法，之后同样遍历data,绑定每个属性的object.defineProperty()中的set,get方法=>执行compile,获取传入的el并解析带有{{}}文本，初始化成data中的值并且分别实例化watcher,setAndGet检测到改动时触发set,调用存在dep[]中的watcher对象的update方法（update执行完之后也就是调用CompileText中new Watcher的第三个参数--回调函数）来更新数据



不足：

1.

无法同时解析连续的两个文本节点

{{aa}}{{bb}}

a:'this is a',b:'this is b';

理想效果

this is athis is b;实际效果this is a;

2.只能局限于解析{{}}，其他形式的还不能做到解析，只实现了简单的双向绑定

3.selfVue.data[name]和selfVue[name]都能获取到内容，这是不希望看到的，因为会多浪费一份内存空间来存储多出来的（selfVue.data[name]）数据

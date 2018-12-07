 function Compile(el, vm) {//接收selfVue中传来的两个参数,el和vm,例子中el为#app,vm为
    //实例化的selfVue对象
        this.vm = vm;
        this.el = document.querySelector(el);//选择的节点
        this.fragment = null;//空代码段
        this.init();//执行init()
    }
    Compile.prototype = {
        init: function() {
            if (this.el) {//节点,若存在则进行下一步
                this.fragment = this.nodeToFragment(this.el);
                //执行nodeToFragment,传入参数为选择的节点
                //此时fragment为整个#app节点
                this.compileElement(this.fragment);//编译带{{}}的节点
               
                //执行nodeToFragment,传入为复制了#app的节点
                this.el.appendChild(this.fragment);
                
                //把
            } else {
                console.log('Dom元素不存在');
                //不存在则返回
            }
        },
        nodeToFragment: function(el) {//节点及其子元素进行复制
            var fragment = document.createDocumentFragment();
            var child = el.firstChild;
            while (child) {
                // 将Dom元素移入fragment中,直至没有
                fragment.appendChild(child);
                //appendChild会改变原节点
                child = el.firstChild;
            }
            return fragment;
        },
        compileElement: function(el) {
            var childNodes = el.childNodes;
            //子节点
            var self = this;
            //指向Compile
            var a=0;
            [].slice.call(childNodes).forEach(function(node) {
            //[].slice.call(childNodes)返回一个数组,使得
            //childNodes可以使用数组的slice方法(不改变原childNodes)
            //类似于Array.slice.call(childNodes)   
                var reg = /\{\{(.*)\}\}/;
                var text = node.textContent; 
                console.log(reg.exec(text));
            //获取每个字节点的文本节点
                if (self.isTextNode(node) && reg.test(text)) {
                // console.log(text);
                self.compileText(node, reg.exec(text)[1]);
                //如果遇到匹配的，则传入compileText,第一个参数为节点，第二个为{{}}中的字符串
                }
                if (node.childNodes && node.childNodes.length) {
                    self.compileElement(node); // 继续递归遍历子节点
                }
                //如果下面还有节点，则递归直至是一个没有后代的节点
            });
        },
        compileText: function(node, exp) {
            var self = this;//this指向Compile
            var initText = this.vm[exp];//放入{{}}中的内容
            this.updateText(node, initText); // 将初始化的数据初始化到视图中
            new Watcher(this.vm, exp, function(value) { // 生成订阅器并绑定更新函数
                self.updateText(node, value);
            });
        },
        updateText: function(node, value) {
            node.textContent = typeof value == 'undefined' ? '' : value;
            //如果传入的值为undefined,则为空，反之代替{{}}显示值在次节点中
        },
        isTextNode: function(node) {
            return node.nodeType == 3;//3为文本节点
        }
    }
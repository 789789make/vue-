function SelfVue (obj) {//传入的是一个对象
    var self = this;//定义一个self指向实例化的selfVue对象
    this.vm = this;//实例化的vm属性指向实例化的selfVue对象
    this.data = obj.data;//data数据为传入对象的data属性（即为vue中的date属性）
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });
    //老问题,可以同时获取this.data[name]和this[name],消耗内存
    console.log(this);
    //遍历data，为每个属性绑定一个简化操作
    //this.data[name]=>this[name]
    likeObserve(this.data);//绑定每个属性的set和get
    new Compile(obj.el, this.vm);//实例化Compile对象(传入参数为el(选择器),this.vm(
    //之前赋值为selfVue对象的vm属性))
    //跳转至compile.js步骤
    return this;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}
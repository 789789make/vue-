function selfVue(data,el,name){
     	this.data=data;
     	var self=this;
     	Object.keys(data).forEach(function(key){
     		self.proxyKeys(key)
     	})
     	likeObserve(data);
     	el.innerHTML=this.data[name];
     	new Watcher(this,name,function(value){
     		el.innerHTML=value;
     	})
     	return this;
     }
     selfVue.prototype.proxyKeys=function(key){
        var self=this;
        Object.defineProperty(this,key,{
        	enummerable:false,//设置不可枚举
        	configurable:true,
        	get:function(){
        		return self.data[key]
        	},
        	set:function(newVal){
        		self.data[key]=newVal;
        	}
        })
        }//简化操作，省略.date
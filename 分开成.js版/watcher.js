 //watch和dep放在一起，dep是储存watch的

    
     function Dep(){
     	this.subs=[];
     }
     Dep.target=null;
     Dep.prototype={
     	addSubs:function(sub){
     		this.subs.push(sub);
     	},
     	notify:function(){
     		this.subs.forEach(function(sub){
     			sub.update();
     		})
     	}
     }
      function Watcher(obj,name,fn){
          this.obj=obj;
          this.name=name;
          this.fn=fn;
          this.value=this.get();
     }
     Watcher.prototype={
          update:function(){
               this.run();
          },
          run:function(){
            var value=this.obj.data[this.name];
            var oldValue=this.value;
            if(value!=oldValue){
               this.value=value
               this.fn.call(this.obj,value,oldValue)
            }
          },
          get:function(){
               Dep.target=this;
               var value=this.obj.data[this.name];
               Dep.target=null;
               return value;
          }
     }

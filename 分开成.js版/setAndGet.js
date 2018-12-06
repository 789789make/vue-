function setAndGet(data,keys,val){
     	   likeObserve(val);
     	   var dep=new Dep()
           Object.defineProperty(data,keys,{
           	enummerable:true,
           	configurable:true,
           	 get:function(){
           	 	if(Dep.target){
                    dep.addSubs(Dep.target);
                    console.log('存在');
           	 	}
           	 	else{
           	 		console.log('不存在');
           	 	}         	 	
           	 	return val
           	 },
           	 set:function(newVal){
           	 	if(val===newVal){
           	 		return 
           	 	}
           	 	val=newVal;
           	 	console.log(keys+'已经被监听了,现在的值为'+newVal);
           	 	dep.notify();
           	 }
           })
     }
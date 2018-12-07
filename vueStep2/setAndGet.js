function setAndGet(data,keys,val){
     	   likeObserve(val);
     	   var dep=new Dep()
           Object.defineProperty(data,keys,{
           	enummerable:true,
           	configurable:true,
           	 get:function(){
           	 	if(Dep.target){
                    dep.addSubs(Dep.target); 
           	 	}
           	 	else{
           	 	}         	 	
           	 	return val
           	 },
           	 set:function(newVal){

           	 	if(val===newVal){
           	 		return 
                console.log('666');
           	 	}
           	 	val=newVal;
           	 	console.log(keys+'已经被监听了,现在的值为'+newVal);
           	 	dep.notify();
           	 }
           })
     }
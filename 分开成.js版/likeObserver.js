function likeObserve(obj){    	
     	if(!obj||(typeof obj!='object')){
     		return //如果当前obj不是对象则跳出循环
     	}
     	Object.keys(obj).forEach(function(keys){ 		
     		setAndGet(obj,keys,obj[keys]);//反之则进行递归赋予每个对象getter和setter
     	})
     }

	// 检查是否登录
	var owner = JSON.parse(sessionStorage.getItem('CurrentUser'));
	
	if (owner) {
		$loginBox = $('.head-login div');
		$loginBox[0].style.display = 'none'; 
		$loginBox[1].style.display = 'block'; 
		// console.log($('.head-login span'));
		$('.ownerName').text(owner.name);
	}
	else{
		location.href = 'login.html';
	}

	// 点击注销
	$('.linkLogout').bind('click' , function(e){
		// 清除缓存
		sessionStorage.setItem('CurrentUser','');
		location.href = 'login.html';
	});


	// 获取当前时间并转换格式----可进行日期比较！！！！！
	function nowTime(){
		var myDate = new Date();
	    //获取当前年
	    var year=myDate.getFullYear();
	    //获取当前月
	    var month=myDate.getMonth()+1;
	    //获取当前日
	    var date=myDate.getDate();
	    var h=myDate.getHours();       //获取当前小时数(0-23)
	    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	    var s=myDate.getSeconds();
	    var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

	    return now;
	}
	function p(s) {
        return s < 10 ? '0' + s: s;
    }

/*(function(){

})();*/
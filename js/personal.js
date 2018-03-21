(function(){
	// 点击我的导航栏 切换显示页面
	$navs = $('.right-top>div');
	$divs = $('.person-center>div');
	$navs.click(function(e){
		var index = $(this).index();
		// console.log($divs[index]);
		$('.right-top>div.active').removeClass('active');
		$(this).addClass('active');
		$('.person-center>div.active').removeClass('active');
		$divs.eq(index).addClass('active');
	});

	/***************************************************************/
	/***********六大模块信息加载*********/
	/***************************************************************/
	/*加载用户数据*/

	/*左边栏---加载用户名与门牌号及个人资料*/
	if (owner){
        
		$('#ownerImage').attr('src' , ROOT_URL + 'images/' + owner.image);
        $('.ownerHomeNo').text(owner.homeNo + "室业主");

        $('#changeImage').attr('src' , ROOT_URL + 'images/' + owner.image);
        $('.editName').val(owner.name);
        $('.editIdNo').val(owner.idNumber);
        $('.editHomeNo').val(owner.homeNo);
        $('#myNickname').val(owner.nickName);
        $('#myPhone').val(owner.phoneNo);
        $('#myEmail').val(owner.email);
	}
	
	/*内容区---*/
			// 1. 团购
	$tbOrder = $('#tbOrder');
	var pagination = {
        pageSize:5,
        pageIndex:1,
        totalPage:0
    };
	// 获取我的团购
	loadMyOrders();
	function loadMyOrders(){
		$.get(ROOT_URL + 'ajax/myOrderList.php?ownerName=' + owner.name).then(function(response){
            if(response.code == 100){
                console.log(response);
                var orderList = response.data;
                if (orderList) {
                    $('.myorders div').css('display' , 'none');
                    $('.myorders table').css('display' , 'block');
                    fillOrder(orderList);
                }
            }
        });
	}
	function fillOrder(list){
		// 生成页码
		fillOrderPage(list);
		// 生成单页数据
		fillOrderData(list);
	}
	// 生成页码
	function fillOrderPage(list){
		$divPageFooter = $('.pageOrder');
        $divPageFooter.html('');

        //计算生成的总页码
        pagination.totalPage = parseInt(Math.ceil(list.length / pagination.pageSize));

        if(pagination.totalPage == 1)
        	return;

       	$('<span></span>').appendTo($divPageFooter).text('上一页');
        //生成页码
        for(var i = 0 ; i < pagination.totalPage ; i++){
            var $pageCodeItem = $('<a href="person.html?pageIndex='+ i+1 +'" ></a>');
            $pageCodeItem.text(i+1);
            $divPageFooter.append($pageCodeItem);

            $pageCodeItem.bind('click',function(e){
                //修改当前页码
                pagination.pageIndex = $(this).text();
                fillOrderData(list);
                //修改当前样式
                //console.log($pageCodeItem);
                $divPageFooter.find('a').removeClass('active');
                $(this).addClass('active');
                
                return false;
            });

        }
        if(pagination.totalPage > 1){
            $divPageFooter.find('a').first().addClass('active');
        }
        $('<span></span>').appendTo($divPageFooter).text('下一页');
    }
    // 
    function fillOrderData(list){
        $tbOrder.html('');
        var startPageNum = (pagination.pageIndex - 1) * pagination.pageSize;
        var temp = list.slice(startPageNum , pagination.pageIndex * pagination.pageSize);
        var countNum = startPageNum;
        for(var  i = 0 ;i < temp.length; i++){
            countNum++;
            $row = createOrderRow(temp[i],countNum);
            $tbOrder.append($row);
        }
    }
    // 
    function createOrderRow(item , num){
    	var $tr = $('<tr></tr>');

        var $tdName = $('<td></td>').text(item.goodName).appendTo($tr);
        var $tdImg = $('<td></td>').appendTo($tr);
    	$('<img/>').attr('src',ROOT_URL + 'images/' + item.image).appendTo($tdImg);
        var $tdPrice = $('<td></td>').text(item.goodPrice).appendTo($tr);
        var $tdCount = $('<td></td>').text(1).appendTo($tr);
        var $tdTime = $('<td></td>').text(item.orderTime).appendTo($tr);
        var $tdState = $('<td></td>').text(item.state==1?'已配送':'未配送').appendTo($tr);

        return $tr;
    }
	/*********************************/
    		// 2. 消息（维修）

    loadMyMsgs();
    function loadMyMsgs(){
    	$.get(ROOT_URL + 'ajax/repairList.php?ownerName=' + owner.name).then(function(response){
            if(response.code == 100){
                var msgList = response.data;
                // console.log(msgList);
                $('.person-message').html('');
                for(var  i = 0 ;i < msgList.length; i++){
		            $row = createMsgRow(msgList[i]);
		            $('.person-message').append($row);
		        }
            }
        });
    }
    function createMsgRow(item){
    	var $div = $('<div></div>').addClass('mymessage');

        var $divIcon = $('<div></div>').addClass('msgicon').appendTo($div);
        $('<img/>').attr('src',ROOT_URL + 'images/mess.png').appendTo($divIcon);
        var $divText = $('<div></div>').addClass('msgtext').appendTo($div);
        $divText.text(item.content);
        var $divdel = $('<div></div>').addClass('msgdel').text('删除').appendTo($div);
        $divdel.click(function(e){
            $.post(ROOT_URL + 'ajax/deleteMyMessages.php', 
                {ownerId:owner.id , id:item.id}, 
                function(result){
                    // console.log(result);
                    loadMyMsgs();
                });
        });

        return $div;
    }
	
	/*********************************/
    		// 3. 活动
    loadMyActs();
    function loadMyActs(){
    	$.get(ROOT_URL + 'ajax/myActivityList.php?ownerName=' + owner.name).then(function(response){
            if(response.code == 100){
                var actList = response.data;
                // console.log(actList);
                if (actList) {
                    $('.person-activity').html('');
                    for(var  i = 0 ;i < actList.length; i++){
    		            $row = createActRow(actList[i]);
    		            $('.person-activity').append($row);
    		        }
                }
            }
        });
    }
    function createActRow(item){
    	var $div = $('<div></div>').addClass('activity-item');

        var $divImg = $('<div></div>').addClass('activity-img').appendTo($div);
        $('<img/>').attr('src',ROOT_URL + 'images/' + item.image).appendTo($divImg);
        var $divText = $('<div></div>').addClass('activity-info').appendTo($div);
        $('<h2></h2>').text(item.title).appendTo($divText);
        $('<p></p>').text(item.content).appendTo($divText);
        // 比较日期
        var now = nowTime();
        if (item.overTime < now) {
        	var $divTab = $('<div></div>').addClass('activity-nobtn').text('已结束').appendTo($divText);
        }

        return $div;
    }

	/*********************************/
    		// 4. 帖子
    loadMyTab();
    function loadMyTab(){
    	$.get(ROOT_URL + 'ajax/myLifeList.php?ownerName=' + owner.name).then(function(response){
            if(response.code == 100){
                var tabList = response.data;
                // console.log(tabList);
                $('.person-tab').html('');
                for(var  i = 0 ;i < tabList.length; i++){
		            $row = createTabRow(tabList[i]);
		            $('.person-tab').append($row);
		        }
            }
        });
    }
    function createTabRow(item){
    	var $div = $('<div></div>').addClass('mytab');

        var $divImg = $('<div></div>').addClass('tab-img').appendTo($div);
        $('<img/>').attr('src',ROOT_URL + 'images/' + item.image).appendTo($divImg);
        var $divText = $('<div></div>').addClass('tab-content').appendTo($div);
        $('<h3></h3>').text(item.publicTime).appendTo($divText);
        $('<p></p>').text(item.content).appendTo($divText);

        return $div;
    }
	/***************************************************************/
	// 点击进入完善个人资料
	$('.left-moreInfo p').click(function(e){
		$('.right-top>div.active').removeClass('active');
		$('.person-center>div.active').removeClass('active');
		console.log($divs.eq($navs.length));
		$divs.eq($navs.length).addClass('active');
	})
	// 点击修改头像
    $('#changeImage').click(function(e){
        $('#fileImg').click();
        $("#fileImg").on("change",function(){
            if (window.URL!=undefined)
                var objUrl = window.URL.createObjectURL(this.files[0]) ;//获取图片的路径，该路径不是图片在本地的路径
            
            if (objUrl) {
                $("#changeImage").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
                // $("#ownerImage").attr("src", objUrl) ;
            }
        });
    })
       
    /*function changeImg(sender){
        var file = sender.files[0];
        var formData = new FormData();
        formData.append('activeImageFile',file);
        $.ajax( {
            url:'ChangeTouxiang.html',
            type:'post',
            data:formData,
            success:function(data){
                $('#mytouxiang').attr('src','images/'+data);
                $('#changetouxiang').val(data);
            }
        }); 
    }*/
    /*var img = $('#changeImage').attr('src');
    var arrImg = img.split('/');
    var myImg = arrImg[arrImg.length-1];
    console.log(img+'---'+arrImg+'---'+myImg);*/
    // 完善资料 changeOwnerData
    $('.btn-submit').click(function(e){

        var img = $('#changeImage').attr('src');
        var arrImg = img.split('/');
        var myImg = arrImg[arrImg.length-1];
        console.log(img+'---'+arrImg+'---'+myImg);
		
		var myNickname = $('#myNickname').val();
		var myPhone = $('#myPhone').val();
		var myEmail = $('#myEmail').val();

        var formdata = new FormData();
				// {ownerName:owner.name , nickName:myNickname , phone:myPhone , email:myEmail , image:myImg},
        formdata.append('ownerName' , owner.name);
        formdata.append('nickName' , myNickname);
        formdata.append('phone' , myPhone);
        formdata.append('email' , myEmail);
        formdata.append('image' , myImg);

        var chkPhone = checkPhone();
        var chkEmail = checkEmail();
        if(myNickname && myPhone && myEmail && chkPhone && chkEmail){
            /*$.ajax({
                type:'post',
                url:ROOT_URL + 'ajax/changeOwnerData.php',
                data:formdata,
                //cache: false,
                contentType: false,
                processData: false,
                success:function(response){     
                    console.log(response);          
                    if (result) {
                        $('#noticeCenter').text('修改成功');
                        $('#noticeMessage').fadeIn(1000);
                        $('#noticeMessage').delay(1000).fadeOut(1000);
                        $('#ownerImage').attr('src' , 'images/'+myImg);
                        $('#ownerName').text(myNickname);
                    }
                }
            })*/
            $.post(
                ROOT_URL + 'ajax/changeOwnerData.php',
                {ownerName:owner.name , nickName:myNickname , phone:myPhone , email:myEmail , image:ROOT_URL+'images/'+img+".jpg"},
                function(result){
                    console.log(result);
                    if (result.code == 100) {
                        $('#noticeCenter').text('修改成功');
                        $('#noticeMessage').fadeIn(1000);
                        $('#noticeMessage').delay(1000).fadeOut(1000);
                        
                        $('#ownerImage').attr('src' , 'images/'+img);
                        $('#ownerName').text(myNickname);
                    }
				}
			);
        }
        else{
            $('#noticeCenter').text('请填写完整的用户信息');
            $('#noticeMessage').fadeIn(1000);
            $('#noticeMessage').delay(1000).fadeOut(1000);
		}
    })
    
		// 验证手机号码
		function checkPhone(){
			var phone = $('#myPhone');
			var pattern = /^1[3578]\d{9}$/;
			if (!pattern.test(phone.val())) {
				phone.next().addClass = 'item-warning';
				return false;
			}
			else{
				phone.next().addClass = 'item-normal';
				return true;
			}
		}

		// 验证电子邮箱
		function checkEmail(){
			var email = $('#myEmail');
			var pattern = /^\w+([-+.])*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (!pattern.test(email.val())) {
				email.next().addClass = 'item-warning';
				return false;
			}
			else{
				email.next().addClass = 'item-normal';
				return true;
			}
		}

    /********************修改密码***************************************/ 
	// 修改密码 newPassword （ownerName newPassword）
    $('#editPsdBtn').bind('click' , function(e){
        var oldPsd=$("#myOldPsd").val();
        var newPsd=$("#myNewPsd").val();
        var confirmPsd=$("#confirmPsd").val();
        var p1=checkold();
        var p2=checknew();
        var p3=checkconfirm();
        /*console.log(oldPsd+'---'+newPsd+'---'+confirmPsd)
        console.log(p1+'---'+p2+'---'+p3);
        console.log(p1==false||p2==false||p3==false);*/
        if(p1 && p2 && p3){
            $.post(
                ROOT_URL + 'ajax/newPassword.php',
                {ownerName:owner.name , oldPassword:oldPsd , newPassword:newPsd},
                function(response){
                    console.log(response);
                    if(response.code == 100){
                        console.log('密码修改成功');
                        $('#loading').show().delay(3000).hide(0);   
                        setTimeout("location.href='login.html'",3000);
                    }else if(response.code == 101){
                        $("#myOldPsd").next().removeClass("item-normal").addClass("item-warning");
                    }else{
                        $("#noticeCenter").text("修改失败");
                        $("#noticeMessage").fadeIn(1000);
                        $("#noticeMessage").delay(1000).fadeOut(1000);
                    }
                }
            )
        }
    })
    
    function checkold(){
        var oldPsd=$("#myOldPsd").val();
        var chk=checkPsd(oldPsd);
        if(oldPsd==""||chk==false){
            $("#myOldPsd").next().removeClass("item-normal").addClass("item-warning");
            return false;
        }else{
            $("#myOldPsd").next().removeClass("item-warning").addClass("item-normal");
            return true;
        }
    } 

    function checknew(){
        var oldPsd=$("#myOldPsd").val();
        var newPsd=$("#myNewPsd").val();
        var chk=checkPsd(newPsd);

        if(newPsd==""||chk==false){
            $("#myNewPsd").next().removeClass("item-normal").addClass("item-warning");
            return false;
        }else if(newPsd == oldPsd){
            $("#myNewPsd").next().removeClass("item-normal").addClass("item-warning").text('新密码不能与旧密码相同');
        }
        else{
            $("#myNewPsd").next().removeClass("item-warning").addClass("item-normal");
            return true;
        }
    }
    function checkconfirm(){
        var newPsd=$("#myNewPsd").val();
        var confirmPsd=$("#confirmPsd").val();
        if(confirmPsd != newPsd){
            $("#confirmPsd").next().removeClass("item-normal").addClass("item-warning");
            return false;
        }else{
            $("#confirmPsd").next().removeClass("item-warning").addClass("item-normal");
            return true;
        }
    }

    function checkPsd(pwd){
        var pattern=/^\w{6}$/;
        if(!pattern.test(pwd))
        {
            return false;  
        }else{
            return true;
        }
    }   
	/***************************************************************/
		
	})();
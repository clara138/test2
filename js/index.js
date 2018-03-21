/**
 * Created by Administrator on 2018/3/3.
 */

(function(){


    //获取小区公告信息
    notice();

    var $marquee = $('marquee');
    function notice(){
        $.get(ROOT_URL+'noticeList.php').then(function(response){
            if(response.code == 100){
                // console.log(response)
                var noticelist = response.data;
                for(var i = 0 ; i < noticelist.length ; i++){
                    var $li = $('<li></li>').text(noticelist[i].content);
                    $li.appendTo($marquee);
                }
            }
        });
    }


    //---------------------------创建-----------------------------------

    //小区公告创建 （li）
    //function createNotice(noticelist){
    //    var $li = $('<li></li>>').text(noticelist.content)
    //    return $li;
    //}


})()
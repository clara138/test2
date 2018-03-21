(function(){

    var ROOT_URL = "http://192.168.12.112:9097/PHPCommunity/communityData/";

    //获取商品信息
    getAllGoods();

    var $section = $('.shop-everyShow-bottom');
    function getAllGoods(){
        
        $.get(ROOT_URL+'ajax/goodsList.php').then(function(response){
            if(response.code == 100){
                // console.log(response);
                var goodlist = response.data;
                for(var i = 0 ; i < goodlist.slice(0 , 4).length ; i++){
                    var $item = $('<div></div>');
                    $item.appendTo($section);

                    /*var $img = $('<img>').attr('src' , ROOT_URL + 'images/' + goodlist[i].image);
                    $img.appendTo($item);*/

                    var $title = $('<span></span>').text(goodlist[i].title);
                    $title.appendTo($item);
                }
            }
        });
    }


    //--------------------------------------------------------------



})()
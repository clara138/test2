/**
 * Created by Administrator on 2018/3/3.
 */
(function(){
    angular.module('app.services',[])
        .constant('URL','http://192.168.12.112:9097/PHPCommunity/communityData/')

        //首页信息
        .service('indexInfoSer',function($http,URL){
            //小区公告,通知
            this.getNotice=function(){
                return $http.get(URL+'ajax/noticeList.php')
            }
        })
})
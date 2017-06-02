// http://wechat.fotile.com/worldwaterday
// http://wechat.fotile.com/2017awe/FotileShuijiao
document.write("<script src='./jssdk.php?url=" + escape(window.location.href) + "&v=1.0'><\/script>");
_shareName = _shareName.replace('&nbsp;', ' ');
_shareName1 = _shareName.replace(' ', '');
if (_shareName1 == "水槽先碗机") {
    _shareName1 = "方太水槽先碗机";
}
var _title,_title_right;
if(_post==0){
    _title = "我的名字会唱歌，我愿#给你我的水#";
    _title_right ='';
}else{
    _title = "我是"+_shareName1;
    _title_right = '-歌曲分享自FOTILE Music'
}

var sharedata = {
    title: _title+_title_right,
    link: 'http://wechat.fotile.com/worldwaterday/share.html?temp=' + _shareName + "&num=" + _num + "&index=" + _index + "&video=" + _video,
    img: 'http://wechat.fotile.com/worldwaterday/img/share.jpg',
}
var sharedata1 = {
    title: _title,
    link: 'http://wechat.fotile.com/worldwaterday/share.html?temp=' + _shareName + "&num=" + _num + "&index=" + _index + "&video=" + _video,
    img: 'http://wechat.fotile.com/worldwaterday/img/share.jpg',
    desc: '歌曲分享自FOTILE Music',
}
wxcallback(sharedata);

function wxcallback(sharedata) {
    var share1 = {
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.img,
        success: function() {
            $.get('http://wechat.fotile.com/worldwaterday/public/index.php/api/share/timeline/' + _code);
        },
        cancel: function() {}
    };
    var share2 = {
        title: sharedata1.title,
        link: sharedata1.link,
        imgUrl: sharedata1.img,
        desc: sharedata1.desc,
        success: function() {
            $.get('http://wechat.fotile.com/worldwaterday/public/index.php/api/share/friend/' + _code);
        },
        cancel: function() {}
    };
    wx.ready(function() {
        wx.onMenuShareTimeline(share1);
        wx.onMenuShareAppMessage(share2);
    });
}
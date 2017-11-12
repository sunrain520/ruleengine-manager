/**
 * Created by huangjiajia on 2016/10/11.
 * 父页面的公共函数
 */

/**
 * @Author huangjiajia
 * @Description 新开Tab方法
 * @param href  iframe 链接
 * @param $dom 第几个 iframe
 * @param text  Tab名称
 * @returns {boolean}
 */
function newTab($dom, href, text) {
    var htmlTab     = '',
        htmlIframe  = '',
        shortText   = '',
        isShow      = true,
        indexID     = +new Date(),
        index       = $dom.attr('data-index'),
        iframeIndex = 'iframe' + index,
        $navbarLeft = $('#page-navbar-left');

    // 判断链接是否存在
    if(href == undefined || $.trim(href).length == 0) {
        return false;
    }

    // 判断当前选项卡是否已经添加
    $('#page-content .js-tab-item').each(function () {
        var $that = $(this);

        // 如果存在，判断是否为active状态
        if($that.data('name') == iframeIndex) {

            if(!$that.hasClass('active')) {
                $that.addClass('active').siblings('.js-tab-item').removeClass('active');

                // 判断当前的是否在可视区域
                showActiveTabItem();

                // 显示相应页面
                showExistIframe(iframeIndex);
            } // end if

            // 当前选项卡为active状态
            isShow = false;
            return false;
        }
    });

    text = $.trim(text); // text 前后可能会有空格！！！,设置tab的名称最多显示十个字符
    if(text.length > 10){
        shortText = text.substr(0,10) + '...';
    } else {
        shortText = text;
    }

    // 如果当前选项卡不存在，则新开一个选项卡
    if(isShow) {
        htmlTab += '<li class="tab-item active js-tab-item"  data-href="' + href + '" data-name="iframe' + indexID + '">';
        htmlTab += '<a class="link" href="javascript:;" title="'+text+'" >' + shortText + '<span class="glyphicon glyphicon-remove-sign js-close-btn"></span></a>';
        htmlTab += '</li>';

        $('#page-content .js-tab-item').removeClass('active');
        $('.js-tab-list').append(htmlTab);

        htmlIframe += '<iframe class="js-iframe" id="iframe' + indexID + '" name="iframe' + indexID + '" width="100%" height="100%" src="' + href + '" frameborder="0" data-href="' + href + '" seamless=""></iframe>';
        $('#page-main').find('.js-iframe').hide();
        $('#page-main').append(htmlIframe);

      
        // 判断当前选项卡是否在可视区域
        showActiveTabItem();

        // 更新左边导航的data-index值
        $dom.attr('data-index', indexID);

        // 如果左边导航收起的时候  去重
        if($navbarLeft.find('.js-menu-folder').length > 0) {

             //.js-menu-folder
            $navbarLeft.find('.nav-list .js-nav-item').each(function () {
                var $item = $(this);

                if($item.attr('data-target') == href) {
                    $item.attr('data-index', indexID);
                }
            })
        }
    }

    hideNavBarLeft();
}

/**
 * @Author huangjiajia
 * @Description 保证当前被激活的tab在可视区域内
 */
function showActiveTabItem() {
    var $tabActive = $('.js-tab-list .js-tab-item.active'),
        $tabRight  = $('.js-tab-menu .js-right'),
        $tabList   = $('.js-tab-list'),
        originLeft = 0,
        diffLeft   = 0;

    
    originLeft = $tabList.length > 0 && ($tabList.css('margin-left').split('px')[0] * 1);
    diffLeft   = ($tabRight.length > 0 && $tabActive.length > 0) && ($tabRight.position().left - $tabActive.position().left - $tabActive.width() + originLeft);

    /*
     * 判断是否在可视区域内： offset().left + width > $tabRight.offset().left
     * 设置$tabList的margin-left: - ($tabRight.offset().left - offset().left - width)
    */
    if(diffLeft < 0) {
        $tabList.css('margin-left', diffLeft + 'px');
    }
}

/**
 * @Author huangjiajia
 * @Description 显示iframe
 * @param href
 */
function showExistIframe(name) {
    $('#page-main .js-iframe').each(function () {
        var $self = $(this);

        if($self.attr('id') == name) {
            $self.show().siblings('.js-iframe').hide();
            return false;
        }
    }); // end each
}

// 新开Tab
var $body = $('body');
$body.on('click', '.js-nav-item', function (e) {
    e.preventDefault();
    e.stopPropagation();
    

    var $this   = $(this),
        href    = $this.data('target'),
        text    = $this.text() || $this.data('text'),
        //index   = $this.data('index'),
        $subnav = $this.find('.js-subnav'),
        $parentNav;
        
    newTab($this, href, text);

    if(!$this.hasClass('active')) {

        if($this.closest('.js-subnav').length == 0) {
            if($subnav.length > 0) {
                $subnav.eq(0).slideDown(300);
                $this.siblings('.js-nav-item').find('.js-subnav').fadeOut(300);
            }
            $this.addClass('active').siblings('.js-nav-item').removeClass('active');
        }
        else {
            $parentNav = $this.closest('.js-subnav').closest('.js-nav-item');

            if(!$parentNav.hasClass('active')) {
                
                $parentNav.siblings('.js-nav-item').removeClass('active');
                $parentNav.addClass('active');
            }
            $('.js-nav-item').removeClass('active');
            $(this).addClass('active')
        }
    }
    else {
        $subnav.slideUp(300);
        $this.removeClass('active');
        $this.find('.subnav-item.active').removeClass('active');
    }

});

// 二级菜单展开与搜索
$body.on('click', '.js-subnav .js-nav-content', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);

    setSecondNavbarStatus($this)
});

// 左边导航收起来时二级菜单展开与搜索
$body.on('click', '.js-single-nav-wrap .js-nav-content', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);

    setSecondNavbarStatus($this)
});

function setSecondNavbarStatus($dom) {
    var $this    = $dom,
        $navItem = $this.closest('.subnav-item'),
        href     = $this.data('target'),
        text     = $this.text(),
    //index   = $this.data('index'),
        $subnav = $this.nextAll('.js-subnav');

    if(!$navItem.hasClass('active')) {

        if($subnav.length > 0) {
            $subnav.slideDown(300);
            $navItem.siblings('.js-nav-item').find('.js-subnav').fadeOut(300)
        }

        $navItem.addClass('active').siblings('.js-nav-item').removeClass('active');
    }
    else {
        $subnav.slideUp(300);
        $navItem.removeClass('active');
    }
}

// 隐藏左边导航
function hideNavBarLeft() {
    if($(window).width() <= 1450) {
        setfolderNavBarLeft();
    }
}

function selectTabItem() {
    var $this = $(this),
        name;

    // 判断当前选项卡是否为active
    if(!$(this).hasClass('active')) {
        name = $this.data('name');

        // 显示相应的iframe
        showExistIframe(name);

        // 当前选项卡更新为active
        $this.addClass('active').siblings('.js-tab-item').removeClass('active');

        // 判断当前选项卡是否在可视区域
        showActiveTabItem();
    }
}

// 选择选项卡
$('.js-tab-list').on('click', '.js-tab-item', selectTabItem)
    .on('dblclick', '.js-tab-item', function () {

        $(this).index() != 0 && (closeActiveTabCommon($(this)));
    });

function closeCurrentTab() {
//    e.preventDefault();
    var $this    = $(this),
        $tabItem = $this.closest('.js-tab-item');

    closeActiveTabCommon($tabItem);
}

/**
 * Description: 关闭当前tab的公共方法
 * @param $tabItem：需要关闭tab的.js-tab-item对象
 */
function closeActiveTabCommon($tabItem) {
    var $lastTab,
        isActive = false;



    if($tabItem.hasClass('active')) {
        isActive = true;
    }

    // 关闭当前Tab
    $('.js-iframe[id="' + $tabItem.data('name') + '"]').remove();
    $tabItem.remove();

    /*
     * 更新选项卡
     * 定位到最后一个js-tab-item
     */
    $lastTab = $(".js-tab-list .js-tab-item").last();

    if(isActive) {
        $lastTab.addClass('active');
        $('.js-iframe[id="' + $lastTab.data('name') + '"]').show();
    }

    /*
     * 关闭当前Tab，判断是否向后移动
     * 1. 获取中间显示区域的长度（widthFixed）.js-tab-menu - #js-tab-prev - .js-right
     * 2. 计算tab列表宽度 .js-tab-list - margin-left
     * 3. 计算 差量diffWidth
     */
    var $tabMenu       = $('.js-tab-menu'),
        widthFixed     = $tabMenu.outerWidth() - $('#js-tab-prev').outerWidth() - $tabMenu.find('.js-right').outerWidth(),
        $tabList       = $tabMenu.find('.js-tab-list'),
        tabActualWidth = $tabList.outerWidth(),
        tabMarginLeft  = $tabList.css('margin-left') ? $tabList.css('margin-left').split('px')[0] : 0,
        tabShowWidth   = tabActualWidth - tabMarginLeft,
        diffWidth      = widthFixed - tabShowWidth;

    // 判断
    if(diffWidth > 0) {
        if(diffWidth > tabMarginLeft) {
            $tabList.css('margin-left','0px');
        }
        else {
            $tabList.css('margin-left', tabMarginLeft - diffWidth + 'px');
        }
    }

}

/**
 * 关闭当前激活的选项卡 .js-tab-list -> .js-tab-item.active -> name
 */
function closeActiveTab() {
    var $tabItem = $('.js-tab-list .js-tab-item.active');

    closeActiveTabCommon($tabItem);
}

// 点击选项卡后面的关闭图标，关闭当前选项卡和iframe
$('.js-tab-list').on('click', '.js-close-btn', closeCurrentTab);

// 刷新当前Tab 只能刷新当前相同域下面的页面
$('.js-refresh').on('click', function () {

    // 获取当前iframe .js-tab-item.active
    var iframeName = $('.js-tab-item.active').data('name');

    document.getElementById(iframeName).contentWindow.location.reload(true);
});

/* 关闭选项卡面板 */
// 定位到当前选项卡、#js-fix-tab-item
$('#js-fix-tab-item').on('click', function () {
    showActiveTabItem();
});

// 关闭全部选项卡 #js-close-all-tab .js-tab-list -> .js-tab-item
$('#js-close-all-tab').on('click', function () {

    //var $tabItem = $('.js-tab-list .js-tab-item');
    // 遍历$tabItem 删除与之对应的iframe
    $('.js-iframe:not(:first-child)').remove();
    $('.js-tab-list .js-tab-item:not(:first-child)').remove();
    $('.js-tab-list .js-tab-item:first-child').addClass('active');
    $('.js-iframe:first-child').show();
});

// 关闭其他选项卡 #js-close-other-tab .js-tab-list -> .js-tab-item
$('#js-close-other-tab').on('click', function () {
    var $tabActive = $('.js-tab-list .js-tab-item.active'),
        iframeName = $tabActive.data('name');

    $tabActive.siblings('.js-tab-item:not(:first-child)').remove();
    $('.js-iframe[id="' + iframeName + '"]').siblings('.js-frame:not(:first-child)').remove();
});
/* 关闭选项卡面板 END */

/* tab-list 向前和向后操作 */
// 向前 #js-tab-prev js-tab-list -> margin-left: 0;
$('#js-tab-prev').on('click', function () {
    $('.js-tab-list').css('margin-left',0);
});

// 向后 #js-tab-next .js-tab-list -> margin-left: width() - right.width
$('#js-tab-next').on('click', function () {
    var $tabMenu   = $('.js-tab-menu'),
        $tabList   = $tabMenu.find('.js-tab-list'),
        $tabItem   = $tabList.find('.js-tab-item'),
        $tabRight  = $('.js-tab-menu .js-right'),
        prevWidth  = $('#js-tab-prev').outerWidth(),
        diffLeft   = 0,
        offsetLeft = 0;

    diffLeft = $tabMenu.width() - $tabRight.outerWidth() - prevWidth;
    $tabItem.each(function(){

        offsetLeft = $(this).position().left;
        offsetLeft = offsetLeft - 40;

        if(offsetLeft > diffLeft) {
            $tabList.css('margin-left', -(offsetLeft) + 'px');
            return;
        }
    });
});

/* tab-list 向前和向后操作 END */

// 收起菜单 #js-menu-control
$('#js-menu-control').on('click', function () {
    var $this    = $(this),
        $leftBar = $('#page-navbar-left'),
        $header  = $('#page-header'),
        $pages   = $('#page-content');

    folderNavBarLeft($this, $leftBar, $header, $pages);
});

// 页面初始化时判断屏幕大小
if($(window).width() <= 1450) {
    setfolderNavBarLeft();
}

// 当窗口动态变化时 监听浏览器宽度
$(window).resize(function() {
    if($(window).width() <= 1450) {
        setfolderNavBarLeft();
    }
    else {
        showFolderNavBarLeft();
    }
});

/**
 * Description: 左边导航收起来样式
 * @param $this：#js-menu-control
 * @param $leftBar：$('#page-navbar-left')
 * @param $header：$('#page-header')
 * @param $pages：$('#page-content')
 */
function folderNavBarLeft($this, $leftBar, $header, $pages) {
    if($this.hasClass('folder')) {
        $this.removeClass('folder');
        $leftBar.removeClass('folder');
        $header.removeClass('folder');
        $pages.removeClass('folder');

        $this.find('.js-icon').removeClass('icon-right');

        $leftBar.find('.js-menu-folder').remove();
    }
    else {
        $this.addClass('folder');
        $leftBar.addClass('folder');
        $header.addClass('folder');
        $pages.addClass('folder');

        $this.find('.js-icon').addClass('icon-right');

        setLeftNavFolderIcon();
    }
}

/**
 * Description: 左边导航收起来效果
 */
function setfolderNavBarLeft() {
    var $this        = $(this),
        $menuControl = $('#js-menu-control'),
        $leftBar     = $('#page-navbar-left'),
        $header      = $('#page-header'),
        $pages       = $('#page-content');

    $this.addClass('folder');
    $leftBar.addClass('folder');
    $header.addClass('folder');
    $pages.addClass('folder');

    $menuControl.find('.js-icon').addClass('icon-right');

    setLeftNavFolderIcon();
}

/**
 * Description: 左边导航收起来效果
 */
function showFolderNavBarLeft() {
    var $this        = $(this),
        $menuControl = $('#js-menu-control'),
        $leftBar     = $('#page-navbar-left'),
        $header      = $('#page-header'),
        $pages       = $('#page-content');

    $this.removeClass('folder');
    $leftBar.removeClass('folder');
    $header.removeClass('folder');
    $pages.removeClass('folder');

    $menuControl.find('.js-icon').removeClass('icon-right');

    //
    $leftBar.find('.js-menu-folder').remove();
}

/*
 * 左边导航收起来小图标mouseenter事件
 * .js-icon-menu : 小图标
 * #page-navbar-left: 左边菜单导航
 *    .nav-list>.js-nav-item>.js-nav-content > .icon 获取小图标
 *    ..nav-list>.js-nav-item>.js-subnav > .js-nav-item 获取每个内容
 */
var setTime, setTime1;
$body.on('mouseenter', '.js-icon-menu', function () {
    var $this        = $(this),
        index        = $this.index(),
        $navItemR    = $('#page-navbar-left .nav-list>.js-nav-item.actived').eq(index),
        navItemText  = $navItemR.find('.js-nav-content .text').text(),
        //iconItemHtml = $navItemR.find('.icon-left')[0].innerHTML,
        $subNavItemR = $navItemR.find('.js-subnav'),
        html         = '',
        top          = $this.offset().top,
        left         = $this.offset().left + $this.width(),
        styleObj     = {top:top, left: left};

    clearTimeout(setTime);
    clearTimeout(setTime1);

    setSingleNavItemHTML(styleObj, $subNavItemR);
}).on('mouseleave', '.js-icon-menu', function (e) {

    setTime = setTimeout(function () {
        $body.find('.js-single-nav-wrap .subnav-list').hide();
    },500)
});

$body.on('mouseenter', '.js-single-nav-wrap', function () {
    var $this = $(this);

    clearTimeout(setTime);
    clearTimeout(setTime1);

    $this.show();
}).on('mouseleave', '.js-single-nav-wrap', function (e) {
    e.stopPropagation();
    e.preventDefault();

    setTime1 = setTimeout(function () {
        $body.find('.js-single-nav-wrap .subnav-list').hide();
    },500)
});

// 创建左边导航hover HTML
function setSingleNavItemHTML(styleObj, $subNavItemR) {
    var html           = '',
        $singleNavWrap = $body.find('.js-single-nav-wrap'),
        style          = 'position: absolute; display:block; top:' + styleObj.top + 'px; left:' + styleObj.left + 'px';

    if($singleNavWrap.length == 0) {
        html  = '<div class="single-nav-wrap js-single-nav-wrap" style="' + style + '">';
        html += $subNavItemR.html();
        html += '</div>';

        $body.append(html);
    }
    else {
        $singleNavWrap.empty()
            .html($subNavItemR.html())
            .css({
                top: styleObj.top + 'px',
                left: styleObj.left + 'px'
            });
    }
}

// .nav-list>.js-nav-item>.js-subnav > .js-nav-item 获取每个内容
function setLeftNavFolderIcon() {
    var html        = '',
        $navbarLeft = $('#page-navbar-left'),
        $navItem    = $navbarLeft.find('.nav-list>.js-nav-item.actived'),
        $menuIcon   = null;

    html  = '<div class="menu-folder js-menu-folder">';
    html += '<ul class="nav-list">';

    $navItem.each(function () {
        var $item = $(this);

        $menuIcon = $item.find('.js-nav-content>.icon-left');

            html += '<li class="nav-item js-icon-menu">';
            html += '<div class="item-content">';
            html += $menuIcon[0].outerHTML;
            html += '</div>';
            html += '</li>';
    });

    html += '</ul>';
    html += '</div>';

    $navbarLeft.append(html);
}


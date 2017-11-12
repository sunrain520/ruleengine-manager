/**
 * Author: huangjiajia
 * Description: 弹框插件
 * Version: 1.0
 */
;(function ($, win) {

    /**
     * 步骤：
     * 1. 创建Dialog对象
     * 2. 创建公共的生成html结构的函数
     */

    // 创建Dialog对象
    var Dialog = {};
    var $body  = $('body');

    // 重置Dialog的原型链
    Dialog.fn = Dialog.prototype = function () {};

    // 定义公共函数
    var openDialog = function(options) {
        var type      = options.type     || 'open',
            title     = options.title    || '提示',
            content   = options.content  || '',
            btn       = options.btn      || [],
            index     = options.index    || +new Date() + 99999,
            yes       = options.yes      || function (index) {Dialog.close(index)},
            cancel    = options.cancel   || function (index) {Dialog.close(index)},
            seconds   = options.seconds  || 10,
            showBg    = options.showBg   || false,
            icon      = options.icon     || '',
            area      = options.area     || [],
            html      = '',
            innerHtml = '',
            maxZIndex = 9999,
            styleHtml = 'display:none;',
            iconHtml  = '',
            titleHtml = '',
            mainHtml  = '';

        // 判断是哪种类型的弹框
        switch(type) {
            case 'msg':
                innerHtml = '';
                innerHtml += '<div class="dialog-msg-content">' + content + '</div>';
                break;
            case 'confirm':
                innerHtml = '';
                innerHtml += '<button class="dialog-btn dialog-ok-btn">' + btn[0] + '</button>';
                innerHtml += '<button class="dialog-btn dialog-cancel-btn">' + btn[1] + '</button>';
                break;
            case 'open':
                innerHtml = '';
                btn[0] &&　(innerHtml += '<button class="dialog-btn dialog-ok-btn">' + btn[0] + '</button>');
                btn[1] &&  (innerHtml += '<button class="dialog-btn dialog-cancel-btn">' + btn[1] + '</button>');
                break;
            case 'alert':
                innerHtml = '';
                btn[0] &&　(innerHtml += '<button class="dialog-btn dialog-ok-btn">' + btn[0] + '</button>');
        }

        maxZIndex = getMaxZIndex(maxZIndex) + 1;
        styleHtml += 'z-index:' + maxZIndex +';';
        iconHtml  = icon ? icon : '';

        // 如果配置了宽度和高度
        area[0] && (styleHtml += 'width:' + area[0] + 'px;');
        area[1] && (styleHtml += 'height:' + area[0] + 'px;');

        title[1]   && (titleHtml = title[1]);
        content[1] && (mainHtml  = content[1]);

        if(type == 'msg') {
            html += '<div class="dialog dialog-msg dialog-' + index + ' dialog-msg-' + index + '" style="' + styleHtml + '">' + innerHtml + '</div>'
        }
        else {
            html += '<div class="dialog dialog-' + index + '" style="' + styleHtml + '">';
            html += '<div class="dialog-inner">';
            html += '<div class="dialog-close-btn">X</div>';
            html += '<div class="dialog-title dialog-title-wrap" ' + titleHtml + '>';
            html += '<h1>' + title + '</h1>';
            html += '</div>';
            html += '<div class="dialog-content" style="' + mainHtml + '">'+ iconHtml + content;
            html += '</div>';
            html += '<div class="dialog-footer">';
            html += '<div class="btn-group">';
            html += innerHtml;
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }

        // 判断是否显示背景
        showBg && openBg();
        $body.append(html);
        $('.dialog-' + index).fadeIn();

        // 绑定事件
        switch (type) {
            case 'alert':
                // 确定按钮回调函数
                $body.on('click', '.dialog-ok-btn', function () {

                    yes && yes(index);
                    // 先移除背景在移除弹框
                    closeBg();
                });
                break;

            case 'confirm':
            case 'open':
                // 确定按钮回调函数
                $body.on('click', '.dialog-ok-btn', function () {
                    yes && yes(index);
                    closeBg();
                });

                // 取消按钮回调函数
                $body.on('click', '.dialog-cancel-btn', function () {
                    cancel && cancel(index);
                    closeBg();
                });
                break;
            case 'msg':
                seconds = seconds * 1000;
                setTimeout(function() {
                    $('.dialog-msg-' + index).fadeOut().remove();
                }, seconds);
                break;
        }

        // 关闭弹框
        $body.on('click', '.dialog-close-btn', function () {
            closeBg();
            $('.dialog-' + index).remove();
        });

        // 位置居中
        setPosition('.dialog-' + index);

        // 监听浏览器窗口变化
        $(window).resize(function () {
            // console.log('----');
            setPosition('.dialog-' + index)
        });

        // 拖拽功能
        $('.dialog-title-wrap').on('mousedown',function (event) {
            var e = event || window.event;

            moveTitleElem = $(this);

            if(this.setCapture) {
                this.setCapture();
            }
            else if(window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }

            moveDialogElem = moveTitleElem.closest('.dialog');

            movePointsStartPos = {'x': e.clientX, 'y': e.clientY};
            moveElemStartPos = {'top': parseInt(moveDialogElem.css('top')), 'left': parseInt(moveDialogElem.css('left'))};

            moveTitleElem.css('cursor','move');

            document.onmousemove = documentMouseMove;
        });

        $('.dialog-title-wrap').on('mouseup', function (event) {
            moveTitleElem.css('cursor','default');

            if (this.releaseCapture) {
                this.releaseCapture();
            }
            else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)

                console.log(Event.MOUSEMOVE , Event.MOUSEUP)
            }

            document.onmousemove = null;
        });

        return index;
    };

    var setPosition = function (dialogDom) {
        var $dialog   = $(dialogDom),
            width     = $dialog.width(),
            height    = $dialog.height(),
            winWidth  = window.innerWidth,
            winHeight = window.innerHeight,
            docHeight = $(document).height(),
            left      = 0,
            top       = 0;

        // 判断当前弹框的宽度、高度是否大于当前屏幕的宽、高
        if(width >= winWidth) {
            width = winWidth - 100;
            $dialog.css('width',width + 'px');
        }

        if(height >= winHeight) {
            height = winHeight - 100;
            $dialog.css('height',height + 'px');
        }

        docHeight > winHeight && (winWidth = winWidth - 17);

        left      = (winWidth - width) / 2;
        top       = (winHeight - height) / 2;

        $dialog.css({
            'left': left + 'px',
            'top' : top + 'px'
        });
    };

    Dialog.close = function (index) {
        $('.dialog-' + index).remove();
    };

    Dialog.closeAll = function () {
        $body.find('.dialog').remove();
    };

    // 显示背景
    var openBg = function () {
        var html = '<div class="dialog-bg">';
        $('.dialog-bg').length == 0 && ($body.append(html));

        $body.on('click', '.dialog-bg', function () {
            $(this).remove();
            Dialog.closeAll();
        })
    };

    var closeBg = function () {
        $('.dialog').length <= 1 && ($('.dialog-bg').remove());
    };

    var getMaxZIndex = function (maxZIndex) {
        var thisZIndex = 0;

        $('.dialog, .dialog-msg').each(function () {
            thisZIndex = $(this).css('z-index');

            thisZIndex > maxZIndex && (maxZIndex = thisZIndex);
        });

        return maxZIndex;
    };

    // 确认弹框
    Dialog.confirm = function (options, btn, yes, cancel) {
        var param = {};

        param.type    = 'confirm';
        param.showBg  = true;

        if(typeof options == 'object') {
            param.title   = options.title;
            param.content = options.content || '';
            param.btn     = options.btn     || ['确定','取消'];
            param.showBg  = options.showBg  || true;
            param.yes     = options.yes;
            param.cancel  = options.cancel;
        }
        else {
            param.content = options;
            param.btn     = btn || ['确定','取消'];
            param.yes     = yes;
            param.cancel  = cancel;
        }

        return openDialog(param);
    };

    // 普通弹框
    Dialog.open = function (options) {
        var param = {};

        param.type    = 'open';
        param.title   = options.title;
        param.content = options.content || '';
        param.btn     = options.btn     || [];
        param.showBg  = options.showBg  || true;
        param.yes     = options.yes;
        param.cancel  = options.cancel;

        return openDialog(param);
    };

    // alert
    Dialog.alert = function (options,btn, yes) {
        var param = {};

        param.type = 'alert';
        param.showBg  = true;

        if(typeof options == 'object') {
            param.title   = options.title;
            param.content = options.content || '';
            param.btn     = options.btn     || ['确定'];
            param.yes     = options.yes;
            param.showBg  = options.showBg  || true;

        }
        else {
            param.content = options;
            param.btn     = btn     || ['确定'];
            param.yes     = options.yes;
        }

        return openDialog(param);
    };

    Dialog.msg = function (options, seconds) {
        var param = {};

        param.type   = 'msg';

        if(typeof options == 'object') {
            param.content = options.content;
            param.seconds = options.seconds;
        }
        else {
            param.content = options;
            param.seconds = seconds;
        }

        return openDialog(param);
    };

    var moveDialogElem     = null,
        moveTitleElem      = null,
        movePointsStartPos = null,
        moveElemStartPos   = null;

    var documentMouseMove = function (event) {
        var e     = event || window.event,
            pos   = {'x': e.clientX, 'y': e.clientY},
            diffX = movePointsStartPos.x - pos.x,
            diffY = movePointsStartPos.y - pos.y;

        moveTitleElem.css('cursor','move');

        moveDialogElem.css({
            'top' : (moveElemStartPos.top - diffY) + 'px',
            'left': (moveElemStartPos.left - diffX) + 'px'
        })
    };

    win.Dialog = Dialog;

})(jQuery,window);
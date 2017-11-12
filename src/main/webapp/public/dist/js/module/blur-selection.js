/**
 * Created by huangjiajia on 2016/11/18.
 * Description: 模糊查询
 * Function: 1. 单选模糊查询 2. 多选模糊查询
 */
;(function($) {

    var blurSelect = function (element, options) {
        var _this = this;

        _this.options = options;
        _this.$panel  = $(element);
        _this.selectArr = [];

        _this.init();
        _this.focusSelect();
        _this.select();
        _this.hideWrap();
    };

    blurSelect.DEFAULTS = {
        multiSelect   : false,
        isShowNum     : true,     // 用于是否在input框中显示以及选择的个数  未做
        maxSelectNum  : 0,
        maxNumCallback: function () {console.log('maxnum')},
        panelClass    : '.js-blur-panel',
        inputClass    : '.js-blur-input',
        wrapClass     : '.js-blur-wrap',
        resultID      : 'id',
        resultText    : 'text',
        ajax          : {
            type      : 'GET',
            url       : '',
            dataType  : 'json',
            data      : ''
        },
        enterKeyFun : function ($input) {
        }
    };

    /**
     * Description: 页面一开始加载时的样式处理以及selectArr更新
     */
    blurSelect.prototype.init = function () {
        var _this  = this,
            $panel = _this.$panel,
            $input = $panel.find(_this.options.inputClass),
            len    = 0;

        // 获取选中列表id .js-select-list
        if($panel.find('.js-select-list').length > 0) {
            $panel.find('.js-select-list').find('.js-selected-item').each(function () {
                var $this = $(this),
                    id    = $this.attr('data-id').toString();

                ($.inArray(id, _this.selectArr) == -1) && (_this.selectArr.push(id));
            });

            $input.css('width', '80px');

            // 初始化selected-list的样式
            len = _this.selectArr.length;
            if(len > 2) {
                for(var i = 0; i < len - 2; i ++) {
                    $panel.find('.js-select-list').find('.js-selected-item').eq(i).hide().addClass('none');

                    // updateSelectedItemPos($dom, $parent)
                    //updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));

                }
            }
        }
    };

    /**
     * Description: 输入框获得焦点
     * Functions  : 1. panel add active class; 2. send ajax
     */
    blurSelect.prototype.focusSelect = function () {
        var _this  = this,
            $panel = _this.$panel,
            $input = $panel.find(_this.options.inputClass);

        /*
         * 输入框获得焦点
         * 1. panel add active class
         * 2. 模糊查询
         */
        $panel.on('focus', _this.options.inputClass, function () {
            $('body ' + _this.options.panelClass).removeClass('active');

            _this.$panel.addClass('active');
            _this.options.multiSelect && ($input.val('').css({
                'text-align': 'left',
                'width': 'auto'
            }));
            _this.createResultHtml();
            _this.sendAjax();
        })
    };

    /**
     * 隐藏wrap
     */
    blurSelect.prototype.hideWrap = function () {
        var _this     = this,
            $input    = _this.$panel.find(_this.options.inputClass),
            selectArr = _this.selectArr;

        $('body').on('click', function (e) {

            if($(e.target).closest(_this.options.panelClass).length == 0) {
                _this.$panel.removeClass('active');

                // 更新input状态
                if(_this.options.multiSelect && selectArr.length > 0) {
                    $input.val('...共' + selectArr.length + '个').css({
                        'text-align': 'right',
                        'width': '80px'
                    });
                }
            }
        })
    };

    /**
     * 查询入口方法
     */
    blurSelect.prototype.select = function () {

        // 创建HTML 和 发送ajax
        this.selectCommon();

        /*
         * 1. 判断是否为多选模糊查询  option -> multiSelect 默认为单模糊查询
         */
        if(this.options.multiSelect) { // 多选模糊查询
            this.multiSelect();
        }
        else {  // 单选模糊查询
            this.singleSelect();
        }
    };

    /**
     * 多选查询和单选查询 公共方法 -- 创建HTML和ajax发送
     */
    blurSelect.prototype.selectCommon = function () {
        var _this  = this,
            $panel = _this.$panel;

        /*
         * 1. 创建查询结果面板
         * 2. 监听input keyup事件
         * 3. 遍历结果
         */
        _this.createResultHtml();

        // 模糊查询
        $panel.on('keyup', _this.options.inputClass, function (e) {
            var e          = e || event,
                currentKey = e.keyCode || e.which || e.charCode;  //支持IE,FireFox;

            if(currentKey == 13){
                _this.options.enterKeyFun($(this));
                $panel.removeClass('active');
            }
            else {
                _this.sendAjax();
            }
        });

        // 禁止输入框回车自动刷新页面
        $panel.on('keydown', _this.options.inputClass, function (e) {
            var e          = e || event,
                currentKey = e.keyCode || e.which || e.charCode;  //支持IE,FireFox;

            if(currentKey == 13){
                return false;
            }
        });
    };

    /**
     * 渲染搜索结果下拉单
     */
    blurSelect.prototype.sendAjax = function () {
        var _this      = this,
            $panel     = _this.$panel,
            $input     = $panel.find(_this.options.inputClass),
            value      = $input.val(),
            $wrap      = $panel.find(_this.options.wrapClass),
            ajaxType   = _this.options.ajax,
            html       = '',
            result     = '',
            selectArr  = _this.selectArr,
            resultID   = _this.options.resultID,
            resultText = _this.options.resultText;

        $.ajax({
            type: ajaxType.type,
            dataType: ajaxType.dataType,
            url: ajaxType.url,
            data: {keyword: value},
            success: function (data) {
                result = data.data;

                // 添加数据 data.data
                for(var i = 0,len = result.length; i < len; i ++) {
                    if($.inArray(result[i][resultID].toString(), selectArr) == -1) {
                        html += '<li class="list-item js-list-item" data-id="' + result[i][resultID]  + '">';
                    }
                    else {
                        html += '<li class="list-item js-list-item active" data-id="' + result[i][resultID]  + '">';
                    }
                    html += '<div class="item-content">';
                    html += '<span class="text">' + result[i][resultText] + '</span>';
                    html += '<span class="glyphicon glyphicon-remove"></span>';
                    html += '</div>';
                    html += '</li>';
                }

                $wrap.find('.list-block').html(html);
            }
        })
    };

    /**
     * 多选模糊查询
     */
    blurSelect.prototype.multiSelect = function () {
        var _this  = this,
            $panel = _this.$panel;

        /*
         * 选择列表数据
         * 1. 判断是否被选中 如果没有被选中 -> 更新当前状态，并且数据更新到查询面板上
         */
        $panel.on('click', '.js-list-item', function () {
            var $this        = $(this),
                id           = $this.attr('data-id'),
                html         = '',
                selectArr    = _this.selectArr,
                maxSelectNum = _this.options.maxSelectNum;

            if($this.hasClass('active')) { // 如果已经被选中
                $this.removeClass('active');
                $panel.find('.js-select-list .js-selected-item[data-id="' + id + '"]').remove();

                selectArr.splice($.inArray(id, selectArr),1);
            }
            else { // 如果没有被选中

                // 如果配置了只能选择最多个数
                if(_this.options.multiSelect && (maxSelectNum > 0) && selectArr.length == maxSelectNum) {
                    _this.options.maxNumCallback();
                    return false;
                }

                if($panel.find('.js-select-list').length == 0) {
                    html += '<div class="selected-list js-select-list">';
                    html += '</div>';

                    $panel.find(_this.options.inputClass).before(html);
                }

                html = '';
                html += '<span class="selected-item js-selected-item" data-id="' + id + '">' + $this.text();
                html += '<span class="glyphicon glyphicon-remove js-selected-remove"></span></span>';
                $panel.find('.js-select-list').append(html);

                // 更新当前状态
                $this.addClass('active');

                selectArr.push(id);

                // 循环遍历 .js-select-list 显示最后两个
                for(var i = 0, len = selectArr.length; i < len - 2; i ++) {
                    $panel.find('.js-select-list .js-selected-item').eq(i).hide().addClass('none');
                }

                // updateSelectedItemPos($dom, $parent)
                updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));

            }
        });

        // 面板选中移除按钮 删除当前选中信息
        $panel.on('click', '.js-selected-remove', function (e) {
            e.stopImmediatePropagation();  // 阻止其他绑定在该元素上的事件运行，如果不加，会跟hideWrap()方法冲突

            var $selectedItem = $(this).closest('.js-selected-item'),
                id            = $selectedItem.attr('data-id'),
                selectArr     = _this.selectArr;

            // 显示前一个
            $panel.find('.js-select-list .js-selected-item.none').last().show()
                .removeClass('none');

            // 把删除当前的这个的前一个margin-left置为0
            $selectedItem.prev().css('margin-left',0);

            selectArr.splice($.inArray(id, selectArr),1);
            $('.js-blur-wrap .js-list-item[data-id="' + id + '"]').removeClass('active');
            $selectedItem.remove();

            // updateSelectedItemPos($dom, $parent)
            updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));

            // $panel.find(_this.options.inputClass).focus(); 删除输入框自动获得焦点  暂时没有用
        });
    };

    /**
     * Description: 更新select-list显示列表 只显示两个
     * @param $dom：最后一个selected-item的对象
     * @param $parent：js-selected-list对象
     */
    function updateSelectedItemPos($dom, $parent) {
        var left        = $dom[0].offsetLeft,
            width       = $dom.outerWidth(),
            parentWidth = $parent.outerWidth();

        if(left + width > parentWidth)
            $dom.prev() && $dom.prev().css('margin-left', (parentWidth - left - width));
    }

    /**
     * 单选模糊查询
     */
    blurSelect.prototype.singleSelect = function () {
        var _this  = this,
            $panel = _this.$panel;

        /*
         * 选择信息 .js-list-item
         * 1. 隐藏wrap面板
         * 2. 更新select-list
         */
        $panel.on('click', '.js-list-item', function () {
            var $this  = $(this),
                $wrap  = $this.closest(_this.options.wrapClass),
                $input = $panel.find(_this.options.inputClass);

            $input.val($this.text()).attr('data-id', $this.attr('data-id'));
            $panel.removeClass('active');
        })
    };

    blurSelect.prototype.createResultHtml = function () {
        var html   = '',
            $panel = this.$panel;

        $panel.find(this.options.wrapClass).remove();

        html += '<div class="blur-wrap ' + this.options.wrapClass.substring(1) + '">';
        html += '<ul class="list-block">';
        html += '</ul>';
        html += '</div>';

        $panel.append(html);
    };

    // 扩展到jQuery上
    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('bs.blurSelect'),
                options = null;

            option.ajax = $.extend({}, blurSelect.DEFAULTS.ajax, option.ajax);
            options     = $.extend({}, blurSelect.DEFAULTS, option);
            options     = $.extend({}, blurSelect.DEFAULTS, $this.data(), typeof option == 'object' && option);

            !data && ($this.data('bs.blurSelect', new blurSelect(this, options)));
        })
    }
    var old = $.fn.blurSelect;

    $.fn.blurSelect             = Plugin;
    $.fn.blurSelect.Constructor = blurSelect;

    $.fn.blurSelect.noConflict = function () {
        $.fn.blurSelect = old;
        return this;
    };

    // 事件处理程序 暂时没有用
    var clickHandler = function (e) {
        var $this = $(this);

    };


})(jQuery);
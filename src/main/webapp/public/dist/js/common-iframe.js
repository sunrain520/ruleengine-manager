/**
 * Created by huangjiajia on 2016/10/12.
 * Description: 子页面的公共函数
 */
// 新开Tab
$('.js-nav-item').on('click', function () {
    var $this  = $(this),
        href   = $this.data('target'),
        index  = $this.data('index'),
        text   = $this.data('text'); // 优先通过data-text来设置tab的名称

        if(!text){
            text   = $this.text();
        }

    parent.newTab($this, href, text);

    //$this.addClass('active').siblings('.js-nav-item').removeClass('active');
});

// 搜索列表展开与收起 .js-search-folder .js-icon .js-form .js-search-box
$('.js-search-folder').on('click', function (e) {
    e.preventDefault();

    var $this      = $(this),
        $icon      = $this.find('.js-icon'),
        $searchBox = $this.closest('.js-search-box'),
        $form      = $searchBox.find('.js-form'),
        $formList  = $searchBox.find('.form-group'),
        $width     = $searchBox.width(),
        $box       = null;

    $formList.each(function(e){
        $box += parseFloat($(this).width());
        if($(this).css("display")=="none"){
             $(this).slideDown();
             $icon.addClass('icon-up');
        }
        else{
             if($width*2-500<=$box){
                $(this).slideUp();
                $icon.removeClass('icon-up');
            }
        }
        // function formListBox(){
            
        //     if($width*2-500<=$box){
                
               
        //     }
        //     else{
               
        //     }
        // }
    })

        // console.log($width,$box,$formList.length)
    // if(!$icon.hasClass('icon-up')) {
    //     $form.slideDown();

    //     $icon.addClass('icon-up');
    //     $this.find('.js-text-info').text('');
    // }
    // else {
    //     $form.slideUp(50);
    //     $icon.removeClass('icon-up');
    //     $this.find('.js-text-info').text('展开搜索');
    // }
});


// 复选框选中
$('body').on('click', '.js-checkbox', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var $this = $(this),
        $checkbox = $this.find('input[type="checkbox"]');

    if($this.prop('checked') || $checkbox.attr('checked')) {
        $this.prop('checked', false);
        $checkbox.prop('checked', false).removeAttr('checked');
    }
    else {
        $this.prop('checked', true);
        $checkbox.prop('checked', true).attr('checked','checked');
    }
});

// 关闭当前tab .js-close-current-tab
$('.js-close-current-tab').on('click', parent.closeActiveTab);

/**
 * Description: 判断复选框是否被选中
 * @param $this：当前复选框对象
 * @param checkedCallback：选中时的回调
 * @param uncheckedCallback：未选中的回调
 */
function checkCheckbox($this, checkedCallback, uncheckedCallback) {
    var $checkbox = $this.find('input[type="checkbox"]');

    if($checkbox.attr('checked') == 'checked') {
        $checkbox.prop('checked',false).removeAttr('checked');

        uncheckedCallback && uncheckedCallback();
    }
    else {
        $checkbox.prop('checked',true).attr('checked','checked');

        checkedCallback && checkedCallback();
    }
}


//头部下拉颜色变白固定效果
;(function () {
    $(window).on('scroll', function () {
        var t = $(window).scrollTop();

        if (t > 0) {
            $('.js-container-header').css({'background-color': '#fff', 'border-bottom-color': '#f8ac59'});
        } else {
            $('.js-container-header').css({'background-color': 'transparent', 'border-bottom-color': 'transparent'});
        }
    })
})();



/*
 * 模糊查询
 */
;(function($) {

    var blurSelect = function (element, options) {
        var _this = this;

        _this.options = options;
        _this.$panel  = $(element);
        _this.selectArr = [];
        _this.selectTextArr = [];

        _this.init();
        _this.focusSelect();
        _this.select();
        _this.hideWrap();
    };

    blurSelect.DEFAULTS = {
        multiSelect   : false,    // true 多选模糊查询      false 单选模糊查询
        isShowNum     : true,     // 用于是否在input框中显示以及选择的个数
        isLinkage     : true,     // 是否是联动 （地址）动态改变的url需要更新到当前模糊查询的.js-blur-input data-url
        isNull        : true,     // 单选选模糊查询时，如果没有选择数据，是否返回上一步操作
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
        enterKeyFun   : function ($input) {
        },
        initFun   : function ($input) {
        },
        selectedItemFun: function () {},
        itemDeletedFun : function () {},
        keyUpFun       : function () {}
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
                    id    = $this.attr('data-id').toString(),
                    name  = $this.text();

                ($.inArray(id, _this.selectArr) == -1) && (_this.selectArr.push(id));
                ($.inArray(name, _this.selectTextArr) == -1) && (_this.selectTextArr.push(name));
            });

            $input.css('width', '80px');

            // 初始化selected-list的样式
            len = _this.selectArr.length;
            if(len > 2) {
                for(var i = 0; i < len - 2; i ++) {
                    $panel.find('.js-select-list').find('.js-selected-item').eq(i).hide().addClass('none');
                }
                // updateSelectedItemPos($dom, $parent)
                updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));
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
            _this.sendAjax($(this).attr("data-url"));
        });

        /*
         * 输入框失去焦点
         * 1. 如果是单查询 -> 失去焦点，值保持跟上一次值一致
         */
        $panel.on('blur', _this.options.inputClass, function () {
            var $this = $(this);

            !_this.options.multiSelect && _this.options.isNull && ($this.val($this.attr("data-name")));
        });

        /*
         * 输入框后面的向下按钮点击事件 - 显示模糊查询结果
         */
        $panel.on('click', '.icon-menu-block-down', function() {
            var $this  = $(this),
                $input = $this.prev();

            $input.focus();
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
                    }).attr('title',_this.selectTextArr.join());

                    if(!_this.options.isShowNum) {
                        $input.val('').attr('placeholder','').css('width','40px');
                    }
                }
            }
        }).on('focus', 'input', function (e) {
            var $this  = $(this),
                $panel = $this.closest(_this.options.panelClass);

            if($panel.length == 0) {
                $('body').find(_this.options.panelClass).removeClass('active');
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
                _this.sendAjax($(this).attr("data-url"));
                _this.options.keyUpFun($(this));
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
    blurSelect.prototype.sendAjax = function (ajaxUrl) {
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

        _this.options.isLinkage && ( ajaxUrl ? ajaxType.url = ajaxUrl: ajaxType.url );

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
                        html += '<li class="list-item js-list-item" data-id="' + result[i][resultID]  + '" data-name="' + result[i][resultText] + '">';
                    }
                    else {
                        html += '<li class="list-item js-list-item active" data-id="' + result[i][resultID]  + '" data-name="' + result[i][resultText] + '">';
                    }
                    html += '<div class="item-content">';
                    html += '<span class="text">' + result[i][resultText] + '</span>';
                    html += '<span class="glyphicon glyphicon-remove"></span>';
                    html += '</div>';
                    html += '</li>';
                }

                $wrap.find('.list-block').html(html);
                
                _this.options.initFun($input);

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
                id           = $this.attr("data-id"),
                name         = $this.attr("data-name"),
                html         = '',
                selectArr    = _this.selectArr,
                selectTextArr = _this.selectTextArr,
                maxSelectNum = _this.options.maxSelectNum;

            if($this.hasClass('active')) { // 如果已经被选中
                $this.removeClass('active');
                $panel.find('.js-select-list .js-selected-item[data-id="' + id + '"]').remove();

                selectArr.splice($.inArray(id, selectArr),1);
                selectTextArr.splice($.inArray(name, selectTextArr),1);
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
                html += '<span class="selected-item js-selected-item" data-id="' + id + '" data-name="' + name + '">' + $this.text();
                html += '<span class="glyphicon glyphicon-remove js-selected-remove"></span></span>';
                $panel.find('.js-select-list').append(html);

                // 更新当前状态
                $this.addClass('active');

                selectArr.push(id);
                selectTextArr.push(name);

                // 循环遍历 .js-select-list 显示最后两个
                for(var i = 0, len = selectArr.length; i < len - 2; i ++) {
                    $panel.find('.js-select-list .js-selected-item').eq(i).hide().addClass('none');
                }

                // updateSelectedItemPos($dom, $parent)
                updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));

                // 选择选项之后的回调，第一个参数：当前选择的item，第二个参数：已经选择的所有item
                _this.options.selectedItemFun($this,$panel.find('.js-list-item.active'));
            }
        });

        // 面板选中移除按钮 删除当前选中信息
        $panel.on('click', '.js-selected-remove', function (e) {
            e.stopImmediatePropagation();  // 阻止其他绑定在该元素上的事件运行，如果不加，会跟hideWrap()方法冲突

            var $selectedItem = $(this).closest('.js-selected-item'),
                id            = $selectedItem.attr('data-id'),
                name          = $selectedItem.attr('data-name'),
                selectArr     = _this.selectArr,
                selectTextArr = _this.selectTextArr,
                $input        = $panel.find(_this.options.inputClass);

            // 显示前一个
            $panel.find('.js-select-list .js-selected-item.none').last().show()
                .removeClass('none');

            // 把删除当前的这个的前一个margin-left置为0
            $selectedItem.prev().css('margin-left',0);

            selectArr.splice($.inArray(id, selectArr),1);
            selectTextArr.splice($.inArray(name, selectTextArr),1);

            $('.js-blur-wrap .js-list-item[data-id="' + id + '"]').removeClass('active');
            $selectedItem.remove();
            // 删除选项之后的回调，第一个参数：当前删除的item，第二个参数：删除操作后已经选择的所有item
            _this.options.itemDeletedFun($selectedItem,$panel.find('.js-list-item.active'));

            // updateSelectedItemPos($dom, $parent)
            updateSelectedItemPos($panel.find('.js-select-list .js-selected-item').last(), $panel.find('.js-select-list'));

            selectArr.length > 0 ? $input.val('...共' + selectArr.length + '个') : $input.val('');
            (selectArr.length > 0) && $input.attr('title',selectTextArr.join());
            // $panel.find(_this.options.inputClass).focus(); 删除输入框自动获得焦点  暂时没有用
        });
    };

    /**
     * Description: 更新select-list显示列表 只显示两个
     * @param $dom：最后一个selected-item的对象
     * @param $parent：js-selected-list对象
     */
    function updateSelectedItemPos($dom, $parent) {
        var left        = $dom[0] && $dom[0].offsetLeft,
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

            $input.val($this.text()).attr('data-id', $this.attr('data-id')).attr('data-name', $this.attr('data-name'));
            $panel.removeClass('active');

            _this.options.selectedItemFun($this);
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

/*
* 表格操作
*/
;(function ($) {
    // 全选 .js-table .js-select-all .js-checkbox
    function Table(element, options) {
        var _this         = this;

        _this.options = options;


        // 复选框选中和全选
        _this.tableClass     = options.tableClass;

        _this.selectAllClass = options.select.selectAllClass;
        _this.checkboxClass  = options.select.checkboxClass;

        _this.$selectAll = $(_this.selectAllClass);

        //_this.$tableHeader = _this.options.tableHeaderClass ? $(_this.options.tableHeaderClass) : _this.$selectAll.closest('table');
		_this.$tableHeader = _this.options.tableHeaderClass ? $(element).parent().prev().find(_this.options.tableHeaderClass) : _this.$selectAll.closest('table');

        // 表格头部固定 两个表格 头部 js-table-header
        if( _this.$tableHeader.length > 0) {
            //_this.$table = _this.$tableHeader.closest('.js-table-header-wrap').next().find('.js-table');
			_this.$table = $(element);
        }
        else {
            _this.$tableHeader = _this.$table = $(_this.tableClass);
        }

        _this.$selectAll = _this.$tableHeader.find(_this.selectAllClass);
        _this.$checkbox  = _this.$table.find(_this.checkboxClass);

        _this.checkbox();

        // 排序
        _this.sortItemClass = options.sort.sortItemClass;
        _this.sortUpClass   = options.sort.sortUpClass;
        _this.sortDownClass = options.sort.sortDownClass;
        _this.sortUpFun     = options.sort.sortUpFun;
        _this.sortDownFun   = options.sort.sortDownFun;

        _this.$sortItem   = $(_this.sortItemClass);
        _this.$sortUp     = $(_this.sortUpClass);
        _this.$sortDown   = $(_this.sortDownClass);

        _this.$table.length == 0 && (_this.$table = _this.$sortItem.closest('table'));

        _this.sort();

        _this.setFixedHeaderPages();
    }

    /*
     *   th: .js-sort-item
     *   up: .js-sort-up
     * down: .js-sort-down
     */
    Table.DEFAULTS = {
        tableHeaderClass  : '.js-table-header',
        tableClass        : '.js-table',
        select: {
            selectAllClass: '.js-select-all',
            checkboxClass : '.js-checkbox'
        },
        sort: {
            sortItemClass : '.js-sort-item',
            sortUpClass   : '.js-sort-up',
            sortDownClass : '.js-sort-down',
            sortUpFun     : function () {},
            sortDownFun   : function () {}
        }
    };

    Table.prototype.checkbox = function () {
        var _this        = this,
            $table       = this.$table,
            $tableHeader = this.$tableHeader,
            $selectAll   = this.$selectAll,
            $checkbox    = this.$checkbox,
            $pagination;

        /**
         * 分页存在不全选
         */
        function notPageSelectAll() {
            checkPagesSelectAll($table.closest('.js-table-body-wrap').next(), _this.selectAllClass, function ($pages, selectAllClass) {
                var $pageSelectAll = $pages.find(selectAllClass);

                $pageSelectAll.prop('checked', false);
                $pageSelectAll.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
            });
        }

        function isPagesSelectAll() {
            checkPagesSelectAll($table.closest('.js-table-body-wrap').next(), _this.selectAllClass, function ($pages, selectAllClass) {
                var $pageSelectAll = $pages.find(selectAllClass);

                $pageSelectAll.prop('checked', true);
                $pageSelectAll.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');
            });
        }

        // 复选框选中
        $table.on('click', this.checkboxClass, function (e) {
            e.stopPropagation();
            e.preventDefault();

             var $this = $(this);

             // selectCheckBox($selectAllDom, $checkBoxDom, $checkBoxDomAll, allCallback, notAllCallback)
             selectCheckBox($selectAll, $this, $checkbox, isPagesSelectAll,notPageSelectAll);

         });

        //  全选
        $tableHeader.on('click', this.selectAllClass, function (e) {
            e.stopPropagation();
            e.preventDefault();

             var $this = $(this);

             // selectCheckBoxAll($selectAllDom, $checkBoxDomAll, selectCallback, cancelCallback)
             selectCheckBoxAll($this, $checkbox, isPagesSelectAll, notPageSelectAll);
         });

        /*
         * 分页下面部分的全选
         * 1. 判断分页是否存在 -> 判断全选是否存在 .js-select-all
         * 2. 全选事件监听 -> 与表头的相关联
         * selectCheckBoxAll($selectAllDom, $checkBoxDomAll, selectCallback, cancelCallback)
         */
        checkPagesSelectAll($table.closest('.js-table-body-wrap').next(), _this.selectAllClass, function ($pages, selectAllClass) {
            $pages.on('click', selectAllClass, function () {
                var $this = $(this);

                // selectCheckBoxAll($selectAllDom, $checkBoxDomAll, selectCallback, cancelCallback)
                selectCheckBoxAll($this, $checkbox, function () { // 全选时的回调

                    $selectAll.prop('checked', true);
                    $selectAll.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');
                }, function () { // 非全选时的回调

                    $selectAll.prop('checked', false);
                    $selectAll.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
                })
            })
        });

        // 点击一行选中复选框 table-body
        $table.on('click', 'tr', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $this            = $(this),
                $checkboxCurrent = $this.find('.js-checkbox');

            // selectCheckBox($selectAllDom, $checkBoxDom, $checkBoxDomAll)
            selectCheckBox($selectAll, $checkboxCurrent, $checkbox,isPagesSelectAll, notPageSelectAll);
        });

        // 点击一行选中复选框 table-header
        $tableHeader.on('click', 'tr', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $this            = $(this),
                $checkboxCurrent = $this.find(_this.selectAllClass);

            // selectCheckBoxAll($selectAllDom, $checkBoxDomAll)
            selectCheckBoxAll($checkboxCurrent, $checkbox, isPagesSelectAll, notPageSelectAll);
        });

    };

    /**
     * Description: 判断表格下面分页和全选是否存在
     * @param $pages：分页对象
     * @param selectAllClass：全选class
     * @param callback：回调
     */
    function checkPagesSelectAll($pages, selectAllClass, callback) {

        if($pages.hasClass('js-pagination-panel')) {

            if($pages.find(selectAllClass).length > 0) {

                callback && callback($pages, selectAllClass);
            }
        }
    }

    /**
     * Description: 选择复选框
     * @param $selectAllDom: 全选DOM
     * @param $checkBoxDom: 当前点击的复选框DOM
     * @param $checkBoxDomAll: 复选框所有DOM
     * @param allCallback: 全选时的回调
     * @param notAllCallback: 不是全选时的回调
     */
    function selectCheckBox($selectAllDom, $checkBoxDom, $checkBoxDomAll, allCallback, notAllCallback) {
        var $this       = $checkBoxDom,
            isSelectAll = true;

        if($this.prop('checked')) {
            $this.prop('checked', false);
            $this.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
        }
        else {
            $this.prop('checked', true);
            $this.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');
        }

        // 判断是否被全选中
        $checkBoxDomAll.each(function () {
            !$(this).prop('checked') && (isSelectAll = false);
        });

        if (isSelectAll) {
            $selectAllDom.prop('checked', true);
            $selectAllDom.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');

            allCallback && allCallback();
        }
        else {
            $selectAllDom.prop('checked', false);
            $selectAllDom.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');

            notAllCallback && notAllCallback();
        }
    }

    /**
     * Description: 表格全选
     * @param $selectAllDom: 全选DOM
     * @param $checkBoxDomAll: 复选框所有DOM
     * @param selectCallback: 全选时的回调
     * @param cancelCallback: 不是全选时的回调
     */
    function selectCheckBoxAll($selectAllDom, $checkBoxDomAll, selectCallback, cancelCallback) {
        var $this = $selectAllDom;

        if($this.prop('checked')) {
            $this.prop('checked', false);
            $this.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
            $checkBoxDomAll.prop('checked', false);
            $checkBoxDomAll.find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');

            cancelCallback && cancelCallback();
        }
        else {
            $this.prop('checked', true);
            $this.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');
            $checkBoxDomAll.prop('checked', true);
            $checkBoxDomAll.find('input[type="checkbox"]').prop('checked', true).attr('checked','checked');

            selectCallback && selectCallback();
        }
    }

    //
    Table.prototype.sort = function () {
        var _this        = this,
            $table       = _this.$table,
            $tableHeader = _this.$tableHeader,
            $sortItem    = _this.$sortItem;

        /*
         *   th: sortItemClass
         *   up: sortUp
         * down: sortDown
         */
        $tableHeader.on('click', _this.sortItemClass, function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $this    = $(this),
                sortType = _this.getSortType($this);

            /*
             * 1. 判断当前状态 如果sortUp 则降序，如果为sortDown 则升序
             * 2. 改变当前$sortItem的class
             */
            switch (sortType) {
                case 'sortUp':

                    /*
                     * 1. 改变排序图标 -> sortDown
                     * 2. 改变sortItem Class
                     */
                    $this.find(_this.sortUpClass).hide();
                    $this.find(_this.sortDownClass).addClass('active').show();
                    $this.removeClass(_this.sortUpClass.substring(1)).addClass(_this.sortDownClass.substring(1));
                    _this.sortDownFun($this);
                    break;
                case 'sortDown':

                    /*
                     * 1. 改变排序图标 -> sortUpown
                     * 2. 改变sortItem Class
                     */
                    $this.find(_this.sortDownClass).hide();
                    $this.find(_this.sortUpClass).addClass('active').show();
                    $this.removeClass(_this.sortDownClass.substring(1)).addClass(_this.sortUpClass.substring(1));
                    _this.sortUpFun($this);
                    break;
            }

            // 重置其他排序样式
            $this.siblings(_this.sortItemClass).removeClass(_this.sortDownClass.substring(1))
                     .removeClass(_this.sortUpClass.substring(1));
            $this.siblings(_this.sortItemClass).find(_this.sortUpClass).removeClass('active').show();
            $this.siblings(_this.sortItemClass).find(_this.sortDownClass).removeClass('active').show();
        });
    };

    /**
     * Description: 判断当前状态
     * @param $dom
     * @returns {string}
     */
    Table.prototype.getSortType = function ($dom) {
        var _this    = this,
            sortType = 'sortUp';

        if($dom.hasClass(_this.sortDownClass.substring(1))) {
            sortType = 'sortDown';
        }
        else {
            sortType = 'sortUp';
        }

        return sortType;
    };


    /**
     * Description: 固定表格头部和分页
     */
    Table.prototype.setFixedHeaderPages = function () {
        var _this        = this,
            $tableHeader = _this.$tableHeader.closest('.js-table-header-wrap'),
            $tbody       = $tableHeader.next(),
            top          = $tableHeader[0] && $tableHeader.offset().top,
            left         = $tableHeader[0] && $tableHeader.offset().left,
            width        = $tableHeader[0] && $tableHeader.next()[0].offsetWidth,
            height       = $tableHeader[0] && $tableHeader[0].offsetHeight,
            $pagination  = _this.$table.closest('.js-table-body-wrap').nextAll('.js-pagination-panel'),
            pagesLeft    = $pagination[0] && $pagination.offset().left,
            //pagesWidth   = $pagination[0] && $pagination[0].offsetWidth,
            pagesWidth   = $tbody[0].offsetWidth,                           // 因为下面的水平滚动width跟表格的宽度一样，会显示不出分页
            pagesHeight  = $pagination[0] && $pagination[0].offsetHeight,
            tHeight      = $tbody[0] && $tbody[0].offsetHeight,
            tableWidth   = _this.$table.outerWidth(),                            // 下面是冻结列的实现变量
            $tableScrollH = $pagination.find('.js-table-scroll-horizontal'),
            absoluteLeft  = 0,
            absoluteTdLeft = 0;

        //console.log($tableHeader,'header', _this.$table,_this.$tableHeader);
        $(window).resize(function () {
            width = $tbody[0] && $tbody[0].offsetWidth;
            $tableHeader.css('width',width);
            pagesWidth = width;
            $pagination.css('width', pagesWidth);
            //$pagination.find('.page-wrap').css('width', $tableHeader.width());
        });

        //console.log($tableHeader, $tbody, $pagination,'ooooo');

        $(window).on('scroll', function(){
            var t         = $(window).scrollTop(),
                winHeight = $(window).height();

            // 如果需要固定头部和底部
            if(!$tableHeader.hasClass('js-ignore')) {
                if(t > top) {
                    $tableHeader.css({
                        position: 'fixed',
                        top: 0,
                        left: left,
                        width: width,
                        height: height,
                        'z-index': 2
                    });

                    $tableHeader.find('th').each(function () {
                        var $this = $(this),
                            thisLeft  = 0;

                        if($this.css('position') == 'absolute') {
                            thisLeft = $this.css('left').split('px')[0] * 1;

                            thisLeft += left;
                            $this.css({
                                'position': 'fixed',
                                'top'     : 0,
                                'left'    : thisLeft,
                                'z-index' : 3
                            })
                        }
                    })
                }
                else if(t <= top) {
                    $tableHeader.css({
                        position: 'static',
                        top: 0,
                        left: 0,
                        width: width,
                        height: height,
                        'z-index': 2
                    });

                    $tableHeader.find('th').each(function () {
                        var $this = $(this),
                            thisLeft  = 0;

                        if($this.css('position') == 'fixed') {
                            thisLeft = $this.css('left').split('px')[0] * 1;

                            thisLeft -= left;
                            $this.css({
                                'position': 'absolute',
                                'top'     : 0,
                                'left'    : thisLeft
                            })
                        }
                    })
                }

                if(t > top && t + winHeight <= tHeight + top) {
                    $pagination.css({
                        position: 'fixed',
                        bottom: 0,
                        left: pagesLeft - 20,
                        width: pagesWidth + 40,
                        height: pagesHeight,
                        'z-index': 2,
                        'padding-left': 20,
                        'padding-right': 20,
                        'background-color': '#f5f5f7'
                    });

                    $pagination.find('.js-options-panel').show();
                }
                else {
                    $pagination.css({
                        position: 'static',
                        bottom: 0,
                        left: 0,
                        width: pagesWidth,
                        height: pagesHeight,
                        'z-index': 2,
                        'padding-left': 0,
                        'padding-right': 0,
                        'background-color': '#fff'
                    });

                    // $pagination.find('.js-options-panel').hide();  // 分页左边的选择操作部分，没有浮动时为隐藏，后面改为显示
                }
            }

        });

        /**
         * Description: 表格水平滚动
         * 1. 获取表格的宽度,每一列的高度
         * 2. 获取前两列的宽度，对table-header-wrap、table-body-wrap设置padding-left值，对table-scroll-horizontal设置margin-left
         * 3. 监听table-scroll-horizontal滚动，获取scrollLeft
         * 4. 设置table-header-wrap、table-body-wrap的scrollLeft= table-scroll-horizontal 的 scrollLeft
         */
        if($tableScrollH.length > 0) {
            //console.log($tbody,tableWidth,'width')
            $tableScrollH.find('.js-scroll').css('width',tableWidth);

            // 循环th 计算偏移量
            $tableHeader.find('th').each(function () {
                var $this = $(this);

                if($this.css('position') == 'absolute') {
                    absoluteLeft += $this.outerWidth();

                    // 设置left
                    $this.css('left',absoluteTdLeft);

                    absoluteTdLeft += $this.outerWidth();

                }
            });

            // 循环计算每一列的高度  当高度不是固定的时候

            $tbody.find('tr').each(function () {
                var $this  = $(this),
                    height = $(this).height();

                absoluteTdLeft = 0;

                //console.log(height,'height')

                $this.find('td').each(function () {
                    var $item = $(this);

                    if($item.css('position') == 'absolute' || $item.css('position') == 'fixed') {
                        $item.css({
                            'height':height,
                            'left'  :absoluteTdLeft
                        });

                        absoluteTdLeft += $item.outerWidth();
                    }
                })


            });

            //console.log(absoluteLeft,'ab')
            $tableHeader.css('padding-left',absoluteLeft);
            $tbody.css('padding-left',absoluteLeft);
            $tableScrollH.css('margin-left',absoluteLeft);

            $tableScrollH.scroll(function () {
                var scrollLeft = $(this).scrollLeft();

                $tbody.scrollLeft(scrollLeft);
                $tableHeader.scrollLeft(scrollLeft);
            })
        }
    };


    // 扩展到jQuery上
    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('bs.table'),
                options = null;

            option.select = $.extend({}, Table.DEFAULTS.select, typeof option == 'object' && option.select);
            option.sort   = $.extend({}, Table.DEFAULTS.sort, typeof option == 'object' && option.sort);
            options       = $.extend({}, Table.DEFAULTS, $this.data(), typeof option == 'object' && option);

            !data && ($this.data('bs.table', new Table(this, options)));
        })
    }
    var old = $.fn.table;

    $.fn.table             = Plugin;
    $.fn.table.Constructor = Table;

    $.fn.table.noConflict = function () {
        $.fn.table = old;
        return this;
    };

    // 事件处理程序 暂时没有用
    var clickHandler = function (e) {
        var $this = $(this);

    };

    $(window).on('load', function () {
        $('.js-table').each(function () {
            var $table = $(this);

            Plugin.call($table, $table.data());
        })
    })

})(jQuery);


/**
 * Description: 表格悬浮复制功能
 *
 * @param string selector: 指定能被悬浮的节点选择器
 * @param string option: 配置项
 * @author YuanFei
 * @date 2016-12-14
 */
(function(window,$){

    var tableHoverLayer = function(selector,option){
        selector = selector || 'table td' ;

        var defaultOption = {layerPos:'bottom', //悬浮窗显示在鼠标hover元素的位置，有top,right,bottom,left,center 5种，默认bottom
                             html:false,        //悬浮窗内的镜像内容是否显示鼠标hover元素的html内容，默认false，只提取text
                             copyBtn:true       //是否显示复制按钮，默认true显示
                            },
            _this         = this;

            option = option || {};

        // 创建配置和传进来的配置信息合并
        this.option = extendDefaults(defaultOption, option);

        //option            = option || defaultOption;
        //this.option       = option;
        var toolBtnArr    = [],
            toolBar       = '';

        if (this.option.copyBtn)
        {
            toolBtnArr.push('<span title="复制" class="copy-btn tool-icon icon icon-copy"></span>');
        }

        if (toolBtnArr.length>0)
        {
            toolBar = '<div class="tool-bar">'+toolBtnArr.join('')+'</div>';
        }

        var template = '<div class="td-hover-layer"><div class="content-wrap"></div>'+toolBar+'</div>';

        $('body').on('mouseenter',selector,function(){

            $('.td-hover-layer').remove();

            var text = $(this).text(),
                html = '';
            if ( $.trim(text) == '' )
            {
                return;
            }

            if ( _this.option.html )
            {
                html = $(this).html();
            }
            
            $('body').append(template);


            var left        = $(this).offset().left,
                top         = $(this).offset().top,
                width       = $(this).outerWidth(),
                height      = $(this).outerHeight(),
                $hoverLayer = $('.td-hover-layer');

            if ( _this.option.html )
            {
                $('.td-hover-layer .content-wrap').html(html);
            }
            else
            {
                $('.td-hover-layer .content-wrap').text(text);
            }
            
    

            switch(_this.option.layerPos)
            {
                case 'bottom':
                    top = top+height-3;
                break;

                case 'left':
                    left = left-width+3;
                break;

                case 'top':
                    //top = top-($hoverLayer.outerHeight())+3;
                break;

                case 'right':
                    left = left+width-3;
                break;

                case 'center':
                    top = top;
                break;                 
            }


            $hoverLayer.css({left:left+'px',top:top+'px',width:width+'px','min-height':height+'px'});

            //top值需要用到hoverlayer的高度，但是高度需要设置了left和top之后才准确，原因未知
            if (_this.option.layerPos=='top')
            {
                $hoverLayer.css({top:top-($hoverLayer.outerHeight())+3+'px'});
            }
        });


        $('body').on('mouseleave','.td-hover-layer',function(){
             $(this).remove();
        });

        /*$(selector).on('mouseleave',function(){
             $('.td-hover-layer').remove();
        });*/


        $('body').on('click','.td-hover-layer .copy-btn',function(){
            var content = $(this).parent().prev().text();
            content = $.trim(content);
            $('body').append('<textarea style="height:0;width:0;" id="temp-content">'+content+'</textarea>');

            var tempTextarea = document.getElementById('temp-content');

            tempTextarea.select(); // 选择文本
            document.execCommand("Copy"); // 执行浏览器复制命令
            tempTextarea.parentNode.removeChild(tempTextarea);
            layer.msg('复制成功!');
             
        });

        //浮窗拖动
        var moveDialogElem    = null,
            movePointStartPos = null,
            moveElemStartPos  = null;

        
        $('body').on('mousedown','.td-hover-layer',function(event){
            var e    = event || window.event;
            if (this.setCapture) 
            {
                this.setCapture();
            }
            else if (window.captureEvents) 
            {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            var $this  = $(this),
                left   = $this.offset().left,
                top    = $this.offset().top;

            moveDialogElem       = $this;
            movePointStartPos    = {'x':e.clientX,'y':e.clientY};
            moveElemStartPos     = {'top':top,'left':left};            

            document.onmousemove = documentMouseMove;
        });

        //释放拖动事件
        $(document).on('mouseup',function(event){

            if (this.releaseCapture)
            {
                this.releaseCapture();
            }
            else if (window.releaseEvents)
            {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            document.onmousemove = null; 
            
        });

        var documentMouseMove = function(event)
        {
            var e     = event || window.event,
                pos   = {'x':e.clientX,'y':e.clientY},
                diffX = movePointStartPos.x - pos.x,
                diffY = movePointStartPos.y - pos.y;

                moveDialogElem.css({left:moveElemStartPos.left-diffX+'px',top:moveElemStartPos.top-diffY+'px',});
                
                
        }

        //可定制化配置
        function extendDefaults(source, properties)
        {
            var property;
            for (property in properties)
            {
                if (properties.hasOwnProperty(property))
                {
                    source[property] = properties[property];
                }
            }
            return source;
        }
    }

    window.tableHoverLayer = tableHoverLayer;

})(window,$);


/**
 * Description: 输入限制插件
 *
 * @param string option: 配置项
 * @author YuanFei
 * @date 2016-12-21
 */
(function(window,$){
    $.fn.extend({
        inputLimit:function(options)
        {
            //默认配置项
            var defaults = {
                type       : 'int',   //限制类型，可为int和float,eng
                floatBit   : 2,       //type为float时，小数点后位数
                negative   : true,    //允许负数
                defaultVal : '',      //默认值，默认为空
            };            

            var options = $.extend(defaults, options);

            var prevValue  = '',
                keydowning = false,
                testPreg   = /^\d+$/,//注意test方法的lastIndex性质问题需要去掉g标识符
                matchPreg  = /\d+/g;

            switch(options.type)
            {
                case 'int'://整数

                break;

                case 'eng'://英文字母
                    testPreg   = /^[a-z|A-Z]+$/;
                    matchPreg  = /[a-z|A-Z]+/g;
                break;

                case 'float':
                    //浮点型不好做实时的判断以及输入矫正只能在提交的时候进行单独判断表达式为：    /^\d+\.\d{2}$/g
                break;
            }
            
            this.val(options.defaultVal);

            var beforeUpVal = '';
            this.on('keydown',function(event){

                beforeUpVal = this.value;
            
            });

            
            this.on('keyup',function(event){

                if (testPreg.test(this.value))
                {
                    return;
                }

                //向左向右箭头
                if (event.keyCode == 37 || event.keyCode == 39 )
                {
                    return;
                }

                var currentVal = this.value;

                var matches = currentVal.match(matchPreg);
                if (matches)
                {
                    this.value = matches[0];
                }
                else
                {
                    this.value = '';
                }
            
            });

            this.on('blur',function(event){

                if (this.value == '' && options.defaultVal !== '')
                {
                    this.value = options.defaultVal;
                    return;
                }

            });

            return this;
        }
    });
}(window,$));



/**
 * Description: 公共树形选择器
 *
 * @param string option: 配置项
 * @author YuanFei
 * @date 2016-12-26
 */

(function(){
    var commonTreeSelect = function(option){
        this.html = ''; 

        option = option || {data:[],radioName:'common_tree_radio'};

        //wrapper:'.layui-layer-dialog',//下拉选框查找节点
        //data:dataJson.data,//数据
        //pathInputName:'position_path',//选中选项的职位路径显示输入框的name值，便于插件查找更新职位路径的显示
        //selectedItems:[347],//初始化选中职位项
        //nodeClickCallback:function(elem){},//部门点击事件回调
        //inputClickCallback:function(elem){},//勾选框点击事件回调
        //itemRadioBox:true,    //是否显示item单选框
        //nodeRadioBox:true,    //是否显示node单选框
        //radioClickCallback:function(){console.log(arguments)} //单选框点击事件回调

        this.option = option;

        this.initSelectedItems = option.selectedItems || [];
        this.initSelectedNodes = option.selectedNodes || [];
        this.wrapper = option.wrapper ? option.wrapper+' .common-tree-wrap'  : '.common-tree-wrap';

        var _this = this;            

        this.setData = function(data)
        {
            this.html = '';
            createHtml(data);
            $(this.wrapper).html(this.html);
        }

        this.setSelectedItem = function(id)
        {
            var $option = $(this.wrapper+' .common-tree-select-option[data-id="'+id+'"]');
            if ($option.length>0)
            {
                $(this.wrapper+' .common-tree-select-option').removeClass('selected');
                $option.addClass('selected');

                var pathText = '',
                    pathArr  = [];
                $option.parents('.common-tree-node').each(function(){
                    pathArr.push($(this).children('.common-tree-node-title').attr('data-name'));
                });

                pathArr.reverse();

                pathText = $option.attr('data-name');
                if (pathArr.length > 0)
                {
                    if ($option.attr('option-type')=='node' && pathArr.length<2)
                    {

                    }
                    else
                    {
                        pathText += '（'+pathArr.join(' > ')+'）';
                    }
                    
                }
                
                if (this.option.pathInputName)
                {
                    $('input[name="'+this.option.pathInputName+'"]').attr('data-id',id).attr('data-name',$option.attr('data-name')).val(pathText);
                }
            }
        }


        if (option.data.length>0)
        {
            createHtml(option.data,true);

            $('.common-tree-wrap').html('<div class="common-tree-title">选择</div><div class="common-tree-option-wrap">'+this.html+'</div>');
            if (this.initSelectedItems.length>0)
            {
                this.setSelectedItem(this.initSelectedItems[0]);
            }
        }


        $('body').off('click',this.wrapper).on('click',this.wrapper,function(event){
            stopPropagation(event);
        });


        $('body').off('click',this.wrapper+' .common-tree-node-title').on('click',this.wrapper+' .common-tree-node-title',function(event){
            stopPropagation(event)
            $(this).next().slideToggle();
            $(this).children('span.icon').toggleClass('icon-menu-block-right').toggleClass('icon-menu-block-down');
            //$(this).children('span.icon').toggleClass('icon-menu-block-right');
            //<span class="icon "></span>
            if (typeof option.nodeClickCallback == 'function')
            {
                option.nodeClickCallback(this)
            }
        });

        $('body').off('click',this.wrapper+' .common-tree-node-title input').on('click',this.wrapper+' .common-tree-node-title input',function(event){
            stopPropagation(event)
            if (typeof option.inputClickCallback == 'function')
            {
                option.inputClickCallback(this)
            }
        });

        $('body').off('click',this.wrapper+' input').on('click',this.wrapper+' input',function(event){
            stopPropagation(event)
            
            _this.setSelectedItem($(this).parent().attr('data-id'));

            $(this).parents(_this.wrapper+':first').hide();

            if (typeof option.radioClickCallback == 'function')
            {
                var id   = $(this).parent().attr('data-id'),
                    name = $(this).parent().attr('data-name');
                option.radioClickCallback(id,name,this)
            }
        });

        $('input[name="'+this.option.pathInputName+'"]').off('click').on('click',function(event){
            stopPropagation(event)
            $(this).parent().nextAll(_this.wrapper).show();
        });

        $(document).on('click',function(){
            $(_this.wrapper).hide();
        });


        function stopPropagation(e)
        {  
            e = e || window.event;  
            if(e.stopPropagation) 
            { 
                e.stopPropagation();  //W3C阻止冒泡方法  
            }
            else
            {  
                e.cancelBubble = true; //IE阻止冒泡方法  
            }  
        }  

        function inArray(val, arr)
        {
            for (var k = 0; k < arr.length; k++)
            {
                if (arr[k] == val) 
                {
                    return true;
                }
            }
         return false;
        }

        //var html = '';
        function createHtml(data,init)
        {
            for(var k = 0 ; k<data.length ; k++)
            {
                var arrowIcon = '';
                var positions = data[k].position_list;
                if (positions.length>0 || data[k].child.length>0)
                {
                    arrowIcon = '<span class="icon icon-menu-block-right icon-left js-icon-menu"></span>';
                }

                //html+='<div class="tree-node"><div data-id="'+data[k].id+'" data-name="'+data[k].name+'" class="tree-node-title">'+arrowIcon+data[k].name+'</div>';
                var nodeCheckBox = '';
                if (typeof _this.option.nodeCheckBox != 'undefined' && _this.option.nodeCheckBox == true)
                {
                    var nodeChecked = nodeSelected = '';
                    if (typeof init != 'undefined' && init == true && _this.initSelectedItems.length>0)
                    {
                        if (inArray(data[k].id,_this.initSelectedItems))
                        {
                            nodeChecked  = 'checked';
                            nodeSelected = 'selected';
                        }
                    }
                    nodeCheckBox = '<input '+nodeChecked+' type="checkbox">';
                }

                var nodeRadioBox = '',
                    radioName    = _this.option.radioName;
                if (typeof _this.option.nodeRadioBox != 'undefined' && _this.option.nodeRadioBox == true)
                {
                    nodeRadioBox = '<input name="'+radioName+'" '+nodeChecked+' type="radio">';
                }


                _this.html+='<div class="common-tree-node"><div option-type="node" data-id="'+data[k].id+'" data-name="'+data[k].name+'" class="common-tree-node-title common-tree-select-option">'+arrowIcon+data[k].name+nodeCheckBox+nodeRadioBox+'</div><div class="common-tree-children-wrap">';
                
                if (positions.length>0)
                {
                    for(var k1 = 0 ; k1<positions.length ; k1++)
                    {
                        //html+='<div class="tree-item">'+positions[k1].name+'</div>';
                        var itemChecked = itemSelected = '';
                        if (typeof init != 'undefined' && init == true && _this.initSelectedItems.length>0)
                        {
                            if (inArray(positions[k1].id,_this.initSelectedItems))
                            {
                                itemChecked  = 'checked';
                                itemSelected = 'selected';
                            }
                        }

                        var itemCheckBox = '';
                        if (typeof _this.option.itemCheckBox != 'undefined' && _this.option.itemCheckBox == true)
                        {
                            itemCheckBox = '<input '+itemChecked+' type="checkbox">';
                        }

                        var itemRadioBox = '',
                            radioName    = _this.option.radioName;
                        if (typeof _this.option.itemRadioBox != 'undefined' && _this.option.itemRadioBox == true)
                        {
                            itemRadioBox = '<input name="'+radioName+'" '+itemChecked+' type="radio">';
                        }

                        

                        _this.html+='<div option-type="item" data-id="'+positions[k1].id+'" data-name="'+positions[k1].name+'" class="common-tree-item common-tree-select-option '+itemSelected+'">'+positions[k1].name+itemCheckBox+itemRadioBox+'</div>';
                    }
                }

                if (data[k].child.length>0)
                {
                    createHtml(data[k].child);
                }

                //html+='</div>';
                _this.html+='</div></div>';

            }
        }
    }

    window.commonTreeSelect = commonTreeSelect;
})();

//-------公共树形选择器 END


//考虑将上面的公共树形选择器改成jq插件的形式
(function(window,$){
    return;//暂时退出
    $.fn.extend({
        commonTreeSelect:function(options)
        {
            //默认配置项
            var defaults = {
                data       : [],                  //限制类型，可为int和float,eng
                radioName  : 'common_tree_radio', //type为float时，小数点后位数
            };

            var html  = '';
            var $this = this;

            this.parent().css('position','relative');

            //wrapper:'.layui-layer-dialog',//下拉选框查找节点
            //data:dataJson.data,//数据
            //pathInputName:'position_path',//选中选项的职位路径显示输入框的name值，便于插件查找更新职位路径的显示
            //selectedItems:[347],//初始化选中职位项
            //nodeClickCallback:function(elem){},//部门点击事件回调
            //inputClickCallback:function(elem){},//勾选框点击事件回调
            //itemRadioBox:true,    //是否显示item单选框
            //nodeRadioBox:true,    //是否显示node单选框
            //radioClickCallback:function(){console.log(arguments)} //单选框点击事件回调


            options = $.extend(defaults, options);

            switch(options.type)
            {
                case 'int'://整数

                break;
            }


            if (options.data.length>0)
            {
                createHtml(options.data,true);

                html = '<div class="common-tree-title">选择</div><div class="common-tree-option-wrap">'+html+'</div>';

                this.after(html);

                if (this.initSelectedItems.length>0)
                {
                    setSelectedItem(this.initSelectedItems[0]);
                }
            }


            $('body').off('click',options.wrapper).on('click',this.wrapper,function(event){
                stopPropagation(event);
            });


            $('body').off('click',options.wrapper+' .common-tree-node-title').on('click',options.wrapper+' .common-tree-node-title',function(event){
                stopPropagation(event)
                $(this).next().slideToggle();
                $(this).children('span.icon').toggleClass('icon-menu-block-right').toggleClass('icon-menu-block-down');
                //$(this).children('span.icon').toggleClass('icon-menu-block-right');
                //<span class="icon "></span>
                if (typeof option.nodeClickCallback == 'function')
                {
                    option.nodeClickCallback(this)
                }
            });

            $('body').off('click',options.wrapper+' .common-tree-node-title input').on('click',options.wrapper+' .common-tree-node-title input',function(event){
                stopPropagation(event)
                if (typeof option.inputClickCallback == 'function')
                {
                    option.inputClickCallback(this)
                }
            });

            $('body').off('click',options.wrapper+' input').on('click',options.wrapper+' input',function(event){
                stopPropagation(event)
                
                setSelectedItem($(this).parent().attr('data-id'));

                $(this).parents(_this.wrapper+':first').hide();

                if (typeof option.radioClickCallback == 'function')
                {
                    var id   = $(this).parent().attr('data-id'),
                        name = $(this).parent().attr('data-name');
                    option.radioClickCallback(id,name,this)
                }
            });

            this.off('click').on('click',function(event){
                stopPropagation(event)
                $(this).next().show();
            });

            $(document).on('click',function(){
                $this.hide();
            });


            var setSelectedItem = function(id)
            {
                var $option = $(this.wrapper+' .common-tree-select-option[data-id="'+id+'"]');
                if ($option.length>0)
                {
                    $(this.wrapper+' .common-tree-select-option').removeClass('selected');
                    $option.addClass('selected');

                    var pathText = '',
                        pathArr  = [];
                    $option.parents('.common-tree-node').each(function(){
                        pathArr.push($(this).children('.common-tree-node-title').attr('data-name'));
                    });

                    pathArr.reverse();

                    pathText = $option.attr('data-name');
                    if (pathArr.length > 0)
                    {
                        if ($option.attr('option-type')=='node' && pathArr.length<2)
                        {

                        }
                        else
                        {
                            pathText += '（'+pathArr.join(' > ')+'）';
                        }
                        
                    }
                    
                    if (this.option.pathInputName)
                    {
                        $('input[name="'+this.option.pathInputName+'"]').attr('data-id',id).attr('data-name',$option.attr('data-name')).val(pathText);
                    }
                }
            }
            
            var createHtml = function(data,init)
            {
                for(var k = 0 ; k<data.length ; k++)
                {
                    var arrowIcon = '';
                    var positions = data[k].position_list;
                    if (positions.length>0 || data[k].child.length>0)
                    {
                        arrowIcon = '<span class="icon icon-menu-block-right icon-left js-icon-menu"></span>';
                    }

                    var nodeCheckBox = '';
                    if (typeof _this.option.nodeCheckBox != 'undefined' && _this.option.nodeCheckBox == true)
                    {
                        var nodeChecked = nodeSelected = '';
                        if (typeof init != 'undefined' && init == true && _this.initSelectedItems.length>0)
                        {
                            if (inArray(data[k].id,_this.initSelectedItems))
                            {
                                nodeChecked  = 'checked';
                                nodeSelected = 'selected';
                            }
                        }
                        nodeCheckBox = '<input '+nodeChecked+' type="checkbox">';
                    }

                    var nodeRadioBox = '',
                        radioName    = _this.option.radioName;
                    if (typeof _this.option.nodeRadioBox != 'undefined' && _this.option.nodeRadioBox == true)
                    {
                        nodeRadioBox = '<input name="'+radioName+'" '+nodeChecked+' type="radio">';
                    }


                    html+='<div class="common-tree-node"><div option-type="node" data-id="'+data[k].id+'" data-name="'+data[k].name+'" class="common-tree-node-title common-tree-select-option">'+arrowIcon+data[k].name+nodeCheckBox+nodeRadioBox+'</div><div class="common-tree-children-wrap">';
                    
                    if (positions.length>0)
                    {
                        for(var k1 = 0 ; k1<positions.length ; k1++)
                        {
                            var itemChecked = itemSelected = '';
                            if (typeof init != 'undefined' && init == true && _this.initSelectedItems.length>0)
                            {
                                if (inArray(positions[k1].id,_this.initSelectedItems))
                                {
                                    itemChecked  = 'checked';
                                    itemSelected = 'selected';
                                }
                            }

                            var itemCheckBox = '';
                            if (typeof _this.option.itemCheckBox != 'undefined' && _this.option.itemCheckBox == true)
                            {
                                itemCheckBox = '<input '+itemChecked+' type="checkbox">';
                            }

                            var itemRadioBox = '',
                                radioName    = _this.option.radioName;
                            if (typeof _this.option.itemRadioBox != 'undefined' && _this.option.itemRadioBox == true)
                            {
                                itemRadioBox = '<input name="'+radioName+'" '+itemChecked+' type="radio">';
                            }

                            

                            html+='<div option-type="item" data-id="'+positions[k1].id+'" data-name="'+positions[k1].name+'" class="common-tree-item common-tree-select-option '+itemSelected+'">'+positions[k1].name+itemCheckBox+itemRadioBox+'</div>';
                        }
                    }

                    if (data[k].child.length>0)
                    {
                        createHtml(data[k].child);
                    }

                    //html+='</div>';
                    html+='</div></div>';

                }
            }

            return this;
        }
    });
}(window,$));




/**
 * 根据日期，获取节日名称。
 *
 * @author  weiming@juooo.com
 * @param   string   dateString    如:2016-1-1
 * @returns string   '元旦'
 */
function getFestival(dateString){
    var lunarInfo=new Array(0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
    var str="日一二三四五六七八九十";
    if(dateString){
        var dateString = dateString.split(' ')[0]+' 00:00:00';
        var now=new Date(dateString),SY=now.getFullYear(),SM=now.getMonth(),SD=now.getDate();
    }
    else{
        var now=new Date(),SY=now.getFullYear(),SM=now.getMonth(),SD=now.getDate();
    }
    var SW=now.getDay();
    var lDObj=new Lunar(now);
    var LM=lDObj.month;
    var LD=lDObj.day;
    function cyclical(num){
        var Gan="甲乙丙丁戊己庚辛壬癸";
        var Zhi="子丑寅卯辰巳午未申酉戌亥";
        return(Gan.charAt(num%10)+Zhi.charAt(num%12));
    }
    function lYearDays(y){
        var i,sum=348;
        for(i=0x8000;i>0x8;i>>=1)sum+=(lunarInfo[y-1900]&i)?1:0;
        return sum+leapDays(y);
    }
    function leapDays(y){if(leapMonth(y))return (lunarInfo[y-1900]&0x10000)?30:29;else return(0);}
    function leapMonth(y){return lunarInfo[y-1900]&0xf;}
    function monthDays(y,m){return (lunarInfo[y-1900]&(0x10000>>m))?30:29;}
    function Lunar(objDate){
        var i,leap=0,temp=0;
        var baseDate=new Date(1900,0,31);
        var offset=(objDate-baseDate)/86400000;
        this.dayCyl=offset+40;
        this.monCyl=14;
        for(i=1900;i<2050&&offset>0;i++){
            temp=lYearDays(i);
            offset-=temp;
            this.monCyl+=12;
        }
        if(offset<0){
            offset+=temp;
            i--;
            this.monCyl-=12;
        }
        this.year=i;
        this.yearCyl=i-1864;
        leap=leapMonth(i);
        this.isLeap=false
        for(i=1;i<13&&offset>0;i++){
            if(leap>0&&i==(leap+1)&&this.isLeap==false){
                --i;
                this.isLeap=true;
                temp=leapDays(this.year);
            }else{
                temp=monthDays(this.year,i);
            }
            if(this.isLeap==true&&i==(leap+1))this.isLeap=false;
            offset-=temp;
            if(this.isLeap==false)this.monCyl++;
        }
        if(offset==0&&leap>0&&i==leap+1)if(this.isLeap){
            this.isLeap=false;
        }else{
            --i;
            this.isLeap=true;
            --this.monCyl;
        }
        if(offset<0){offset+=temp;--i;--this.monCyl;}
        this.month=i;
        this.day=offset+1;
    }
    function YYMMDD(){
        var cl = '<span color="#333333">';
        if (SW == 0) cl = '<span color="#c00000">';
        if (SW == 6) cl = '<span color="#00c000">';
        return(cl+SY+'年'+(SM+1)+'月'+SD+'日</span>');
    }
    function weekday(){
        var cl='<span color="#333333">';
        if (SW==0||SW==6)cl='<span color="#ff0000">';
        return cl+"星期"+str.charAt(SW)+'</span>';
    }
    function cDay(m,d){
        var nStr="初十廿卅　",s;
        if(m>10)s='十'+str.charAt(m-10);else s=str.charAt(m);
        s+='月';
        switch(d){
            case 10:s+='初十';break;
            case 20:s+='二十';break;
            case 30:s+='三十';break;
            default:s+=nStr.charAt(Math.floor(d/10));s+=str.charAt(d%10);
        }
        if(lDObj.isLeap)s="闰"+s;
        return(s);
    }
    function lunarTime(){
        return('<span color="#006600">'+cyclical(SY-4)+'年 '+cDay(LM,LD)+'</span>');
    }
    // 是否为父亲节 每年六月的第三个周日
    function isFatherDay(fatherDateStr){
        if(fatherDateStr){
            d = new Date(fatherDateStr);
        }else{
            d = new Date();
        }
        var dd = new Date("June 01 "+d.getFullYear()),
            cm = d.getTime(),//获取当前时间的毫秒数
            fatherDay = (new Date("June "+(1+(7-dd.getDay())+14)+" "+d.getFullYear())).getTime(),
            day = 60*60*24*1000,
            b= fatherDay-cm;
        if(b<=0  && -b <= day) {
            return '父亲节';
        }
        else{
            return '';
        }
    }
    //是否为母亲节 每年五月的第二个周末
    function isMotherDay(motherDateStr){
        if(motherDateStr){
            d = new Date(motherDateStr);
        }else{
            d = new Date();
        }
        // var d = motherDateStr || new Date();
        var dd = new Date("May 01 "+d.getFullYear()),
            cm = d.getTime(),//获取当前时间的毫秒数
            montherDay = (new Date("May "+(1+(7-dd.getDay())+7)+" "+d.getFullYear())).getTime(),
            day = 60*60*24*1000,
            b= montherDay-cm;
        if(b<=0  && -b <= day) {
            return '母亲节';
        }
        else{
            return '';
        }
    }
    function specialDate(){
        var sTermInfo=new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
        var solarTerm=new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
        var lFtv="0101春节0115元宵节0505端午节0707七夕情人节0815中秋节0100除夕";
        var sFtv="0101元旦0214情人节0308妇女节0501劳动节0504青年节0601儿童节0910教师节1001国庆节1225圣诞节";
        var tmp1,tmp2,festival='';
        tmp1=new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5));
        tmp2=tmp1.getUTCDate();
        if(tmp2==SD && solarTerm[SM*2+1] == '清明')festival += solarTerm[SM*2+1];
        tmp1=new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2]*60000)+Date.UTC(1900,0,6,2,5));
        tmp2=tmp1.getUTCDate();
        if(tmp2==SD && solarTerm[SM*2] == '清明') festival += solarTerm[SM*2];
        var reg=new RegExp((LM<10&&"0"||"")+LM+(LD<10&&"0"||"")+LD+'([^\\d]+)','');
        if(lFtv.match(reg)!=null)festival += RegExp.$1;
        reg=new RegExp((SM<9&&"0"||"")+(SM+1)+(SD<10&&"0"||"")+SD+'([^\\d]+)','');
        if(sFtv.match(reg)!=null)festival += RegExp.$1;
        if(isMotherDay(dateString)){
            festival += isMotherDay(dateString);
        }
        if(isFatherDay(dateString)){
            festival += isFatherDay(dateString);
        }
        return(festival);
    }
    //return YYMMDD()+' '+weekday()+' '+lunarTime()+specialDate(); // 2017年1月28日 星期六 丁酉年 一月初一 春节
    //return YYMMDD()+' '+weekday()+' '+specialDate(); // 2017年1月28日 星期六 春节
    return specialDate(); // 春节
}

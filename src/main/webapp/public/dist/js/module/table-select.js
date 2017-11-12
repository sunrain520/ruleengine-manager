/**
 * Created by huangjiajia on 2016/11/14.
 * Description: 表格全操作
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

        _this.$tableHeader = _this.options.tableHeaderClass ? $(_this.options.tableHeaderClass) : _this.$selectAll.closest('table');

        // 表格头部固定 两个表格 头部 js-table-header
        if( _this.$tableHeader.length > 0) {
            _this.$table = _this.$tableHeader.closest('.js-table-header-wrap').next().find('.js-table');
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
            top          = $tableHeader[0] && $tableHeader.offset().top,
            left         = $tableHeader[0] && $tableHeader.offset().left,
            width        = $tableHeader[0] && $tableHeader.next()[0].offsetWidth,
            height       = $tableHeader[0] && $tableHeader[0].offsetHeight,
            $pagination  = _this.$table.closest('.js-table-body-wrap').nextAll('.js-pagination-panel'),
            pagesLeft    = $pagination[0] && $pagination.offset().left,
            pagesWidth   = $pagination[0] && $pagination[0].offsetWidth,
            pagesHeight  = $pagination[0] && $pagination[0].offsetHeight,
            $tbody       = $tableHeader.next(),
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
        });

        //console.log($tableHeader, $tbody, $pagination,'ooooo');

        window.onscroll = function(){
            var t         = $(window).scrollTop(),
                winHeight = $(window).height();

            // 如果需要固定头部和底部
            if(!$tableHeader.hasClass('js-ignore')) {
                if(t > top ) {
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
                        'padding-right': 20
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
                        'padding-right': 0
                    });

                    $pagination.find('.js-options-panel').hide();
                }
            }

        };

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


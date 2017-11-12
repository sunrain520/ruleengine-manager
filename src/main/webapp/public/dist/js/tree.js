/**
 * Created by huangjiajia on 2016/12/6.
 * Description: 树形结构
 */
(function ($) {
    /*
     * 1. 创建属性结构 .js-tree-panel
     *
     * 头部：
     *  -> 确定 #js-tree-submit
     *  -> 取消 .js-tree-cancel
     *
     * 左边树形结构：
     *  -> 一级树形 .js-tree-list
     *    -> 单个内容 .js-item-content .js-tree-first
     *    -> checkbox .js-tree-first .js-checkbox-wrap
     *    -> 左边按钮 .js-tree-first .js-icon-menu.icon-menu-block-right
     *    -> 二级树形 .js-tree-first .js-item-content .js-tree-second
     *
     *  -> 二级树形 .js-tree-first .js-item-content .js-tree-second
     *    -> 列表     .js-tree-second .js-tree-list
     *    -> 单个内容  .js-tree-list .js-list-item .js-second-content
     *    -> checkbox .js-tree-second .js-checkbox-wrap
     *    -> 左边按钮 .js-tree-second .js-icon-menu.icon-menu-block-right
     *    -> 三级树形 .js-tree-second .js-item-content .js-tree-third
     *
     *  -> 三级树形
     *  -> 四级树形
     *  -> 五级树形
     *
     * 左边搜索面板：
     *  -> 搜索框 .js-input-group .js-tree-input
     *  -> 搜索结构面板 js-search-result-panel .js-search-list
     *    -> 单个搜索结构 .js-search-list .js-list-item
     *    -> checkbox .js-checkbox-wrap
     *
     * 右边：
     *  -> 清空     .js-selected-clear
     *  -> 选择面板 .js-selected-list
     *  -> 单个     .js-selected-list .js-list-item
     *  -> 删除单个 .js-list-item .js-selected-remove
     *
     */
    var $body = $('body');

    var TreePanel = function (element,options) {
        this.$element      = $(element);
        this.$selectedList = (options.selectedListClass && $(options.selectedListClass)) || this.$element.closest('.js-selected-wrap').find('.js-selected-list');
        this.data          = options.data || {};
        this.submitFun     = options.submitFun || function () {};
        this.originalData  = options.originalData;
        this.isNoTree      = options.isNoTree || false;        // 是否是层级关系
        this.isGroup       = options.isGroup  || false;        // 是否把每一层当成一个item来处理，如：如果选择了一个层级，右边面板只显示这个层级而不是它下面的所有item
        this.maxSelectNum  = options.maxSelectNum || 0;
        this.position      = options.position || 'bottom-right';   // 'top-left' 'top-right' 'bottom-left' 'bottom-right' 'center'

        this.setTreeOtherHtml(this.data);
        this.dragFun();
        this.clickHandler();
    };

    /**
     * Description: 获取当前对象在屏幕上的坐标
     * @returns {{left: number, top: number}}
     */
    TreePanel.prototype.setPosition = function ($dialog) {
        var left         = 0,
            top          = 0,
            right        = 0,
            bottom       = 0,
            style        = '',
            $elements    = this.$element,
            position     = this.position,
            width        = $elements.outerWidth(),
            height       = $elements.outerHeight(),
            dialogWidth  = $dialog.outerWidth(),
            dialogHeight = $dialog.outerHeight();

        if(position == 'top-left') {
            left = $elements.offset().left - dialogWidth;
            bottom = -5;

            style = 'position: absolute; left:' + left + 'px;' + 'bottom:' + bottom + 'px;';
            $dialog.css({
                position: 'absolute',
                left: left + 'px',
                bottom: bottom + 'px'
            });
        }
        else if(position == 'top-right') {
            left = $elements.offset().left + dialogWidth;
            bottom = -5;

            style = 'position: absolute; left:' + left + 'px;' + 'bottom:' + bottom + 'px;';

            $dialog.css({
                position: 'absolute',
                left: left + 'px',
                bottom: bottom + 'px'
            });
        }
        else if(position == 'bottom-left') {
            left = $elements.offset().left - dialogWidth;
            top  = $elements.offset().top + height;

            //style = 'position: absolute; left:' + left + 'px;' + 'top:' + top + 'px;';

            $dialog.css({
                position: 'absolute',
                left: left + 'px',
                top: top + 'px'
            });
        }
        else if(position == 'bottom-right') {
            left = $elements.offset().left + width;
            top  = $elements.offset().top + height;

            //style = 'position: absolute; left:' + left + 'px;' + 'top:' + top + 'px;';
            $dialog.css({
                position: 'absolute',
                left: left + 'px',
                top: top + 'px'
            });
        }
        else if(position == 'center') {
            left = parseInt(($(window).width() - dialogWidth) / 2);
            top  = parseInt(($(window).height() - dialogHeight) / 2);

            //style = 'position: fixed; left:' + left + 'px;' + 'top:' + top + 'px;';
            $dialog.css({
                position: 'fixed',
                left: left + 'px',
                top: top + 'px'
            });
        }

        //return {left: left, top: top}

    };

    /**
     * Description: 初始化树形结构
     * @param $treeList:
     * @param $selectedList
     */
    TreePanel.prototype.setSelectedItem = function ($treeList, $selectedList) {
        /*
         * 1. 获取页面上的已经选择的员工
         * 2. 更新tree的样式
         * 3. 更新右边已经选择的面板
         */
        var _this         = this,
            originalData  = _this.originalData,
            $originalList = _this.$selectedList,
            html          = '',
            id            = '',
            name          = '',
            depId         = '',
            depName       = '',
            $selectItem   = null;

        if(originalData) {
            for(var i = 0, len = originalData.length; i < len; i ++) {
                id          = originalData[i].id;
                name        = originalData[i].name;
                depId       = originalData[i].depId;
                depName     = originalData[i].depName;


                html += setSelectedHtml(id, name, depId, depName);

            }
        }
        else {
            $originalList.find('.js-list-item').each(function () {
                var $item         = $(this),
                    id            = $item.attr('data-id'),
                    name          = $item.attr('data-name'),
                    depId         = $item.attr('data-dep-id'),
                    depName       = $item.attr('data-dep-name'),
                    $selectedItem = $treeList.find('.js-item-content[data-id="' + id + '"]').find('.js-checkbox-wrap');

                html += setSelectedHtml(id, name, depId, depName);
            });
        }


        $selectedList.append(html);

        function setSelectedHtml(id, name, depId, depName) {
            var html = '';

            if(id * 1 == 0 && name == '' && _this.isGroup) {
                $selectItem = $treeList.find('.js-item-content[data-dep-id="' + depId + '"]').find('.js-checkbox-wrap-all').eq(0);

                $treeList.find('.js-item-content[data-dep-id="' + depId + '"]').find('.js-item-content .js-checkbox-wrap-all').each(function () {
                    var $itemAll       = $(this),
                        $itemAllContent = $itemAll.closest('.js-item-content');

                    setCheckboxStatus($itemAll, 'true');

                    $itemAllContent.attr('data-group', 'group');
                    $itemAll.css('cursor', 'not-allowed');
                    $itemAll.find('input[type="checkbox"]').css('cursor', 'not-allowed');
                });

                $treeList.find('.js-item-content[data-dep-id="' + depId + '"]').find('.js-item-content .js-checkbox-wrap').each(function () {
                    var $item       = $(this),
                        $itemContent = $item.closest('.js-item-content');

                    setCheckboxStatus($item, 'true');

                    $itemContent.attr('data-group', 'group');
                    $item.css('cursor', 'not-allowed');
                    $item.find('input[type="checkbox"]').css('cursor', 'not-allowed');
                });

            }
            else {
                $selectItem = $treeList.find('.js-item-content[data-id="' + id + '"]').find('.js-checkbox-wrap');
            }

            setCheckboxStatus($selectItem, 'true');

            html += '<li class="list-item js-list-item" data-id="' + id + '" data-name="' + name + '" data-dep-id="' + depId + '" data-dep-name="' + depName + '">';
            html += '<div class="item-content">';

            if(id * 1 == 0 && name == '') {
                html += '<span class="text">' + depName + '</span>';
            }
            else {
                html += '<span class="text">' + name + '</span>';
            }
            html += '<div class="item-right">';
            html += '<span class="icon icon-delcontact js-selected-remove"></span>';
            html += '</div>';
            html += '</div>';
            html += '</li>';

            return html;
        }

    };

    TreePanel.prototype.dragFun = function () {

        //浮窗拖动
        var moveDialogElem    = null,
            movePointStartPos = null,
            moveElemStartPos  = null;


        $('body').on('mousedown','.js-tree-header',function(event) {
            var e    = event || window.event;
            if (this.setCapture) {
                this.setCapture();
            }
            else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            var $this  = $(this),
                left   = $this.offset().left,
                top    = $this.offset().top;

            moveDialogElem       = $this.closest('.js-tree-panel');
            movePointStartPos    = {'x':e.clientX,'y':e.clientY};
            moveElemStartPos     = {'top':top,'left':left};

            document.onmousemove = documentMouseMove;
        });

        //释放拖动事件
        $(document).on('mouseup',function(event) {

            if (this.releaseCapture) {
                this.releaseCapture();
            }
            else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            document.onmousemove = null;

        });

        var documentMouseMove = function(event) {
            var e     = event || window.event,
                pos   = {'x':e.clientX,'y':e.clientY},
                diffX = movePointStartPos.x - pos.x,
                diffY = movePointStartPos.y - pos.y;

            moveDialogElem.css({left:moveElemStartPos.left-diffX+'px',top:moveElemStartPos.top-diffY+'px'});
        }
    };

    TreePanel.prototype.clickHandler = function () {
        var _this = this;

        // 选择单个员工 .js-checkbox-wrap -> 更新右边选择面板中
        $body.on('click', '.js-checkbox-wrap', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            var $this           = $(this),
                $treePanel      = $this.closest('.js-tree-panel'),
                $itemContent    = $this.closest('.js-item-content'),
                $itemContentAll = $this.parents('.js-item-content'),
                uid             = $itemContent.attr('data-id'),
                $selectedList   = $treePanel.find('.js-selected-list'),
                name            = $itemContent.attr('data-name'),
                $searchItem     = $treePanel.find('.js-tree-list .js-item-content[data-id="' + uid + '"]'),
                $FirstDep       = $itemContentAll.eq(1),
                depId           = $FirstDep.attr('data-dep-id') || $itemContent.attr('data-dep-id'),
                depName         = $FirstDep.attr('data-dep-name') || $itemContent.attr('data-dep-name');

            if($itemContent.attr('data-group') != 'group') {

                // checkCheckbox($this, checkedCallback, uncheckedCallback)
                checkCheckbox($this, function () {
                    // setRightItemHtml(uid, name, $selectedList,[])
                    setRightItemHtml(uid, name, $selectedList,[depId,depName]);

                    $itemContent.addClass('active');

                    // 更新上一级的全选 $itemContent .js-checkbox-wrap-all
                    $itemContentAll.each(function () {
                        var $item          = $(this),
                            $itemSelectAll = $item.find('.js-checkbox-wrap-all').eq(0),
                            $checkbox      = $item.find('.js-checkbox-wrap');

                        // checkSelectAll($selectAll, $checkbox)
                        checkSelectAll($itemSelectAll, $checkbox);
                    });

                    // 更新模糊查询面板的item
                    setCheckboxStatus($searchItem, 'true');

                }, function () {
                    $selectedList.find('.js-list-item[data-id="' + uid + '"]').remove();
                    $itemContent.removeClass('active');

                    // 更新上一级全选 $itemContentAll
                    $itemContentAll.each(function () {
                        var $item          = $(this),
                            $itemSelectAll = $item.find('.js-checkbox-wrap-all').eq(0);

                        // setCheckboxStatus($this, status, callback)
                        setCheckboxStatus($itemSelectAll, 'false');
                    });

                    // 更新模糊查询面板的item
                    setCheckboxStatus($searchItem, 'false');
                    $itemContentAll = $searchItem.parents('.js-item-content');

                    // 更新上一级全选 $itemContentAll
                    $itemContentAll.each(function () {
                        var $item          = $(this),
                            $itemSelectAll = $item.find('.js-checkbox-wrap-all').eq(0);

                        // setCheckboxStatus($this, status, callback)
                        setCheckboxStatus($itemSelectAll, 'false');
                    });

                });
            }

        });

        // 选择全部 .js-item-content .js-checkbox-wrap-all
        $body.on('click', '.js-checkbox-wrap-all', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            var $this           = $(this),
                $ItemContent    = $this.closest('.js-item-content'),
                $itemContentAll = $this.parents('.js-item-content'),
                $itemSelectAll  = $ItemContent.find('.js-item-content .js-checkbox-wrap-all'),
                $items          = $ItemContent.find('.js-checkbox-wrap'),
                $selectedList   = $this.closest('.js-tree-panel').find('.js-selected-list'),
                currentDepId    = $ItemContent.attr('data-dep-id'),
                currentDepName  = $ItemContent.attr('data-dep-name');

            if($ItemContent.attr('data-group') != 'group') {

                // checkCheckbox($this, checkedCallback, uncheckedCallback)
                checkCheckbox($this, function () {

                    // 更新该全选下的全选 etRightItemHtml(uid, name, $selectedList)
                    setCheckboxStatus($itemSelectAll, 'true');
                    if(_this.isGroup) {
                        $itemSelectAll.each(function () {
                            var $itemAll        = $(this),
                                $itemAllContent = $itemAll.closest('.js-item-content');

                            $itemAllContent.attr('data-group','group');
                            $itemAll.css('cursor', 'pointer');
                            $itemAll.find('input[type="checkbox"]').css('cursor', 'not-allowed');
                        });
                    }

                    // 每个员工
                    $items.each(function () {
                        var $item        = $(this),
                            $itemContent = $item.closest('.js-item-content'),
                            $FirstDep    = $item.parents('.js-item-content').eq(1),
                            uid          = $itemContent.attr('data-id'),
                            name         = $itemContent.attr('data-name'),
                            depId        = $FirstDep.attr('data-dep-id'),
                            depName      = $FirstDep.attr('data-dep-name');

                        if(_this.isGroup) {
                            $itemContent.attr('data-group','group');
                            $item.css('cursor', 'pointer');
                            $item.find('input[type="checkbox"]').css('cursor', 'not-allowed');
                        }

                        if(!$item.find('input[type="checkbox"]').attr('checked')) {

                            // setCheckboxStatus($this, status, callback)
                            setCheckboxStatus($item, 'true');

                            // setRightItemHtml(uid, name, $selectedList)
                            !_this.isGroup && (setRightItemHtml(uid, name, $selectedList, [depId, depName]));

                            $itemContent.addClass('active');
                        }

                    });

                    // 更新向上的所有全选
                    $itemContentAll.each(function () {
                        var $item      = $(this),
                            $selectAll = $item.find('.js-checkbox-wrap-all').eq(0),
                            $checkbox  = $selectAll.find('.js-checkbox-wrap');

                        // checkSelectAll($selectAll, $checkbox)
                        checkSelectAll($selectAll, $checkbox);
                    });

                    // 如果是分层组
                    if(_this.isGroup) {

                        // 设置右边选择的列表
                        setRightItemHtml(0, '', $selectedList, [currentDepId, currentDepName], _this.isGroup);

                        // 如果选择的是分组，分别删掉它下面已经选的员工和部门
                        $itemSelectAll.each(function () {
                            var $itemAll        = $(this),
                                $itemAllContent = $itemAll.closest('.js-item-content'),
                                itemDepId       = $itemAllContent.attr('data-dep-id');

                            $selectedList.find('.js-list-item[data-id=0][data-name=""][data-dep-id="' + itemDepId + '"]').remove();
                        });

                        // 如果选择的是分组，分别删掉它下面已经选的员工和部门
                        $items.each(function () {
                            var $item        = $(this),
                                $itemContent = $item.closest('.js-item-content'),
                                itemId       = $itemContent.attr('data-id');

                            $selectedList.find('.js-list-item[data-id="' + itemId + '"]').remove();
                        })

                    }


                }, function () {

                    // 每个员工
                    $items.each(function () {
                        var $item        = $(this),
                            $itemContent = $item.closest('.js-item-content'),
                            uid          = $itemContent.attr('data-id');

                        //_this.isGroup && ($itemContent.removeAttr('data-group'));
                        if(_this.isGroup) {
                            $itemContent.removeAttr('data-group').css('cursor', 'pointer');
                            $item.find('input[type="checkbox"]').css('cursor', 'pointer');
                        }
                        // setCheckboxStatus($this, status, callback)
                        setCheckboxStatus($item, 'false');

                        !_this.isGroup && ($selectedList.find('.js-list-item[data-id="' + uid + '"]').remove());
                        $itemContent.removeClass('active');
                    });

                    // 向上/向下更新所有全选
                    setCheckboxStatus($itemSelectAll, 'false');

                    $itemContentAll.each(function () {
                        var $item           = $(this),
                            $itemAllContent = $item.closest('.js-item-content'),
                            $selectAll      = $item.find('.js-checkbox-wrap-all').eq(0);

                        //_this.isGroup && ($item.removeAttr('data-group'));
                        if(_this.isGroup) {
                            $itemAllContent.removeAttr('data-group');
                            $item.css('cursor', 'pointer');
                            $item.find('input[type="checkbox"]').css('cursor', 'pointer');
                        }

                        setCheckboxStatus($selectAll, 'false');
                    });

                    $itemSelectAll.each(function () {
                        var $item           = $(this),
                            $itemAllContent = $item.closest('.js-item-content');

                        //_this.isGroup && ($item.removeAttr('data-group'));
                        if(_this.isGroup) {
                            $itemAllContent.removeAttr('data-group');
                            $item.css('cursor', 'pointer');
                            $item.find('input[type="checkbox"]').css('cursor', 'pointer');
                        }

                    });

                    _this.isGroup && ($selectedList.find('.js-list-item[data-dep-id="' + currentDepId + '"]').remove());

                });
            }

        });

        /*
         * 右边删除一个员工  .js-selected-list -> .js-list-item .js-selected-remove
         * .js-tree-list .js-checkbox-wrap
         */
        $body.on('click', '.js-selected-list .js-selected-remove', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $this = $(this);

            // removeItem($removeDom)
            removeItem($this);
        });

        // 右边清空 。.js-selected-clear
        $body.on('click', '.js-selected-clear', function () {
            var $selectedItem = $(this).closest('.js-tree-panel').find('.js-selected-list .js-list-item');

            $selectedItem.each(function () {
                var $item = $(this);

                // removeItem($removeDom)
                removeItem($item);
            })
        });

        // 确定按钮 返回所有的已经选择的员工对象数组
        $body.off('click','#js-tree-submit').on('click', '#js-tree-submit', function () {
            var $this              = $(this),
                $treePanel         = $this.closest('.js-tree-panel'),
                $selectedList      = $treePanel.find('.js-selected-list'),
                selectedArr        = [],
                $selectedListOuter = _this.$selectedList,
                html               = '',
                maxSelectNum       = _this.maxSelectNum;

            $selectedList.find('.js-list-item').each(function () {
                var $item   = $(this),
                    itemObj = new Object(),
                    uid     = $item.attr('data-id'),
                    uname   = $item.attr('data-name'),
                    depId   = $item.attr('data-dep-id'),
                    depName = $item.attr('data-dep-name');

                itemObj.id      = uid;
                itemObj.name    = uname;
                itemObj.depId   = depId;
                itemObj.depName = depName;

                selectedArr.push(itemObj);

                html += '<span class="selected-item js-list-item" data-id="' + uid +'" data-name="' + uname + '" data-dep-id="' + depId + '" data-dep-name="' + depName + '">';

                if(uid * 1 == 0 && uname == '') {
                    html += depName;
                }
                else {
                    html += uname;
                }
                html += '<span class="glyphicon glyphicon-remove"></span>';
                html += '</span>';
            });

            if(maxSelectNum > 0) {
                if(selectedArr.length > maxSelectNum) {
                    alert('最多只能选择' + maxSelectNum + '个');
                    return;
                }
            }

            $selectedListOuter.empty();
            $selectedListOuter.html(html);

            _this.submitFun(selectedArr);

            $treePanel.remove();
        });

        // 取消 删除员工面板
        $body.on('click', '.js-tree-cancel', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $this      = $(this),
                $treePanel = $this.closest('.js-tree-panel');

            $treePanel.remove();
        });

        // 展开与收起 .js-icon-menu .js-list-item -> .js-tree-list  js-icon-menu
        $body.on('click', '.js-folder-item', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            var $this     = $(this),
                $listItem = $this.closest('.js-list-item'),
                $treeList = $listItem.find('.js-tree-list'),
                $icon     = $this.find('.js-icon-menu');

            if($icon.hasClass('icon-menu-block-right')) { // 未展开
                //$treeList.eq(0).show();
                $listItem.addClass('js-active');
                $treeList.each(function () {
                    var $item = $(this);

                    if($item.closest('.js-list-item').hasClass('js-active')) {
                        $item.show();
                    }
                });
                $icon.addClass('icon-menu-block-down').removeClass('icon-menu-block-right');
            }
            else {
                $listItem.removeClass('js-active');
                $treeList.hide();
                $icon.addClass('icon-menu-block-right').removeClass('icon-menu-block-down');
            }
        });

        // 模糊查询 .js-input-group .js-tree-input  .js-search-result-panel .js-search-list
        $body.on('keyup focus', '.js-tree-input', function () {
            var $this        = $(this),
                val          = $.trim($this.val()),
                $treePanel   = $this.closest('.js-tree-panel'),
                $searchPanel = $treePanel.find('.js-search-result-panel'),
                $searchList  = $searchPanel.find('.js-search-list'),
                $resultList  = null;

            if(val == '') {
                $searchPanel.hide();
            }
            else {
                $resultList = $('.js-tree-list.js-search-data .js-item-content:contains("' + val + '")');

                // addBlurSearch($resultList, $appendDom)
                _this.addBlurSearch($resultList, $searchList);
                $searchPanel.show();
            }

        });

        // 隐藏treePanel
        $body.on('click',function (e) {
            if($(e.target).parents('.js-tree-panel').length == 0) {
                $body.find('.js-tree-panel').remove();
            }
        });

    };

    /**
     * Description: 模糊查询结果显示在结果面板上
     * @param $resultList: 模糊查询结果
     * @param $appendDom: 需要插入的节点
     */
    TreePanel.prototype.addBlurSearch = function($resultList, $appendDom) {
        var _this = this,
            html  = '';
        $appendDom.empty();

        //2017/2/24 新增 用户数据对象
        var userData = {};

        $resultList.each(function () {
             var $item            = $(this),
                $itemContent     = $item.closest('.js-item-content'),
                $itemList        = $item.closest('.js-list-item'),
                uName            = $itemContent.attr('data-name'),
                uId              = $itemContent.attr('data-id'),
                $listItemContent = $itemList.parents('.js-list-item').eq(0).find('.js-item-content').eq(0),
                depName          = $listItemContent.attr('data-dep-name'),
                depId            = $listItemContent.attr('data-dep-id');

            if($itemContent.find('.js-checkbox-wrap-all').length == 0) 
            {
                // 2017/2/24 修改 V1.1.3 合并同一用户需求
                if (typeof userData[uId] == 'undefined')
                {
                    userData[uId] = {};
                }
                userData[uId].name = uName;
                if (typeof userData[uId].depName == 'undefined')
                {
                    userData[uId].depId = [];
                    userData[uId].depName = [];
                }
                userData[uId].depId.push(depId);
                userData[uId].depName.push(depName);
            }
        });

        if( ! $.isEmptyObject(userData) )
        {
            $.each(userData, function(key, val) {
                //console.log(key)  key = uId
                //console.log(val.name)  val.name = uName
                //console.log(val.depId.join()) val.depId.join() = depId
                //console.log(val.depName.join('/')) val.depName.join('/') = depName
                html += '<li class="list-item js-list-item">';
                html += '<div class="item-content js-item-content" data-id="' + key + '" data-name="' + val.name + '" data-dep-id="' + val.depId.join() + '" data-dep-name="' + val.depName.join('/') + '">';

                _this.isNoTree ? html += '<span class="text">' + val.name + '</span>' : html += '<span class="text">' + val.name +'（' + val.depName.join('/') + '）</span>';

                html += '<div class="item-right">';
                html += '<div class="checkbox-wrap js-checkbox-wrap">';
                //html += $itemContent.find('.js-checkbox-wrap').html();
                html += '<input type="checkbox"><label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</li>';
            })
        }

        /*$resultList.each(function () {
            var $item            = $(this),
                $itemContent     = $item.closest('.js-item-content'),
                $itemList        = $item.closest('.js-list-item'),
                uName            = $itemContent.attr('data-name'),
                uId              = $itemContent.attr('data-id'),
                $listItemContent = $itemList.parents('.js-list-item').eq(0).find('.js-item-content').eq(0),
                depName          = $listItemContent.attr('data-dep-name'),
                depId            = $listItemContent.attr('data-dep-id');

            if($itemContent.find('.js-checkbox-wrap-all').length == 0) {
                html += '<li class="list-item js-list-item">';
                html += '<div class="item-content js-item-content" data-id="' + uId + '" data-name="' + uName + '" data-dep-id="' + depId + '" data-dep-name="' + depName + '">';

                _this.isNoTree ? html += '<span class="text">' + uName + '</span>' : html += '<span class="text">' + uName +'（' + depName + '）</span>';

                html += '<div class="item-right">';
                html += '<div class="checkbox-wrap js-checkbox-wrap">';
                html += $itemContent.find('.js-checkbox-wrap').html();
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</li>';
            }

        });*/

        $appendDom.append(html);
    }

    /**
     * Description: 右边移除一个员工
     * @$removeDom uid：员工对象
     */
    function removeItem($removeDom) {
        var $this       = $removeDom,
            $listItem   = $this.closest('.js-list-item'),
            uid         = $listItem.attr('data-id'),
            uName       = $listItem.attr('data-name'),
            depId       = $listItem.attr('data-dep-id'),
            $treePanel  = $this.closest('.js-tree-panel'),
            $updateItem = null;

        if(uid * 1 == 0 && uName == '') {
            $updateItem = $treePanel.find('.js-item-content[data-dep-id="' + depId + '"]');

            // 该部门取消选中
            //setCheckboxStatus($this, status, callback)
            $updateItem.removeClass('active');
            setCheckboxStatus($updateItem.find('.js-checkbox-wrap-all'), 'false');
            setCheckboxStatus($updateItem.find('.js-checkbox-wrap'), 'false');

            $updateItem.find('.js-checkbox-wrap-all').each(function () {
                var $itemAll        = $(this),
                    $itemAllContent = $itemAll.closest('.js-item-content');

                $itemAllContent.removeAttr('data-group');
                $itemAll.css('cursor', 'pointer');
                $itemAll.find('input[type="checkbox"]').css('cursor', 'pointer');
            });

            $updateItem.find('.js-checkbox-wrap').each(function () {
                var $item        = $(this),
                    $itemContent = $item.closest('.js-item-content');

                $itemContent.removeAttr('data-group');
                $item.css('cursor', 'pointer');
                $item.find('input[type="checkbox"]').css('cursor', 'pointer');
            });

            //setCheckboxStatus($updateItem.closest('.js-list-item').find('.js-checkbox-wrap'), 'false');  // 应该用不到
        }
        else  {
            $updateItem = $treePanel.find('.js-item-content[data-id="' + uid + '"]');

            // 该员工取消选中
            //setCheckboxStatus($this, status, callback)
            $updateItem.removeClass('active');
            setCheckboxStatus($updateItem.find('.js-checkbox-wrap'), 'false');
        }


        // 更新向上全选
        $updateItem.each(function () {
            var $item           = $(this),
                $itemContentAll = $item.parents('.js-item-content');

            // 更新向上的所有全选
            $itemContentAll.each(function () {
                var $item      = $(this),
                    $selectAll = $item.find('.js-checkbox-wrap-all').eq(0),
                    $checkbox  = $item.find('.js-checkbox-wrap');

                // checkSelectAll($selectAll, $checkbox)
                checkSelectAll($selectAll, $checkbox);
            });
        });

        // 更新选中面板
        $listItem.remove();
    }


    /**
     * Description: 右边添加一个新员工
     * @param uid：员工 id
     * @param name：员工 name
     * @param $selectedList：需要添加到的节点
     */
    function setRightItemHtml(uid, name, $selectedList, depArr, isGroup) {
        var html    = '',
            depId   = depArr && depArr[0] && depArr[0],
            depName = depArr && depArr[1] && depArr[1];

        html += '<li class="list-item js-list-item" data-id="' + uid + '" data-name="' + name + '" data-dep-id="' + depId + '" data-dep-name="' + depName + '">';
        html += '<div class="item-content">';
        isGroup ? html += '<span class="text">' + depName + '</span>' : html += '<span class="text">' + name + '</span>';
        html += '<div class="item-right">';
        html += '<span class="icon icon-delcontact js-selected-remove"></span>';
        html += '</div>';
        html += '</div>';
        html += '</li>';

        $selectedList.append(html);
    }

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

    /**
     * Description: 设置复选框的状态
     * @param $this：需要改变复选框对象
     * @param status：'true' or 'false'
     * @param callback: 改变状态之后的回调
     */
    function setCheckboxStatus($this, status, callback) {
        var $checkbox = $this.find('input[type="checkbox"]');

        if (status == 'true') {
            $this.prop('checked',true);
            $checkbox.prop('checked',true).attr('checked','checked');
        }
        else {
            $this.prop('checked',false);
            $checkbox.prop('checked',false).removeAttr('checked');
        }
        callback && callback($this);
    }

    /**
     * Description: 判断是否全选
     * @param $selectAll：需要更新状态的全选复选框对象
     * @param $checkbox：用来判断全选复选框状态的复选框对象 是一个array
     */
    function checkSelectAll($selectAll, $checkbox) {
        var isSelectedAll = true;


        $checkbox.each(function () {
            var $this         = $(this),
                $checkboxItem = $this.find('input[type="checkbox"]');

            //console.log($checkboxItem.attr('checked'),'checked',$checkboxItem);
            ($checkboxItem.attr('checked') != 'checked') && (isSelectedAll = false);
        });

        // setCheckboxStatus($this, status, callback)
        isSelectedAll ? setCheckboxStatus($selectAll, 'true') : setCheckboxStatus($selectAll, 'false');
    }

    /**
     * 创建选择面板 - 除掉左边的树形结构
     */
    TreePanel.prototype.setTreeOtherHtml = function(data) {
        var html   = '';

        //$('.js-tree-panel').remove();


        /* 面板 */
        html += '<div class="tree-panel js-tree-panel">';
        html += '<div class="tree-header js-tree-header">';
        html += '<h1 class="title">';
        html += '<h1 class="title">选择';
        html += '<div class="title-after">';
        html += '<button class="btn btn-success mr10" type="button" id="js-tree-submit">确认</button>';
        html += '<button class="btn btn-default btn-lg js-tree-cancel" type="button">取消</button>';
        html += '</div>';
        html += '</h1>';
        html += '</div>';

        // 内容部分
        html += '<div class="tree-content">';
        html += '<div class="left">';
        html += '<div class="title">';
        html += '<div class="input-group js-input-group">';
        html += '<input class="form-control js-tree-input" placeholder="输入关键字">';
        html += '<span class="icon icon-search input-group-add"></span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="content">';
        html += '<div class="search-result-panel js-search-result-panel">';
        html += '<ul class="tree-list js-search-list">';
        html += '</ul>';
        html += '</div>';

        // tree部分 ul
        this.isNoTree ? (html += this.setNoTreeContentList(data)): (html += this.setTreeContentList(data));

        html += '</div>';
        html += '</div>';
        /* 左边 END */

        /* 右边 */
        html += '<div class="right">';
        html += '<div class="title">请勾选添加';
        html += '<div class="title-after js-selected-clear">清空</div>';
        html += '</div>';
        html += '<div class="content">';
        html += '<ul class="selected-list js-selected-list">';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        /* 右边 END */
        /* 面板 END */

        $body.append(html);

        var $treePanel    = $('.js-tree-panel'),
            $treeList     = $treePanel.find('.js-tree-list.js-search-data'),
            $selectedList = $treePanel.find('.js-selected-list');

        this.setSelectedItem($treeList, $selectedList);

        // 设置位置
        this.setPosition($treePanel);
    };

    /**
     * Description: 创建左边树形结构
     * @param data: 左边列表结构
     */
    TreePanel.prototype.setTreeContentList = function (data) {
        var html = '';

        html += '<ul class="tree-list js-tree-list js-search-data">';
        for(var i = 0, len = data.data.length; i < len; i++) {
            var item = data.data[i],
                userList,
                tempSecond,
                tempThird,
                tempFourth,
                tempFiFith;

            html += '<li class="list-item js-list-item">';
            html += '<div class="item-content js-item-content " data-dep-id="' + item.dep_id + '" data-dep-name="' + item.dep_name + '">';
            html += '<div class="second-content js-second-content js-folder-item pointer">';
            html += '<span class="icon icon-menu-block-right icon-left js-icon-menu"></span>';
            html += '<span class="text">' + item.dep_name + '</span>';
            html += '<div class="item-right">';
            html += '<div class="checkbox-wrap js-checkbox-wrap-all">';
            html += '<input type="checkbox">';
            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            /* 列表 */
            if(item.user_list.length > 0) {
                html += '<ul class="tree-list js-tree-list"  style="display: none;">';
                userList = item.user_list;
                for(var j = 0, ulen = userList.length; j < ulen; j++) {
                    html += '<li class="list-item js-list-item">';
                    html += '<div class="item-content js-item-content"  data-id="' + userList[j].id + '" data-name="' + userList[j].name + '">';
                    html += '<span class="text">' + userList[j].name + '</span>';
                    html += '<div class="item-right">';
                    html += '<div class="checkbox-wrap js-checkbox-wrap">';
                    html += '<input type="checkbox">';
                    html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            }
            /* 列表 END */

            /* 二级 */
            tempSecond = item.child;
            if(tempSecond.length > 0) {

                for(var s = 0, slen = tempSecond.length; s < slen; s ++) {
                    html += '<div class="tree-second js-tree-second">';
                    html += '<ul class="tree-list js-tree-list"  style="display: none;">';
                    html += '<li class="list-item js-list-item">';
                    html += '<div class="item-content js-item-content "  data-dep-id="' + tempSecond[s].dep_id + '" data-dep-name="' + tempSecond[s].dep_name + '">';
                    html += '<div class="second-content js-second-content js-folder-item pointer">';
                    html += '<span class="icon icon-menu-block-right icon-left js-icon-menu"></span>';
                    html += '<span class="text">' + tempSecond[s].dep_name + '</span>';
                    html += '<div class="item-right">';
                    html += '<div class="checkbox-wrap js-checkbox-wrap-all">';
                    html += '<input type="checkbox">';
                    html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    /* 列表 */
                    userList = tempSecond[s].user_list;

                    if(userList.length > 0) {
                        html += '<ul class="tree-list js-tree-list" style="display: none;">';
                        for(j = 0, ulen = userList.length; j < ulen; j++) {
                            html += '<li class="list-item js-list-item">';
                            html += '<div class="item-content js-item-content"  data-id="' + userList[j].id + '" data-name="' + userList[j].name + '">';
                            html += '<span class="text">' + userList[j].name + '</span>';
                            html += '<div class="item-right">';
                            html += '<div class="checkbox-wrap js-checkbox-wrap">';
                            html += '<input type="checkbox">';
                            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                            html += '</li>';
                        }
                        html += '</ul>';
                    }

                    /* 三级 */
                    tempThird = tempSecond[s].child;
                    if(tempThird.length > 0) {

                        for(var t = 0, tlen = tempThird.length; t < tlen; t ++) {

                            html += '<div class="tree-third js-tree-third" >';
                            html += '<ul class="tree-list js-tree-list" style="display: none;">';
                            html += '<li class="list-item js-list-item">';
                            html += '<div class="item-content js-item-content "  data-dep-id="' + tempThird[t].dep_id + '" data-dep-name="' + tempThird[t].dep_name + '">';
                            html += '<div class="third-content js-third-content js-folder-item pointer">';
                            html += '<span class="icon icon-menu-block-right icon-left js-icon-menu"></span>';
                            html += '<span class="text">' + tempThird[t].dep_name + '</span>';
                            html += '<div class="item-right">';
                            html += '<div class="checkbox-wrap js-checkbox-wrap-all">';
                            html += '<input type="checkbox">';
                            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';

                            /* 列表 */
                            userList = tempThird[t].user_list;
                            if(userList.length > 0) {
                                html += '<ul class="tree-list js-tree-list" style="display: none;">';
                                for(j = 0, ulen = userList.length; j < ulen; j++) {
                                    html += '<li class="list-item js-list-item">';
                                    html += '<div class="item-content js-item-content"  data-id="' + userList[j].id + '" data-name="' + userList[j].name + '">';
                                    html += '<span class="text">' + userList[j].name + '</span>';
                                    html += '<div class="item-right">';
                                    html += '<div class="checkbox-wrap js-checkbox-wrap">';
                                    html += '<input type="checkbox">';
                                    html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</li>';
                                }
                                html += '</ul>';
                            }

                            /* 四级 */
                            tempFourth = tempThird[t].child;
                            if(tempFourth.length > 0) {
                                for(var f = 0, flen = tempFourth.length; f < flen; f ++) {
                                    html += '<div class="tree-fourth js-tree-fourth" >';
                                    html += '<ul class="tree-list js-tree-list" style="display: none;">';
                                    html += '<li class="list-item js-list-item">';
                                    html += '<div class="item-content js-item-content " data-dep-id="' + tempFourth[f].dep_id + '" data-dep-name="' + tempFourth[f].dep_name + '">';
                                    html += '<div class="fourth-content js-folder-item pointer">';
                                    html += '<span class="icon icon-menu-block-right icon-left  js-icon-menu"></span>';
                                    html += '<span class="text">' + tempFourth[f].dep_name + '</span>';
                                    html += '<div class="item-right">';
                                    html += '<div class="checkbox-wrap js-checkbox-wrap-all">';
                                    html += '<input type="checkbox">';
                                    html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';

                                    /* 列表 */
                                    userList = tempFourth[f].user_list;
                                    if(userList.length > 0) {
                                        html += '<ul class="tree-list js-tree-list" style="display: none;">';
                                        for(j = 0, ulen = userList.length; j < ulen; j++) {
                                            html += '<li class="list-item js-list-item">';
                                            html += '<div class="item-content js-item-content"  data-id="' + userList[j].id + '" data-name="' + userList[j].name + '">';
                                            html += '<span class="text">' + userList[j].name + '</span>';
                                            html += '<div class="item-right">';
                                            html += '<div class="checkbox-wrap js-checkbox-wrap">';
                                            html += '<input type="checkbox">';
                                            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                                            html += '</div>';
                                            html += '</div>';
                                            html += '</div>';
                                            html += '</li>';
                                        }
                                        html += '</ul>';
                                    }

                                    /* 五级 */
                                    tempFiFith = tempFourth[f].child;
                                    if(tempFiFith.length > 0) {
                                        html += '<div class="tree-fifth js-tree-fifth">';
                                        html += '<ul class="tree-list js-tree-list"  style="display: none;">';
                                        for(var n = 0, nlen = tempFiFith.length; n < nlen; n ++) {
                                            html += '<li class="list-item js-list-item">';
                                            html += '<div class="item-content js-item-content"  data-id="' + tempFiFith[n].id + '" data-name="' + tempFiFith[n].name + '">';
                                            html += '<span class="text">' + tempFiFith[n].name + '</span>';
                                            html += '<div class="item-right">';
                                            html += '<div class="checkbox-wrap js-checkbox-wrap">';
                                            html += '<input type="checkbox">';
                                            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
                                            html += '</div>';
                                            html += '</div>';
                                            html += '</div>';
                                            html += '</li>';
                                        }
                                        html += '</ul>';
                                        html += '</div>';
                                        /* 五级 END */
                                    }

                                    html += '</div>';
                                    html += '</li>';
                                    html += '</ul>';
                                    html += '</div>';
                                    /* 四级 END */
                                }
                            }

                            html += '</div>';
                            html += '</li>';
                            html += '</ul>';
                            html += '</div>';
                            /* 三级 END */
                        }
                    }

                    html += '</div>';
                    html += '</li>';
                    html += '</ul>';
                    html += '</div>';
                    /* 二级 END */
                }

            }

            html += '</div>';
            html += '</li>';

        } // end for First

        html += '</ul>';

        return html;
    };

    /**
     * Description: 创建没有树形结构的结果列表
     * @param data： 左边列表的数据
     */
    TreePanel.prototype.setNoTreeContentList = function (data) {
        var html = '',
            item = null,
            id   = '',
            name = '';

        html += '<ul class="tree-list js-tree-list js-search-data">';
        for(var i = 0,len = data.data.length; i < len; i ++) {
            item = data.data[i];
            id   = item.id;
            name = item.name;

            html += '<li class="list-item js-list-item">';
            html += '<div class="item-content js-item-content" data-id="' + id + '" data-name="' + name + '">';
            html += '<div class="second-content js-second-content">';
            html += '<span class="text">' + name + '</span>';
            html += '<div class="item-right">';
            html += '<div class="checkbox-wrap js-checkbox-wrap">';
            html += '<input type="checkbox">';
            html += '<label class="checkbox"><span class="glyphicon glyphicon-ok"></span></label>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</li>';
        }
        html += '</ul>';

        return html;
    }

    // 扩展到jQuery上
    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('bs.TreePanel'),
                options = option;

            $this.data('bs.TreePanel', new TreePanel(this, options));
        })
    }
    var old = $.fn.TreePanel;

    $.fn.TreePanel             = Plugin;
    $.fn.TreePanel.Constructor = TreePanel;

    $.fn.TreePanel.noConflict = function () {
        $.fn.TreePanel = old;
        return this;
    };

   /* $.fn.TreePanel = function (option) {
        var options = option;
        return new TreePanel(this, options)
    }*/

})(jQuery);

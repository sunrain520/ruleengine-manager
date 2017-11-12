


// 城市列表 查询
function searchCity(from)
{
    $('.city-list').blurSelect({
        multiSelect: true,
        resultID:'id',
        resultText:'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sview/Ajax/documentAjax?act=cityList&from='+from,
        },
        enterKeyFun: function ($dom) {
        	$('.js-search').click();
        }
    });
}

/*//点击场馆  下拉框
function searchVenue(){

    $('.venue-list').blurSelect({
        isLinkage: true, // 需要联动时使用
        multiSelect: true,
        resultID:'venue_id',
        resultText:'venue_name',
        ajax: {
            type: "POST",
            dataType: "json",
            url:'/Sview/Ajax/schdeuleAjax?action=venue' + cityIds,
        },
        enterKeyFun: function ($dom) {
            //$('.js-search').click();
        }
    });
}*/


//点击场馆  下拉框  详情页
function editSearchVenue(){
    //城市
    var cityArr = [];
    var cityIds = '';
    $(".city-list .selected-item,.city-list input[name='city_name']").each(function(){
        cityArr.push( $(this).attr('data-id') );
        $.each(cityArr, function (key, val) {
            cityIds += '&city_id[]='+val;
        });
    });
    $('.venue-list').blurSelect({
        isLinkage: true, // 需要联动时使用
        multiSelect: false,
        resultID:'venue_id',
        resultText:'venue_name',
        ajax: {
            type: "POST",
            dataType: "json",
            url:'/Sview/Ajax/schdeuleAjax?action=venue&update=1&' + cityIds,
        },
        enterKeyFun: function ($dom) {
            //$('.js-search').click();
        }
    });
}

//场馆类型 查询
function searchVenueType()
{
    $('.type_list').blurSelect({
        multiSelect: true,
        resultID:"venue_type_id",
        resultText:'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sapi/venue/venueTypeList'
        },
        enterKeyFun: function ($dom) {
        	$('.js-search').click();
            console.log('hello word',$dom)
        }
    });
}

//场馆类型 查询
function searchDocumentType(classifyV)
{
	
	if( classifyV )
	{
		var classify = classifyV;
	}
	else
	{
		var classify = 1;
	}
	
    $('.document-type-list').blurSelect({
        multiSelect: true,
        isShowNum:true,
        resultID:"document_config_id",
        resultText:'document_name',
        ajax: {
            type: 'GET',
            url: '/Sview/Ajax/documentAjax?act=documentTypeList&classify='+classify,
            dataType: 'json',
        },
        enterKeyFun: function ($dom) {
        	$('.js-search').click();
        }
    });
}

//适合剧种 查询
function searchSuit()
{
    $('.suit_list').blurSelect({
        multiSelect: true,
        resultID:'id',
        resultText:'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sapi/venue/venueSuitList'
        },
        enterKeyFun: function ($dom) {
        	$('.js-search').click();
            console.log('hello word',$dom)
        }
	 })
}

//选择page_size 显示数
function changePage()
{
	$(document).on("change",".js-pagesize",function(){
		$('form').append(getSubmitPageHtml(1));
		$('.js-search').click();
	});

}

//获取提分页html
function getSubmitPageHtml(page)
{
	if( page )
	{
		var pageNum = page;
	}
	else
	{
		var pageNum = 1
	}
	
	var str        = '',
	    page_size  = $(".js-pagesize").val();
	    
	str += '<input type="hidden" name="page" value="'+pageNum+'">';
	str += '<input type="hidden" name="page_size" value="'+page_size+'">';
	// 获取已经排序的item
    var item = $(document).find('.js-sorted');
    /*if(item){
        var id   = item.attr('data-id'),
            sort = item.attr('data-sort');
            id   = id == 1 ? 2 : 1;
        str += '<input type="hidden" name="'+sort+'" value="'+id+'"/>';
    }*/
    return str;
}

//分页js
function clickPage()
{
	
	$(document).on("click",".js-page",function(){
		var page = $(this).attr('data-id');
		$('form').append(getSubmitPageHtml(page));
		$('.js-search').click();
    });
}
 
//搜索 提交按钮
function submitSearch(actionUrl)
{
    $('.js-search').on('click',function() {
    	var str = '';
    	$('.city-list .js-select-list').children('.js-selected-item').each(function () {
    		str += '<input type="hidden" name="city_id[]" value="'+$(this).attr('data-id')+'">';
    		str += '<input type="hidden" name="city_name[]" value="'+$(this).text()+'">';
    	});
    	$('.type_list .js-select-list').children('.js-selected-item').each(function () {
    		str += '<input type="hidden" name="type[]" value="'+$(this).attr('data-id')+'">';
    		str += '<input type="hidden" name="type_name[]" value="'+$(this).text()+'">';
    	});
    	$('.suit_list .js-select-list').children('.js-selected-item').each(function () {
    		str += '<input type="hidden" name="suit[]" value="'+$(this).attr('data-id')+'">';
    		str += '<input type="hidden" name="suit_name[]" value="'+$(this).text()+'">';
    	});
        $('.document-type-list .js-select-list').children('.js-selected-item').each(function () {
            str += '<input type="hidden" name="document_config_id[]" value="'+$(this).attr('data-id')+'">';
            str += '<input type="hidden" name="document_name[]" value="'+$(this).text()+'">';
        });
        $('.company-list .js-select-list').children('.js-selected-item').each(function () {
            str += '<input type="hidden" name="department_id[]" value="'+$(this).attr('data-id')+'">';
            str += '<input type="hidden" name="department_name[]" value="'+$(this).text()+'">';
        });

        $('.project-type-list .js-select-list').children('.js-selected-item').each(function () {
            str += '<input type="hidden" name="project_type_id[]" value="'+$(this).attr('data-id')+'">';
            str += '<input type="hidden" name="project_type_name[]" value="'+$(this).text()+'">';
        });

    	$('form').append(str);
        $('form').attr('method','get');
        $('form').attr('action',submitSearch);
        $('form').submit();
     });  

}

// 清空搜索条件
function clearSearch()
{
    $('.js-clear').on('click',function(){
        $('form input').val('');
        $('form select').val('');
    });
}

//新增员工
function addStaff( addHtml )
{
	var addHtmlV = false;
	if( addHtml ) 
	{
		addHtmlV = true;
	}
    $('#js-role-add').on('click', function () {
        var $this         = $(this),
        	$selectedList = $('.js-selected-list'),
        	html          = '';

        $.ajax({
            type: "POST",
            url:'/Uapi/user/getDepAndStaffList',
            dataType: 'json',
            success: function (data) {

                $this.TreePanel({
                    isGroup: true,
                    maxSelectNum: 40,
                    data: data,
                    submitFun: function (selectedList) {

                        //是否需要添加一下html
                    	if( addHtmlV )
                    	{
                    		for(var i = 0, len = selectedList.length; i < len; i ++) {
                        		html  = '<input type="hidden" name="person_list[' + i + '][user_id]" value="' + selectedList[i].id + '">';
                        		html += '<input type="hidden" name="person_list[' + i + '][department_id]" value="' + selectedList[i].depId + '">';
                        		html += '<input type="hidden" name="person_list[' + i + '][department_name]" value="' + selectedList[i].depName + '">';
                        		html += '<input type="hidden" name="person_list[' + i + '][user_name]" value="' + selectedList[i].name + '">';

                                if(selectedList[i].id * 1 == 0 && selectedList[i].name == '') {
                                    $selectedList.find('.js-list-item[data-dep-id="' + selectedList[i].depId + '"]').append(html);
                                }
                                else {
                                    $selectedList.find('.js-list-item[data-id="' + selectedList[i].id + '"]').append(html);
                                }
                        	}
                    	}
                    }
                })
            }
        })
    })
}

//获得品类列表
function getTypeList( depid )
{
    var str = '';
    $.ajax({
        type : 'POST',
        url  : 'getTypeList?department_id='+depid,
        async: false,
        dataType : 'JSON',
        success : function(result){ 
            console.log(result);              
            str += '<option value="">选择品类</option>'
            if( result.code == '200' )
            {
                $.each(result.typeList , function(index , value){
                    str += '<option value="'+value.os_project_type_id+'">'+value.type_name+'</option>'
                });
            }    
        }
    });
    return str;
}


/* 多个文件打包下载
 *  downloadFileUrl 文件下载Url
 */
function getDownFileFromList( downloadFileUrl )
{
	$(".ajax-get-file").click(function(){
		var _this     = $(this),
		    documentId = _this.attr('data-document'),
		    classify   = _this.attr('data-classify'),
		    tmp        = {documentId:documentId,classify:classify};
		   
		    $.ajax({
  		 	    url:downloadFileUrl,
  	            type:'POST',
  	            dataType:'json',
  	            data:tmp,
  	            success:function(res)
  	            {
  	        	    if( res.ok )
  	        	    {
                    
  	        	    }
  	        	    else
  	        	    {
  	        		    layer.msg(res.msg);
                        return false;
  	        	    }
  	            }
  	        });  
	})
}

//修改状态
function changeStateFromList( changeUrl )
{
    $(".js-click-state").click(function(){
    	var _this = $(this);
    		state = _this.attr('data-state');
    		id    = _this.attr('data-id');
            title = _this.attr('data-title');

		if( state == 1 )
		{
			var changestate = 0;	
			_this.removeClass("icon-normal");
			_this.addClass("icon-hidden");
			
		}
		else
		{
			var changestate = 1;
			_this.removeClass("icon-hidden");
			_this.addClass("icon-normal");
		}
		var tmp = {notice_id:id,state:changestate,title:title};
		$.ajax({
 		 	 url:changeUrl,
 	         type:'POST',
 	         dataType:'json',
 	         data:tmp,
 	         success:function(res)
 	         {
 	        	 if( res.ok )
 	        	 {
 	        		_this.attr('data-state',changestate);
                     layer.msg('修改成功');
                 }
 	        	 else
 	        	 {
 	        		layer.msg('更新失败！'); 
 	        	 }
 	         }
 	     });
    })
}


//场馆类型 查询
function searchTicketMap()
{

    $('.js-get-tickeMap').blurSelect({
        multiSelect: true,
        resultID:"ticket_system_id",
        resultText:'system_name',
        ajax: {
            type: 'GET',
            url: '/Sview/Ajax/documentAjax?act=ticketsysList',
            dataType: 'json',
        },
        enterKeyFun: function ($dom) {
        	//$('.js-search').click();
            //console.log('hello word',$dom)
        }
    });
}



//品类
function department()
{
    $('select[name="department_id"]').on('change',function(){
        var departments = {};
        departments['department_id'] = $(this).val();
        $('input[name="department_name"]').val($(this).find('option:selected').text().trim());
        $.ajax({
            type:'get',
            data:{department_id:departments},
            dataType:'json',
            url:'/Sview/Ajax/projectAjax?action=showType',
            success:function(data)
            {
                if (data.code== 200)
                {
                    var html = '<option value="">选择品类</option>';
                    for(v in data.data)
                    {
                        html+='<option value="'+data.data[v].os_project_type_id+'">'+data.data[v].type_name+'</option>';
                    }

                    $('select[name="os_project_type_id"]').html(html);
                }
                else
                {
                    $('select[name="os_project_type_id"]').html('<option value="">选择品类</option>');
                }
            }
        });
    });

    //品类切换
    $('select[name="os_project_type_id"]').on('change',function(){
        $('input[name="type_name"]').val($(this).find('option:selected').text().trim());
    });
}

//供应商
function supplier()
{
    $('.supplier-list').blurSelect({
        multiSelect: false,
        resultID:"supplier_id",
        resultText:'supplier_name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sview/Ajax/projectAjax?action=supplier'
        },
        enterKeyFun: function ($dom) {
            var str = '';
            $('.supplier-list .js-select-list').children('.js-selected-item').each(function () {
                str += '<input type="hidden" name="supplier_id[]" value="'+$(this).attr('data-id')+'">';
                str += '<input type="hidden" name="supplier_name[]" value="'+$(this).text()+'">';
            });
            $('form').append(str);
            $('form').attr('method','get');
            $('form').attr('action','/Sview/Ajax/projectAjax?action=supplier');
            $('form').submit();
        }
    });

    //供应商
    $(document).on('click','.supplier-list',function(){
        var _this = $(this);
        var dataId = $(this).find('input[name="supplier_name"]').attr('data-id');
        if(typeof(dataId) != 'undefined'){
            _this.find('input[name="supplier_id"]').val(dataId);
        }
    });
}

//明星
function star()
{
    $('.star-list').blurSelect({
        multiSelect: true,
        isShowNum:true,
        resultID:"id",
        resultText:'star_name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sview/Ajax/projectAjax?action=star'
        },
        enterKeyFun: function ($dom) {
            var str = '';
            $('.star-list .js-select-list').children('.js-selected-item').each(function () {
                str += '<input type="hidden" name="star[]" value="'+$(this).attr('data-id')+'">';
                str += '<input type="hidden" name="starname[]" value="'+$(this).text()+'">';
            });
            $('form').append(str);
            $('form').attr('method','get');
            $('form').attr('action','/Sview/Ajax/projectAjax?action=star');
            $('form').submit();
        }
    });

    $(document).on('keyup','.star-list',function(){
        var _this = $(this);
        var parent = _this.parent();
         var len = parent.find('.list-block li').length;
        if(parseInt(len) == 0){
            $(".star-info").find('.w-info').addClass('Validform_error');
            $(".star-info").find('.star-list').addClass('Validform_error');
            $('.star-info').find('.checked-tip').html('').append('<span class="Validform_checktip Validform_wrong">该明星名称不存在</span>');
        }else{
            $(".star-info").find('.w-info').removeClass('Validform_error');
            $(".star-info").find('.star-list').removeClass('Validform_error');
            $('.star-info').find('.checked-tip').html('');
        }

    });
    $(document).on('click','.star-list',function(){
        var _this = $(this);
        var str = '';
        _this.find('.js-select-list').children('.js-selected-item').each(function () {
            str += '<input type="hidden" name="star[]" value="'+$(this).attr('data-id')+'">';
            str += '<input type="hidden" name="starname[]" value="'+$(this).text()+'">';
        });
        if(str){
            $(".star-info").find('.w-info').removeClass('Validform_error');
            $(".star-info").find('.star-list').removeClass('Validform_error');
            $('.star-info').find('.checked-tip').html('');
        }
        $('div.star').html(str);
    });
}

//国家
function country()
{
    $('.country-list').blurSelect({
        multiSelect: true,
        isShowNum:true,
        resultID:"country_id",
        resultText:'country_name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: '/Sview/Ajax/projectAjax?action=country'
        },
        enterKeyFun: function ($dom) {
            var str = '';
            $('.country-list .js-select-list').children('.js-selected-item').each(function () {
                str += '<input type="hidden" name="country_id[]" value="'+$(this).attr('data-id')+'">';
                str += '<input type="hidden" name="country_name[]" value="'+$(this).text()+'">';
            });
            $('form').append(str);
            $('form').attr('method','get');
            $('form').attr('action','/Sview/Ajax/projectAjax?action=country');
            $('form').submit();
        }
    });

    $(document).on('click','.country-list',function(){
        var _this = $(this);
        var str = '';
        _this.find('.js-select-list').children('.js-selected-item').each(function () {
            str += '<input type="hidden" name="country_id[]" value="'+$(this).attr('data-id')+'">';
            str += '<input type="hidden" name="country_name[]" value="'+$(this).text()+'">';
        });

        $('div.country').html(str);
    });
}


//明星
function starInfo(){
    $('div.star').html('');
    var star = $('.star-list .js-select-list');
    var str = '';
    $.each(star.find('.js-selected-item'),function(key,val){
        var starVal = $(val).attr('data-id');
        if(parseInt(starVal)){
            str += '<input type="hidden" name="star[]" value="'+starVal+'">';
            str += '<input type="hidden" name="starname[]" value="'+$(val).text()+'">';
        }
    });

    $('div.star').html(str);
}




// 添加员工树形
function staffMultiTree( pickerClass , parentClass){
	
    $(parentClass).on('click',pickerClass,function(){
        var $this = $(this);
        $.ajax({
            type: "POST",
            url: '/Uapi/user/getDepAndStaffList',
            dataType: 'json',
            success: function (data) {
                layer.closeAll('loading');
                if ( data !== null && data.hasOwnProperty('code') && data.code == 200 ) {
                    //创建树形
                    $this.TreePanel({
                        isGroup: true,
                        maxSelectNum: 40,
                        //originalData: [{id: '111',name:'jj'},{id: '111',name:'jj'}], // 编辑时候如果有数据需要初始化
                        data: data,
                        submitFun: function (selectedList) {
                            $.each(selectedList,function(i) {
                                // TODO
                            })
                        }
                    })
                } else {
                    layer.msg('网络出错或数据空');
                }  
            },
            beforeSend: function() {
                layer.load();
            }
        })
    });
}
// 添加城市树形
function cityMultiTree( pickerClass , parentClass ){
	if(parentClass == ''){
		parentClass= 'body' ;
	}
    $(parentClass).on('click',pickerClass,function(){
        var $this = $(this);
        $.ajax({
            type: "GET",
            url:'/Sview/Ajax/schdeuleAjax?action=city&keyword=',
            dataType: 'json',
            success: function (data) {
                layer.closeAll('loading');
                if ( data !== null && data.hasOwnProperty('code') && data.code == 200 ) {
                    //创建树形
                    $this.TreePanel({
                        isNoTree: true,
                        //originalData: [{id: '111',name:'jj'},{id: '111',name:'jj'}], // 编辑时候如果有数据需要初始化
                        data: data,
                        submitFun: function (selectedList) {
                            $.each(selectedList,function(i) {
                                // TODO
                            })
                        }
                    })
                } else {
                    layer.msg('网络出错或数据空');
                }  
            },
            beforeSend: function() {
                layer.load();
            }
        })
    });
}
// 添加品类树形
function typeMultiTree( pickerClass , parentClass ){
	if(parentClass == ''){
		parentClass= 'body' ;
	}
    $(parentClass).on('click',pickerClass,function(){
        var $this = $(this);
        $.ajax({
            type: "GET",
            url:'/Sview/Ajax/noticeAjax?action=type',
            dataType: 'json',
            success: function (data) {
                layer.closeAll('loading');
                if ( data !== null && data.hasOwnProperty('code') && data.code == 200 ) {
                    //创建树形
                    $this.TreePanel({
                        isNoTree: true,
                        //originalData: [{id: '111',name:'jj'},{id: '111',name:'jj'}], // 编辑时候如果有数据需要初始化
                        data: data,
                        submitFun: function (selectedList) {
                            $.each(selectedList,function(i) {
                                // TODO
                            })
                        }
                    })
                } else {
                    layer.msg('网络出错或数据空');
                }
            },
            beforeSend: function() {
                layer.load();
            }
        })
    });
}

/*城市场馆联动 START*/

// 场馆第二级单独查询 多选
function searchVenueMulti( className , option )
{
    /* 可接受参数
    keyword      string
    venue_id     set
    city_id      array
    venue_name   string
    upadte       为1时 只查 state=1 正常
    self_support 为1时 只查 self_support=1 自营
     */
    // 未被设置Url
    if( ! $(className).find('.js-blur-input').attr('data-url') ){
        var url = '/Sview/Ajax/commonAjax?action=venue';
        if (typeof option != 'object') {
            option = {};
        }
        if(option.update){
            url += '&update=1';
        }
        if(option.self_support){
            url += '&self_support=1';
        }
        if(option.from){
            url += '&from='+option.from;
        }
        $(className).find('.js-blur-input').attr('data-url', url);
    }

    $(className).blurSelect({
        isLinkage: true,
        multiSelect: true,
        resultID:'venue_id',
        resultText:'venue_name',
        ajax: {
            type: "GET",
            dataType: "json",
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        }
    });
}

/*
 * 城市和场馆二级 多选模糊联动
 * 同时使用 searchVenueMulti
 * cityClassName    城市选择器
 * venueClassName   场馆选择器
 * option           配置
 */
function searchCityAndVenueMulti( cityClassName , venueClassName , option )
{
    var cityUrl = '/Sview/Ajax/commonAjax?action=city';
    if (typeof option != 'object') {
        option = {};
    }
    if (option.update) {
        cityUrl += '&update=1';
    }
    if (option.from) {
        cityUrl += '&from=' + option.from;
    }

    $(cityClassName).blurSelect({
        multiSelect: true,
        isShowNum:true,
        resultID:'id',
        resultText:'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: cityUrl,
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        selectedItemFun: function ($item,$selectedList) {
            var cityParams = '';
            $.each($selectedList, function (key, val) {
                cityParams += '&city_id[]='+$(val).attr('data-id');
            });
            var venueUrl = '/Sview/Ajax/commonAjax?action=venue'+cityParams;
            if(option.update){
                venueUrl += '&update=1';
            }
            $(venueClassName).find('.js-blur-input').attr('data-url', venueUrl);
        },
        itemDeletedFun: function($item,$selectedList) {
            var cityParams = '';
            $.each($selectedList, function (key, val) {
                cityParams += '&city_id[]='+$(val).attr('data-id');
            });
            var venueUrl = '/Sview/Ajax/commonAjax?action=venue'+cityParams;
            if(option.update){
                venueUrl += '&update=1';
            }
            $(venueClassName).find('.js-blur-input').attr('data-url', venueUrl);
        }
    });

    //刷新后重设场馆city_id参数 联动初始化 
    var cityParams = '';
    $(cityClassName).find('.js-selected-item').each(function(){
        cityParams += '&city_id[]='+$(this).attr('data-id')
    })
    var venueUrl = '/Sview/Ajax/commonAjax?action=venue'+cityParams;
    if(option.update){
        venueUrl += '&update=1';
    }
    $(venueClassName).find('.js-blur-input').attr('data-url', venueUrl);
}

// 场馆第二级单独查询 【单选】
function searchVenueSingle( className , option )
{
    /* 可接受参数
    keyword      string
    venue_id     set
    city_id      array
    venue_name   string
    upadte       为1时 只查 state=1 正常
    self_support 为1时 只查 self_support=1 自营
     */
    // 未被设置Url
    if( ! $(className).find('.js-blur-input').attr('data-url') ){
        var url = '/Sview/Ajax/commonAjax?action=venue';
        if (typeof option != 'object') {
            option = {};
        }
        if (option.update) {
            url += '&update=1';
        }
        if (option.self_support) {
            url += '&self_support=1';
        }
        if (option.from) {
            url += '&from=' + option.from;
        }

        $(className).find('.js-blur-input').attr('data-url', url);
    }

    $(className).blurSelect({
        isLinkage  : true,
        isNull     : false,
        multiSelect: false,
        resultID   : 'venue_id',
        resultText : 'venue_name',
        ajax: {
            type: "GET",
            dataType: "json",
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        keyUpFun: function($dom){
            if($dom.val() == ''){
                //场馆重新初始化
                $(className).find('.js-blur-input').attr({'data-id':'','data-name':''}).val('');
                
                //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
                $('input[name="venue_id"]').val('');
            }
        }
    });
}

/*
 * 城市和场馆二级 【单选】模糊联动
 * 同时使用 searchVenueSingle
 * cityClassName    城市选择器
 * venueClassName   场馆选择器
 * option           配置
 */
function searchCityAndVenueSingle( cityClassName , venueClassName , option )
{
    $(cityClassName).find('.js-blur-input').attr('autocomplete','off')
    $(venueClassName).find('.js-blur-input').attr('autocomplete','off')

    var cityUrl = '/Sview/Ajax/commonAjax?action=city';
    if (typeof option != 'object') {
        option = {};
    }
    if (option.update) {
        cityUrl += '&update=1';
    }
    if (option.from) {
        cityUrl += '&from=' + option.from;
    }
    

    //场馆初始URL 不要改写
    var venueInitUrl = '/Sview/Ajax/commonAjax?action=venue';
    if (option.update) {
        venueInitUrl += '&update=1';
    }
    if (option.from) {
        venueInitUrl += '&from=' + option.from;
    }

    $(cityClassName).blurSelect({
        multiSelect: false,
        isNull: false,
        resultID:'id',
        resultText:'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: cityUrl,
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        selectedItemFun: function ($item) {
            var city_id = $item.attr('data-id');
            var venueUrl = venueInitUrl;
            if(city_id > 0){
                venueUrl = venueInitUrl+'&city_id[]='+city_id;
            }
            $(venueClassName).find('.js-blur-input').attr({
                'data-url':venueUrl,
                'data-id':'',
                'data-name':''
            }).val('');

            //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
            $('input[name="city_id"]').val(city_id);
            $('input[name="venue_id"]').val('');
        },
        keyUpFun: function($dom){
            if($dom.val() == ''){
                //城市 场馆重新初始化
                $(cityClassName).find('.js-blur-input').attr({'data-id':'','data-name':''}).val('');
                $(venueClassName).find('.js-blur-input').attr({
                    'data-url':venueInitUrl,
                    'data-id':'',
                    'data-name':''
                }).val('');

                //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
                $('input[name="city_id"],input[name="venue_id"]').val('');
            }
        }
    });

    //刷新后重设场馆city_id参数 联动初始化 
    //单选城市格式 请另用 <input type="hidden" name="city_id"> 来储存city_id 刷新后重新赋值
    /*<input type="text" class="form-control form-list js-blur-input" data-id="1" value="" placeholder="选择城市" data-name="深圳">*/

    var venueUrl = venueInitUrl;
    //页面刷新后 至少要有其一赋值
    if( $(cityClassName).find('.js-blur-input').attr('data-id')>0 ){
        venueUrl = venueInitUrl+'&city_id[]='+$(cityClassName).find('.js-blur-input').attr('data-id');
    } else if ( $('input[name="city_id"]').val()>0 ){
        venueUrl = venueInitUrl+'&city_id[]='+$('input[name="city_id"]').val();
    }
    $(venueClassName).find('.js-blur-input').attr('data-url', venueUrl);
}
        
/*城市场馆联动 END*/


/*事业部+品类联动 START*/

// 品类第二级单独查询 【多选】
function searchProjectType( className , option )
{
    // 未被设置Url
    if( ! $(className).find('.js-blur-input').attr('data-url') ){
        var url = '/Sview/Ajax/projectAjax?action=showType';
        if (typeof option != 'object') {
            option = {};
        }
        if(option.update){
            url += '&update=1';
        }
        if(option.from){
            url += '&from='+option.from;
        }
        $(className).find('.js-blur-input').attr('data-url', url);
    }

    $(className).blurSelect({
        isLinkage   : true,
        multiSelect : true,
        resultID    : 'os_project_type_id',
        resultText  : 'type_name',
        ajax: {
            type: "GET",
            dataType: "json",
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        }
    });
}

/*
 * 事业部/子公司和品类二级 模糊联动 【多选】
 * companyClassName 事业部/子公司选择器
 * typeClassName    品类选择器
 */
function searchCompanyAndType( companyClassName , typeClassName , option )
{
    // 事业部Url
    var companyUrl = '/Sview/Ajax/projectAjax?action=department';
    if (typeof option != 'object') {
        option = {};
    }
    if (option.update) {
        companyUrl += '&update=1';
    }
    if (option.from) {
        companyUrl += '&from=' + option.from;
    }
    $(companyClassName).blurSelect({
        multiSelect : true,
        isShowNum   : true,
        resultID    : 'id',
        resultText  : 'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: companyUrl
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        selectedItemFun: function ($item,$selectedList) {
            var typeParams = '';
            $.each($selectedList, function (key, val) {
                typeParams += '&department_id[]='+$(val).attr('data-id');
            });
            // 品类请求地址 url
            var typeUrl = '/Sview/Ajax/projectAjax?action=showType' + typeParams;
            if(option.update){
                typeUrl += '&update=1';
            }
            $(typeClassName).find('.js-blur-input').attr('data-url', typeUrl);
        },
        itemDeletedFun: function($item,$selectedList) {
            var typeParams = '';
            $.each($selectedList, function (key, val) {
                typeParams += '&department_id[]='+$(val).attr('data-id');
            });
            // 品类请求地址 url
            var typeUrl = '/Sview/Ajax/projectAjax?action=showType' + typeParams;
            if(option.update){
                typeUrl += '&update=1';
            }
            $(typeClassName).find('.js-blur-input').attr('data-url', typeUrl);
        }
    });
    
    //刷新后重设品类 department_id 参数 联动初始化 
    var typeParams = '';
    $(companyClassName).find('.js-selected-item').each(function(){
        typeParams += '&department_id[]='+$(val).attr('data-id');
    })
    var typeUrl = '/Sview/Ajax/projectAjax?action=showType' + typeParams;
    if(option.update){
        typeUrl += '&update=1';
    }
    $(typeClassName).find('.js-blur-input').attr('data-url', typeUrl);
}

/*
 * 事业部和品类二级 【单选】模糊联动
 * 同时使用 searchTypeSingle
 * departmentClassName  事业部选择器
 * typeClassName        品类选择器
 * option               配置
 */
function searchCompanyAndTypeSingle( departmentClassName , typeClassName , option )
{
    $(departmentClassName).find('.js-blur-input').attr('autocomplete','off')
    $(typeClassName).find('.js-blur-input').attr('autocomplete','off')

    var departmentUrl = '/Sview/Ajax/projectAjax?action=department';
    if (typeof option != 'object') {
        option = {};
    }
    if (option.update) {
        departmentUrl += '&update=1';
    }
    if (option.from) {
        departmentUrl += '&from=' + option.from;
    }

    //默认的 表单内 品类ID隐藏域
    var typeIdInputName = 'type_id';
    if (option.type_id_name) {
        typeIdInputName = option.type_id_name;
    }
    
    //品类初始URL 不要改写
    var typeInitUrl = '/Sview/Ajax/projectAjax?action=showType';
    if (option.update) {
        typeInitUrl += '&update=1';
    }
    if (option.from) {
        typeInitUrl += '&from=' + option.from;
    }

    $(departmentClassName).blurSelect({
        multiSelect : false,
        isNull      : false,
        resultID    : 'id',
        resultText  : 'name',
        ajax: {
            type: "GET",
            dataType: "json",
            url: departmentUrl,
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        selectedItemFun: function ($item) {
            var department_id = $item.attr('data-id');
            var typeUrl = typeInitUrl;
            if(department_id > 0){
                typeUrl = typeInitUrl+'&department_id[]='+department_id;
            }
            $(typeClassName).find('.js-blur-input').attr({
                'data-url':typeUrl,
                'data-id' :'',
                'data-name':''
            }).val('');

            //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
            $('input[name="department_id"]').val(department_id);
            $('input[name="'+typeIdInputName+'"]').val('');
        },
        keyUpFun: function($dom){
            if($dom.val() == ''){
                //城市 场馆重新初始化
                $(departmentClassName).find('.js-blur-input').attr({'data-id':'','data-name':''}).val('');
                $(typeClassName).find('.js-blur-input').attr({
                    'data-url':typeInitUrl,
                    'data-id' :'',
                    'data-name':''
                }).val('');

                //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
                $('input[name="department_id"],input[name="'+typeIdInputName+'"]').val('');
            }
        }
    });

    //刷新后重设品类department_id参数 联动初始化 
    //单选事业部格式 请另用 <input type="hidden" name="department_id"> 来储存department_id 刷新后重新赋值
    /*<input type="text" class="form-control form-list js-blur-input" data-id="1" value="" placeholder="选择事业部" data-name="聚橙网">*/

    var typeUrl = typeInitUrl;
    //页面刷新后 至少要有其一赋值
    if( $(departmentClassName).find('.js-blur-input').attr('data-id')>0 ){
        typeUrl = typeInitUrl+'&department_id[]='+$(departmentClassName).find('.js-blur-input').attr('data-id');
    } else if ( $('input[name="department_id"]').val()>0 ){
        typeUrl = typeInitUrl+'&department_id[]='+$('input[name="department_id"]').val();
    }
    $(typeClassName).find('.js-blur-input').attr('data-url', typeUrl);
}

// 品类第二级单独查询 【单选】
function searchTypeSingle( className , option )
{
    //默认的 表单内 品类ID隐藏域
    var typeIdInputName = 'type_id';
    
    // 未被设置Url
    if( ! $(className).find('.js-blur-input').attr('data-url') ){
        var url = '/Sview/Ajax/projectAjax?action=showType';
        if (typeof option != 'object') {
            option = {};
        }
        if (option.update) {
            url += '&update=1';
        }
        if (option.from) {
            url += '&from=' + option.from;
        }
        if (option.type_id_name) {
            typeIdInputName = option.type_id_name;
        }

        $(className).find('.js-blur-input').attr('data-url', url);
    }

    $(className).blurSelect({
        isLinkage  : true,
        isNull     : false,
        multiSelect: false,
        resultID   : 'os_project_type_id',
        resultText : 'type_name',
        ajax: {
            type: "GET",
            dataType: "json",
        },
        enterKeyFun: function ($dom) {
            $('.js-search').click();
        },
        keyUpFun: function($dom){
            if($dom.val() == ''){
                //场馆重新初始化
                $(className).find('.js-blur-input').attr({'data-id':'','data-name':''}).val('');
                
                //TODO 帮助页面form表单 同名隐藏域 赋值，也可自行处理
                $('input[name="'+typeIdInputName+'"]').val('');
            }
        }
    });
}


/*事业部+品类联动 END*/

var choose = function(name,value){
    var ads = document.getElementsByName(name);
    var ad = value;
    for(var i = 0;i < ads.length; i++){
        if(ads[i].value == ad){
            ads[i].setAttribute('checked','true');
        }
    }
}

var checkEmail = function(Email){
	var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
	if(!(pattern.test(Email))){  
        return false; 
    } 
	else
	{
		return true; 	
	}
}

var checkMobile = function(phone){
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){  
        return false; 
    } 
	else
	{
		return true; 	
	}
}

//获取多选框第一个选中的值
var checkUserId = function(){
	var checkeds = $('input:checkbox[name="checkbox"][checked="checked"]').val();
	return checkeds;
}

//获取多选框选中值
var getCheckBoxVal = function(name){
	var idStr = '';
	$('input:checkbox[name="checkbox"]').each(function(){
		 if ($(this).attr("checked") == "checked") {	
    		idStr = idStr + $(this).val() + ',';
    	}
	})
    return idStr;
}

var  isEmpty = function(value){
	if(value=='' || typeof(value)=='undefined' || value == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//判断身份证方法
var checkSfz = function (sfzh){  
    if(!sfzh || !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/i.test(sfzh)){          
    	 return false;
    }else{
    	return true;
    }
}

//判断qq
var isQQ = function (qq){      
   if(!(/^\d{5,12}$/.test(qq))){  
	   return false;  
   }else{  
	   return true;
   }

}

function uploadProgress(data)
{
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('#cover_upload_progress .bar').css(
        'width',
        progress + '%'
    );
    $('#cover_upload_progress .bar span').text(progress+ '%');
}

function uploadAdd(data)
{
    $('#cover_upload_progress').show();
    $('#cover_upload_progress .tip').text('');
    data.submit();
    uploading = 1;
}

function uploadDone(data,type)
{
    uploading = 0;
    if(data.code=="200")
    {   
        $('#cover_upload_progress .bar span').text("上传成功");
        $('#cover_upload_progress').fadeOut('normal',function(){
            $('#cover_upload_progress .bar').css('width','0%');
            $('#cover_upload_progress .bar span').text('0%');
        });        
        var path = data.data[0].savepath+data.data[0].savename;//绝对路径
        var relativepath = data.data[0].savename; //相对路径
        $(".is-show").show();
        switch(type)
        {
            case 'pic':
                $('#pic_file_input').parent().prev().val(relativepath);
                $('#preview_pic').attr('src',path);
                $('#picture').val(relativepath);
            break;
            
            case 'papers_images':
                $('#papers_file_input').parent().prev().val(relativepath);
                $('#papers_images').attr('src',path);
                $('#papers_imagess').val(relativepath);
            break;
            
            case 'face_pic':
                $('#face_file_input').parent().prev().val(relativepath);
                $('#face_pic').attr('src',path);
                $('#face').val(relativepath);
            break;

        }
    }
    else
    {
        $('#cover_upload_progress .tip').text("上传失败："+data.error_msg);
    }
}

/*var fileUpload = function(idName,action){
	 var _id  = idName;
	 var _act = action;
	 $(_id).fileupload({
        url:uploadUrl,
        type:'POST',
        dataType: 'json',
        autoUpload: true,
        formData: {type: 'show'},
        add: function (e, data) {
            if (uploading==1)
            {
                layer.alert('正在上传中，请稍候。。。', {title: '提示'});
                return false;
            }
            uploadAdd(data);
        },
        done: function (e, data) {
            uploadDone(data.result,_act);
        },
        progressall: function (e, data) {
            uploadProgress(data);            
        },
        fail:function(e, data)
        {
            uploading = 0;
            $('#cover_upload_progress .tip').text("上传失败： "+data.errorThrown);
        }
    });
}

var showError = function(obj)
{
	obj.parent().find('i').show();
	obj.parent().find('strong').show();
 }*/



function checkBox(name,allName){
	$("[name='"+name+"']").each(function(){
		if($("#"+allName).prop("checked")){
			$(this).prop("checked",true);
			$(this).attr("checked",'true');
		}
		else
		{
			$(this).prop("checked",false);
			$(this).removeAttr("checked");
		}
	});
}

function checkAllBox(name,allName){
	var k=0;
	$("[name='"+name+"']").each(function(){
		if($(this).prop("checked")){
			k++;
		}
	});
	if(k < $("[name='"+name+"']").length){
		
		$("#"+allName).prop("checked",false);
		$("#"+allName).attr("checked",false);
	}else{
		$("#"+allName).prop("checked",true);
		$("#"+allName).attr("checked",true);
	}
}

function getAllCheckboxValue(name)
{
	var str = "";
	$("[name='"+name+"']").each(function(){
		
		if($(this).prop("checked")){
			str += $(this).val() + ",";
		}
	});
	return str;
}

//显示错误信息
function showMeages(msg)
{
	if(msg)
	{
		$(".error").show();
		$(".msg-span").html(msg);
	}else{
		$(".error").hide();
		$(".msg-span").html(' ');
	}

}

//时间插件 及参数配置
function publicLayDate(idName,time,format)
{
	var paramsName = 'time'; 
	var idNameStr  = ''; 
	
	if( idName )
	{
		var idNametr = '#'+ idName;
		var paramsName = idName;
	}
	else
	{
		var idNametr = '#time';
	}
	
	if( format )
	{
		var format = format;
	}
	else
	{
		var format = 'YYYY-MM-DD hh:mm';
	}
	
	if( time ) 
	{
		var mintime = time;
	}
	else
	{
		var mintime = laydate.now();
	}
	
	paramsName = {
	  elem: idNametr,
	  format: format,
	  min: mintime, //设定最小日期为当前日期
	  max: '2099-06-16 23:59:59', //最大日期
	  istime: true,
	  istoday: false,
	  choose: function(datas){
		  
	  }
	};
	laydate(paramsName);
}

//取消按钮
function cancelPrompt()
{
    $('.js-cancel').on('click',function(){
        layer.confirm('页面内容还未保存，确定要关闭该页吗？',
                {btn:['确定','取消'],title:'提示'},
                function(){
                    parent.closeActiveTab();
                    parent.layer.closeAll();
                },
                function(){
                	layer.closeAll();
                }
        );
    });
} 

//删除 Tree 已选的item
function delTreeSelectItem (callback)
{
    $('body').on('click', '.js-selected-wrap .js-list-item .glyphicon-remove', function () {
        var $this     = $(this),
            $listItem = $this.closest('.js-list-item');

        callback && callback($this);

        $listItem.remove();
    })
}

//错误显示
function showError(obj)
{
	obj.removeClass('Validform_error');
	obj.addClass('Validform_error');        	
}

//获取光标位置
function getCursorPosition( obj )
{
	var el  = obj.get(0),
     	pos = 0;
    if ('selectionStart' in el ) 
    {
        pos = el.selectionStart;
    } 
    else if ('selection' in document) 
    {
        el.focus();
        var Sel       = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    return pos;
}

//内容
function contentReplace( content , curPos , addCon )
{
	var conlen    = content.length,				          //内容长度
	    conBefore = content.substring( 0 , curPos ),      //前半部分内容
	    conAfter  = content.substring( curPos , conlen ), //后半部分内容
		    
	//合成后的内容
	content = conBefore + addCon + conAfter;
		
	return content;
}

//处理添加的内容
function handleAddCon( addCon , replaceStr )
{
	if( addCon )
	{
		return replaceStr.replace('variableName',addCon);
	}
	return '';
}

//替换内容
function replaceContent( conobj )
{
	if( isEmpty( conObj ))
	{
		var conObj  = $("#content");
	}
	$(".js-add-variable").click(function(){
    	var _this   = $(this),
  	        html    = handleAddCon( _this.html() , replaceName ),     //添加的内容
    	    curPos  = getCursorPosition( conObj ),	  				  //光标位置
    	    con     = contentReplace( conObj.val() , curPos , html ); //处理后的内容
    	conObj.val(con);
    })
}

// 删除附件
function deleteFile()
{
    $('.js-uploader-wrap').on('click', '.js-del-uploadfile', function () {
        var $listItem = $(this).closest('.js-success-item');
            $listItem.remove();
    });
}

//点击确认按钮
function lookSure()
{
    console.log('asdfasdf');
	var index = parent.layer.getFrameIndex(window.name);
        $( '.js-sure' ).click( function () {
            parent.layer.close( index );
        });
}

//获取OA表单中多个文件信息
function fileListInfo($object)
{
    var fileList = [];
    if( typeof $object == 'object' )
    {
        $object.find('.js-success-item').each(function () {
            var $item   = $(this),
                itemObj = new Object();
            
            itemObj.path      = $item.find('[name*="path"]').val();
            itemObj.title     = $item.find('[name*="title"]').val();
            itemObj.extension = $item.find('[name*="extension"]').val();
            itemObj.size      = $item.find('[name*="size"]').val();
            
            fileList.push(itemObj);
            
            delete itemObj;
        });
    }
    return fileList;
}

//金额格式化
function fmoney(totalPrice, num)   
{   
   num = num > 0 && num <= 20 ? num : 2;   
   totalPrice = parseFloat((totalPrice + "").replace(/[^\d\.-]/g, "")).toFixed(num) + "";   
   var l = totalPrice.split(".")[0].split("").reverse(),   
   r = totalPrice.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
}

//场馆,演出时间 冲突
function promptMessage(result)
{
    var url = "/Sview/Schedule/detail?schedule_id="+result.msg[0];
    var html = '<div>跟';
    html+= '<a href="javascript:;" onclick="scheduleDetail($(this))" data-url="'+url+'" data-text="排期详情">';
    html+= result.msg[1]+'</a>';
    html+= '的场馆和演出时间冲突,请修改场馆或者演出时间后再提交。</div>' ;

    layer.open({
        title: '提示',
        content: html,
        area: ['300px', '200px'],
        btn: ['<div style="align-content: center;">确定</div>'],
    });
}


//场馆 演出时间 冲突 链接
function scheduleDetail($this)
{
    //跳转到排期详情
    var _this = $this,
        url   = _this.attr('data-url'),
        name  = _this.attr('data-text');
    $activeTab = $(window.top.document.body).find('.js-tab-list .js-tab-item.active');
    window.top.newTab(_this, url , name);
//    window.top.closeActiveTabCommon($activeTab);
}

//单个下拉共用
function  singleDrop(singleClassName, id, name, ajaxUrl)
{
	$(singleClassName).blurSelect({
		multiSelect: true,
		resultID:id,
		resultText:name,
		ajax: {
			type: "GET",
			dataType: "json",
			url: ajaxUrl
		},
		enterKeyFun: function ($dom) {
			$('.js-search').click();
		}
	});
}




//下拉单选(日历专用)
function singleSelectDrop(singleClassName, id, name, ajaxUrl, type,schCalendarUrl) {
	$(singleClassName).blurSelect({
		multiSelect: false,
		resultID:id,
		resultText:name,
		ajax: {
			type: "GET",
			dataType: "json",
			url: ajaxUrl
		},
		enterKeyFun: function ($dom) {

		},

		selectedItemFun: function ($item) {
			var dataId = $item.attr('data-id');
			var dataName = $item.attr('data-name');
			$('input[name="item_id"]').val(dataId);
			$('input[name="item_name"]').val(dataName);
			$('form').attr('method','get');
			$('form').attr('action',schCalendarUrl);
			$('form').submit();
		}

	});
}


//分页
function pageShow()
{
	//分页js
	$(document).on("click",".js-page",function(){
		var str = '',
			page_size = $(".js-pagesize").val();
		str += '<input type="hidden" name="page" value="'+$(this).attr('data-id')+'">';
		str += '<input type="hidden" name="page_size" value="'+page_size+'">';
		// 获取已经排序的item
		var item = $(document).find('.js-sorted');
		if(item.length){
			var id   = item.attr('data-id'),
				sort = item.attr('data-sort');
			id   = id == 1 ? 2 : 1;
			str += '<input type="hidden" name="'+sort+'" value="'+id+'"/>';
		}
		$('form').append(str);
		$('.js-search').click();
	});

	//选择page_size
	$(document).on("change",".js-pagesize",function(){
		var str = '',
			page_size = $(".js-pagesize").val();
		str += '<input type="hidden" name="page" value="1">';
		str += '<input type="hidden" name="page_size" value="'+page_size+'">';
		// 获取已经排序的item
		var item = $(document).find('.js-sorted');
		if(item){
			var id   = item.attr('data-id'),
				sort = item.attr('data-sort');
			id   = id == 1 ? 2 : 1;
			str += '<input type="hidden" name="'+sort+'" value="'+id+'"/>';
		}
		$('form').append(str);
		$('.js-search').click();
	});
}

//排序
function sortEvent(sortClassName)
{
	// 排序
	$(sortClassName).on('click',function(){
		var $this = $(this),
			item = $this.find('.js-sort'),
			id = item.attr('data-id'),
			sort = item.attr('data-sort');
		var str = '<input type="hidden" name="'+sort+'" value="'+id+'"/>';

		page_size = $(".js-pagesize").val();
		str += '<input type="hidden" name="page" value="1">';
		str += '<input type="hidden" name="page_size" value="'+page_size+'">';

		$('form').append(str);
		$('.js-search').click();
	});
}
/*---------------------文件上传-------------------*/
/**
 * 
 * @param options 
 * options = {
 * 	count: 0,   //上传文件起始序号
 * 	listWrapClass: listWrapClass,   // listWrapClass = '#uploader-wrap'   // 上传文件列表wrap 的jQuery选择器
 *  pickerClass: '#picker',         // 上传按钮 的jQuery选择器
 *  isMultiUpload：isMultiUpload,    // 多块上传状态位，多块上传需指定 listWrapClass 、pickerClass 、multiWrapClass 注意此时不能使用ID选择器
 *  multiWrapClass： multiWrapClass, // multiWrapClass = '.js-add-item'  上传文件列表和按钮的父级 的jQuery选择器
 * 	$btn : $btn,  // $btn  = $('#ctlBtn')
 *  base_img_url: '', //文件服务器域名，填了则上传成功后生成完整文件链接
 *          
 * }
 * 或者 options = count = number;
 */
function publicUpload(options,successCallback)
{
	var successFun  = successCallback || function () {};

    var count       = 0,
        listWrapClass = '#uploader-wrap',
        $btn        = $('#ctlBtn'), 
        pickerClass = '#picker',
        isMultiUpload = false,
        multiWrapClass = '.js-add-item',
        base_img_url = '';	
	if(typeof options == 'string' || typeof options == 'number') 
	{
		count   = options * 1;
	}
	else if (typeof options == 'object')
	{
        count       = options.count       || 0;
        listWrapClass = options.listWrapClass || $('#uploader-wrap');
        pickerClass = options.pickerClass || '#picker';
        isMultiUpload = options.isMultiUpload || false;
        multiWrapClass = options.multiWrapClass || '.js-add-item';
        $btn        = options.$btn        || $('#ctlBtn');
        base_img_url = options.base_img_url || '';
	}

    var state = 'pending',
        uploader = [],
        index = count,
        $list = [];
   
    $(pickerClass).each(function (i) {
    	var _this          = $(this),
    		newPickerClass = '';

        _this.css("position","relative");   //上传按钮向下移动

    	isMultiUpload ? $list[i] = _this.closest( multiWrapClass ).find( listWrapClass ) : $list[i] = $(listWrapClass);

    	_this.addClass(pickerClass.split('.')[1] + i);
    	
    	isMultiUpload ? newPickerClass = pickerClass + i : newPickerClass = pickerClass;
    	
    	uploader[i] = WebUploader.create({
            // 自动上传
            auto: true,
            // swf文件路径
            swf: 'Uploader.swf',
            // 文件接收服务端。
            server: '/Capi/File/upload',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: newPickerClass,
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            fileSingleSizeLimit: 3*1024*1024,   //单文件大小限制
        });

        // 当有文件添加进来的时候
        uploader[i].on( 'fileQueued', function(file) {
            var html = '';
            html += '<div class="form-group js-form-group" id="' + file.id + '" >'+
                        '<div class="progress-bg fl ">'+
                            '<div class="angled-135 stripes progress-bar" style="width: 0%;"></div>'+
                            '<div class="upload-title" title="'+file.name+'">'+file.name+'</div>'+
                        '</div>';
                    '</div>';
            $list[i].append(html);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader[i].on('uploadProgress', function( file, percentage ) {
            var $li      = $( '#'+file.id ),
                $percent = $li.find('.progress-bg .progress-bar'),
                html     = '';
            // 避免重复创建
            if ( !$percent.length ) {
                html += '<div class="progress-bg fl">'+
                            '<div class="angled-135 stripes progress-bar" style="width: 0%;"></div>'+
                            '<div class="upload-title" title="'+file.name+'">'+file.name+'</div>'+
                        '</div>';
                $li.append(html);
                $percent = $li.find('.progress-bar');
            }
            $li.find('p.state').text('上传中');
            $percent.css('width', percentage * 100 + '%');
        });

        uploader[i].on('uploadSuccess', function(file, response) {
            var html  = '',
                $file = $('#' + file.id),
                code  = response.code,
                data  = response.data;
            
            if(code == 200 && data[0].status == 2) {          
                //html = '<a href="javascript:;" data-src="' + data[0].path + '">' + file.name + '</a>'+
                html = '<a href="'+ ( base_img_url ? base_img_url + data[0].path : 'javascript:;') +
                       '" target="blank" data-src="' + data[0].path + '" title="' + file.name + '" ' + ( base_img_url ? 'download' : '') + '>' + file.name + '</a>'+
                       '<span class="del-uploadfile js-del-uploadfile">删除</span>'+
                       '<input type="hidden" name="file_list[' + index + '][path]" value="' + data[0].path + '">'+
                       '<input type="hidden" name="file_list[' + index + '][title]" value="' + data[0].name + '">'+
                       '<input type="hidden" name="file_list[' + index + '][extension]" value="' + data[0].ext + '">'+
                       '<input type="hidden" name="file_list[' + index + '][size]" value="' + data[0].size + '">';

                $file.addClass('js-success-item').attr("data-index",index).append(html);
                index++;
                $('#' + file.id).find('.progress-bg').fadeOut();

                successFun(_this);
            }
            else {
                html = '&nbsp<span class="must">上传出错</span><span class="del-uploadfile js-del-uploadfile">删除</span>';
                $file.find('.progress-bg').after(html);
                if(code == 200){
                    $file.find('.must').text('上传出错：'+data[0].error_msg);
                } else {
                    $file.find('.must').text('上传出错：'+response.msg);
                }
            }

        });
        uploader[i].on('error', function(handler) {
            var html  = '',
                errortxt = '';
            switch(handler) {
                case 'F_DUPLICATE': 
                    errortxt = '上传出错：文件重复';
                    break; 
                case 'F_EXCEED_SIZE': 
                    errortxt = '上传出错：文件大小超限,当前上限'+Math.floor(uploader[i].options.fileSingleSizeLimit/1048576 * 100) / 100 +'MB';
                    break;
                case 'Q_TYPE_DENIED': 
                    errortxt = '上传出错：文件类型不符';
                    break; 
                default: 
                    errortxt = '上传出错'; 
            }
            layer.msg(errortxt);
        });
        uploader[i].on('uploadError', function(file) {
            var html = '&nbsp<span class="must">上传出错</span><span class="del-uploadfile js-del-uploadfile">删除</span>';
            $('#' + file.id).find('.progress-bg').after(html);
        });

        uploader[i].on('uploadComplete', function(file) {
            //$('#' + file.id).find('.progress-bg').fadeOut();
        });

        uploader[i].on('all', function(type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function() {
            if (state === 'uploading') {
                uploader[i].stop();
            } else {
                uploader[i].upload();
            }
        });

        // 上传图片删除 失败+成功 $list .js-del-uploadfile
        $list[i].on('click', '.js-del-uploadfile', function () {
            var _this     = $(this).closest('.js-form-group');
            
            // 多块上传 不进行更新index
            if( isMultiUpload ) {
                // 更新其他index值 .js-success-item  每次上传成功之后，index都会 +1
                updateIndex(_this, _this.siblings('.js-success-item'),'input[type="hidden"]', index, 'file_list');
                index--;    //index是在 publicUpload 中定义的
            }
            if(uploader[i].getFile(file_id)){
                uploader[i].removeFile(file_id,true);
            }
            _this.remove();
            layer.msg('删除成功');
        });

    })
}

/**
 * Description: 更新下标
 * @param $dom: data-index DOM对象 删除的对象
 * @param $childDom: $dom要更新下标的兄弟节元素
 * @param nameClass: $dom下要更新的input元素
 * @param index: 当前的最大的下标
 * @param nameStr: input的name
 * @param childDomFunc: 需要更新下标的元素的回调
 */
function updateIndex($dom, $childDom, nameClass, index, nameStr, childDomFunc) {
    var delIndex = $dom.attr('data-index') * 1;
    if(delIndex < index - 1) {
        $childDom.each(function () {
            var $this     = $(this),
                thisIndex = $this.attr('data-index') * 1;                       
            if(thisIndex > delIndex) {
                $this.attr('data-index', thisIndex - 1);
                // 更新隐藏文本域的name
                $this.find(nameClass).each(function () {
                    var _this = $(this),
                        name  = _this.attr('name'),
                        name1 = '',
                        name2 = name.split(']')[1];
                    name1 = nameStr + '[' + (thisIndex - 1) + ']';
                    name2 = name2 + ']';
                    name  = name1 + name2;
                    _this.attr('name', name);
                });
                childDomFunc && childDomFunc($this, thisIndex - 1);
            }
        });
    }
}

/**
 * 表格内公共上传 基本参数public 替换样式和JS
 * [publicUploadForTable description]
 * @param  {[type]} options         [description]
 * @param  {[type]} successCallback [description]
 * @return {[type]}                 [description]
 */
function publicUploadForTable(options,successCallback)
{
    var successFun  = successCallback || function () {};

    var count       = 0,
        listWrapClass = '#uploader-wrap',
        $btn        = $('#ctlBtn'), 
        pickerClass = '#picker',
        isMultiUpload = false,
        multiWrapClass = '.js-add-item',
        base_img_url = '';  
    if(typeof options == 'string' || typeof options == 'number') 
    {
        count   = options * 1;
    }
    else if (typeof options == 'object')
    {
        count       = options.count       || 0;
        listWrapClass = options.listWrapClass || $('#uploader-wrap');
        pickerClass = options.pickerClass || '#picker';
        isMultiUpload = options.isMultiUpload || false;
        multiWrapClass = options.multiWrapClass || '.js-add-item';
        $btn        = options.$btn        || $('#ctlBtn');
        base_img_url = options.base_img_url || '';
    }

    var state = 'pending',
        uploader = [],
        index = count,
        $list = [],
        errorHtml = '<span class="del-uploadfile-txt js-del-uploadfile">删除</span>'+
                    '<input type="hidden" name="errortext" value="上传出错">'+
                    '<span class="glyphicon glyphicon-exclamation-sign upload-warning js-upload-warning"></span>';
   
    $(pickerClass).each(function (i) {
        var _this          = $(this),
            newPickerClass = '';

        _this.css("position","relative");   //上传按钮向下移动

        isMultiUpload ? $list[i] = _this.closest( multiWrapClass ).find( listWrapClass ) : $list[i] = $(listWrapClass);

        _this.addClass(pickerClass.split('.')[1] + i);
        
        isMultiUpload ? newPickerClass = pickerClass + i : newPickerClass = pickerClass;
        
        uploader[i] = WebUploader.create({
            // 自动上传
            auto: true,
            // swf文件路径
            swf: 'Uploader.swf',
            // 文件接收服务端。
            server: '/Capi/File/upload',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: newPickerClass,
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            fileSingleSizeLimit: 3*1024*1024,   //单文件大小限制
        });

        // 当有文件添加进来的时候
        uploader[i].on( 'fileQueued', function(file) {
            var html = '';
            html += '<div class="form-group js-form-group table-upload-wrap" id="' + file.id + '" >'+
                        '<div class="progress-wrap">'+
                            '<span class="upload-title" title="'+file.name+'">'+file.name+'</span>'+
                            '<span class="progress-num">0%</span>'+
                        '</div>'+
                    '</div>';

            $list[i].append(html);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader[i].on('uploadProgress', function( file, percentage ) {
            var $percent = $( '#'+file.id ).find('.progress-num');
            $percent.text( parseInt(percentage * 100) + '%');
        });

        uploader[i].on('uploadSuccess', function(file, response) {
            var html  = '',
                $file = $('#' + file.id),
                code  = response.code,
                data  = response.data;
            
            if(code == 200 && data[0].status == 2) {          
                html = '<a class="upload-title" href="'+ ( base_img_url ? base_img_url + data[0].path : 'javascript:;') +
                       '" target="blank" data-src="' + data[0].path + '" title="' + file.name + '" ' + ( base_img_url ? 'download' : '') + '>' + file.name + '</a>'+
                       '<span class="del-uploadfile-txt js-del-uploadfile">删除</span>'+
                       '<input type="hidden" name="file_list[' + index + '][path]" value="' + data[0].path + '">'+
                       '<input type="hidden" name="file_list[' + index + '][title]" value="' + data[0].name + '">'+
                       '<input type="hidden" name="file_list[' + index + '][extension]" value="' + data[0].ext + '">'+
                       '<input type="hidden" name="file_list[' + index + '][size]" value="' + data[0].size + '">';
                $file.find('.progress-wrap').remove();
                $file.addClass('js-success-item').attr("data-index",index).append(html);
                index++;             
                successFun(_this);
            }
            else {
                $('#' + file.id).find('.progress-wrap').append(errorHtml);
                var errormsg = '上传出错:';
                if(code == 200){
                    errormsg += data[0].error_msg;
                } else {
                    errormsg += response.msg;
                }
                $('#' + file.id).find('input[name="errortext"]').val(errormsg)
                layer.tips(errormsg, $file, {
                    tips: [2, '#3595CC'],
                    time: 4000
                });
            }

        });
        uploader[i].on('error', function(handler) {
            var html  = '',
                errortxt = '';
            switch(handler) {
                case 'F_DUPLICATE': 
                    errortxt = '上传出错：文件重复';
                    break; 
                case 'F_EXCEED_SIZE': 
                    errortxt = '上传出错：文件大小超限,当前上限'+Math.floor(uploader[i].options.fileSingleSizeLimit/1048576 * 100) / 100 +'MB';
                    break;
                case 'Q_TYPE_DENIED': 
                    errortxt = '上传出错：文件类型不符';
                    break; 
                default: 
                    errortxt = '上传出错'; 
            }
            layer.msg(errortxt);
        });
        uploader[i].on('uploadError', function(file,reason) {
            $('#' + file.id).append(errorHtml);
            layer.tips('上传出错：'+reason, $('#' + file.id), {
                tips: [2, '#3595CC'],
                time: 4000
            });
        });

        uploader[i].on('uploadComplete', function(file) {
            $('#' + file.id).find('.progress-num').remove();
        });

        uploader[i].on('all', function(type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function() {
            if (state === 'uploading') {
                uploader[i].stop();
            } else {
                uploader[i].upload();
            }
        });

        // 上传图片删除 失败+成功 $list .js-del-uploadfile
        $list[i].on('click', '.js-del-uploadfile', function () {
            var _this     = $(this).closest('.js-form-group'),
                file_id   = _this.attr('id');
            // 多块上传 不进行更新index
            if( isMultiUpload ) {
                // 更新其他index值 .js-success-item  每次上传成功之后，index都会 +1
                updateIndex(_this, _this.siblings('.js-success-item'),'input[type="hidden"]', index, 'file_list');
                index--;    //index是在 publicUpload 中定义的
            }
            if(uploader[i].getFile(file_id)){
                uploader[i].removeFile(file_id,true);
            }
            _this.remove();
            layer.msg('删除成功');
        });
        //错误tips
        $list[i].on('mouseenter', '.js-upload-warning', function () {
            var _this     = $(this).closest('.js-form-group'),
                errormsg  = _this.find('input[name="errortext"]').val();
            layer.tips(errormsg, _this, {
                tips: [2, '#3595CC'],
                time: 4000
            });
        });
    })
}


/**
 * 清单管理模块上传专用
 * @param options
 * @param successCallback
 */
function publicUploadForListconfig(options,successCallback)
{
    var successFun  = successCallback || function () {};

    var count       = 0,
        listWrapClass = '#uploader-wrap',
        $btn        = $('#ctlBtn'),
        pickerClass = '#picker',
        isMultiUpload = false,
        multiWrapClass = '.js-add-item',
        base_img_url = '';
    if(typeof options == 'string' || typeof options == 'number')
    {
        count   = options * 1;
    }
    else if (typeof options == 'object')
    {
        count       = options.count       || 0;
        listWrapClass = options.listWrapClass || $('#uploader-wrap');
        pickerClass = options.pickerClass || '#picker';
        isMultiUpload = options.isMultiUpload || false;
        multiWrapClass = options.multiWrapClass || '.js-add-item';
        $btn        = options.$btn        || $('#ctlBtn');
        base_img_url = options.base_img_url || '';
    }

    var state = 'pending',
        uploader = [],
        index = count,
        $list = [],
        errorHtml = '<span class="del-uploadfile-txt js-del-uploadfile">删除</span>'+
            '<input type="hidden" name="errortext" value="上传出错">'+
            '<span class="glyphicon glyphicon-exclamation-sign upload-warning js-upload-warning"></span>';


    //循环
    $(pickerClass).each(function (i) {
        var _this          = $(this),
            newPickerClass = '';
        var key  = _this.parents('.js-item').index();         ///////////////////////////
        var module  = _this.parents('.js-item').attr('data-name');
        _this.css("position","relative");   //上传按钮向下移动

        isMultiUpload ? $list[i] = _this.closest( multiWrapClass ).find( listWrapClass ) : $list[i] = $(listWrapClass);

        _this.addClass(pickerClass.split('.')[1] + i);

        isMultiUpload ? newPickerClass = pickerClass + i : newPickerClass = pickerClass;

        uploader[i] = WebUploader.create({
            // 自动上传
            auto: true,
            // swf文件路径
            swf: 'Uploader.swf',
            // 文件接收服务端。
            server: '/Capi/File/upload',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: newPickerClass,
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            fileSingleSizeLimit: 3*1024*1024,   //单文件大小限制
        });

        // 当有文件添加进来的时候
        uploader[i].on( 'fileQueued', function(file) {
            var html = '';
            html += '<div class="form-group js-form-group table-upload-wrap" id="' + file.id + '" >'+
                '<div class="progress-wrap">'+
                '<span class="upload-title" title="'+file.name+'">'+file.name+'</span>'+
                '<span class="progress-num">0%</span>'+
                '</div>'+
                '</div>';

            $list[i].append(html);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader[i].on('uploadProgress', function( file, percentage ) {
            var $percent = $( '#'+file.id ).find('.progress-num');
            $percent.text( parseInt(percentage * 100) + '%');
        });

        uploader[i].on('uploadSuccess', function(file, response) {
            var html  = '',
                $file = $('#' + file.id),
                code  = response.code,
                data  = response.data;

            if(code == 200 && data[0].status == 2) {
                html = '<a class="upload-title" href="'+ ( base_img_url ? base_img_url + data[0].path : 'javascript:;') +
                    '" target="blank" data-src="' + data[0].path + '" title="' + file.name + '" ' + ( base_img_url ? 'download' : '') + '>' + file.name + '</a>'+
                    '<a class="glyphicon glyphicon-save js-attach-file" href="'+ ( base_img_url ? base_img_url + data[0].path : 'javascript:;') +
                    '" target="blank" data-src="' + data[0].path + '" title="' + file.name + '" ' + ( base_img_url ? 'download' : '') + '></a>'+
                    '<span class="del-uploadfile-txt js-del-uploadfile">删除</span>'+
                    '<input type="hidden" name="'+module+'_path[' + key + '][]" value="' + data[0].path + '">'+
                    '<input type="hidden" name="'+module+'_title[' + key + '][]" value="' + data[0].name + '">'+
                    '<input type="hidden" name="'+module+'_extension[' + key + '][]" value="' + data[0].ext + '">'+
                    '<input type="hidden" name="'+module+'_size[' + key + '][]" value="' + data[0].size + '">';
                $file.find('.progress-wrap').remove();
                $file.addClass('js-success-item').attr("data-index",index).append(html);
                index++;
                successFun(_this);
            }
            else {
                $('#' + file.id).find('.progress-wrap').append(errorHtml);
                var errormsg = '上传出错:';
                if(code == 200){
                    errormsg += data[0].error_msg;
                } else {
                    errormsg += response.msg;
                }
                $('#' + file.id).find('input[name="errortext"]').val(errormsg)
                layer.tips(errormsg, $file, {
                    tips: [2, '#3595CC'],
                    time: 4000
                });
            }

        });
        uploader[i].on('error', function(handler) {
            var html  = '',
                errortxt = '';
            switch(handler) {
                case 'F_DUPLICATE':
                    errortxt = '上传出错：文件重复';
                    break;
                case 'F_EXCEED_SIZE':
                    errortxt = '上传出错：文件大小超限,当前上限'+Math.floor(uploader[i].options.fileSingleSizeLimit/1048576 * 100) / 100 +'MB';
                    break;
                case 'Q_TYPE_DENIED':
                    errortxt = '上传出错：文件类型不符';
                    break;
                default:
                    errortxt = '上传出错';
            }
            layer.msg(errortxt);
        });
        uploader[i].on('uploadError', function(file,reason) {
            $('#' + file.id).append(errorHtml);
            layer.tips('上传出错：'+reason, $('#' + file.id), {
                tips: [2, '#3595CC'],
                time: 4000
            });
        });

        uploader[i].on('uploadComplete', function(file) {
            $('#' + file.id).find('.progress-num').remove();
        });

        uploader[i].on('all', function(type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function() {
            if (state === 'uploading') {
                uploader[i].stop();
            } else {
                uploader[i].upload();
            }
        });

        // 上传图片删除 失败+成功 $list .js-del-uploadfile
        $list[i].on('click', '.js-del-uploadfile', function () {
            var _this     = $(this).closest('.js-form-group'),
                file_id   = _this.attr('id');
            // 多块上传 不进行更新index
            if( isMultiUpload ) {
                // 更新其他index值 .js-success-item  每次上传成功之后，index都会 +1
                updateIndex(_this, _this.siblings('.js-success-item'),'input[type="hidden"]', index, 'file_list');
                index--;    //index是在 publicUpload 中定义的
            }
            if(uploader[i].getFile(file_id)){
                uploader[i].removeFile(file_id,true);
            }
            _this.remove();
            layer.msg('删除成功');
        });
        //错误tips
        $list[i].on('mouseenter', '.js-upload-warning', function () {
            var _this     = $(this).closest('.js-form-group'),
                errormsg  = _this.find('input[name="errortext"]').val();
            layer.tips(errormsg, _this, {
                tips: [2, '#3595CC'],
                time: 4000
            });
        });
    })
}
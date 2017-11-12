function makeRowOperation(row, operationIndex, getUrl, saveUrl, param) {
	var btnCheck = $("<a></a>").attr("data-toggle", "modal").attr("data-target", "#modal").attr("class", "btn btn-small btn-primary btn-info").text("查看");
	btnCheck.click(function() {
		param.opt = "check";
		checkData(getUrl, saveUrl, param);
	});
    var btnCheckEdit = $("<a></a>").attr("data-toggle", "modal").attr("data-target", "#modal").attr("class", "btn btn-small btn-primary btn-edit").text("修改");
    btnCheckEdit.click(function() {
		param.opt = "update";
		checkData(getUrl, saveUrl, param);
	});
    var $btnDel = $('<button type="button" class="btn btn-small btn-danger btn-del">删除</button>');
    $('td', row).eq(operationIndex).append(btnCheck).append(btnCheckEdit).append($btnDel);
}

function makeTable(getUrl, insertUrl, param) {
	var newDiv = $("<div></div>").attr("class", "dataTables_paginateNew");
	var newButton = $("<a></a>").attr("data-toggle", "modal").attr("data-target", "#modal").attr("class", "btn btn-small btn-primary btn-success").text("新增")
	newButton.click(function() {
		param.opt = "new";
		checkData(getUrl, insertUrl, param);
	});
	$("div.top").append(newDiv.append(newButton));
    $("div.dataTables_info").addClass("dataTables_lengthNew");
    $("div.dataTables_length").addClass("dataTables_lengthNew");
    $("div.dataTables_paginate").addClass("dataTables_paginateNew");
    
    $.fn.dataTable.ext.errMode = 'none'; //不显示任何错误信息
    //以下为发生错误时的事件处理，如不处理，可不管。
    $('#dataTables-example').on( 'error.dt', function ( e, settings, techNote, message ){
    	//这里可以接管错误处理，也可以不做任何处理
    }).DataTable();
}

function initSearchArea() {
	$("#btn-advanced-search").click(function() {
    	paramFactory.table.draw();
    });
    
    $("#btn-empty-search").click(function() {
    	$("#div-advanced-search").find("input").each(function(){
    		$(this).val('');
    	})
		paramFactory.table.draw();
    });
}

function bindModalEvent() {
    $('#modal').on('hide.bs.modal', function () {
    	$("#modal-content-ss").empty();
    });
}

function checkData(getUrl, operateUrl, param) {
	$.ajax({
        type: "GET",
        url: getUrl,
        cache : false,	//禁用缓存
        data: param,	//传入已封装的参数
        dataType: "html",
        success: function(result) {
        	$("#modal-content-ss").append(result);
        	if (param.opt == 'new') {
        		bindInsertBtn(operateUrl);
        	} else {
            	bindSaveBtn(operateUrl);
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	alert("查询失败");
        	$('#modal').modal('hide');
        }
    });
}

function bindInsertBtn(operateUrl) {
	$("#save-btn").click(function() {
		var param = paramFactory.getChangeCondition();
		$.ajax({
	        type: "POST",
	        url: operateUrl,
	        cache : false,	//禁用缓存
	        data: param,	//传入已封装的参数
	        dataType: "json",
	        success: function(result) {
	        	alert("新增成功");
	        	$('#modal').modal('hide');
	        	paramFactory.table.draw();
	        },
			error: function(XMLHttpRequest, textStatus, errorThrown) {
		        alert("新增失败");
		        $('#modal').modal('hide');
		    }
		});
	});
}

function bindSaveBtn(operateUrl) {
	$("#save-btn").click(function() {
		var param = paramFactory.getChangeCondition();
		$.ajax({
	        type: "POST",
	        url: operateUrl,
	        cache : false,	//禁用缓存
	        data: param,	//传入已封装的参数
	        dataType: "json",
	        success: function(result) {
	        	alert("更新成功");
	        	$('#modal').modal('hide');
	        	paramFactory.table.draw();
	        },
			error: function(XMLHttpRequest, textStatus, errorThrown) {
		        alert("更新失败");
		        $('#modal').modal('hide');
		    }
		});
	});
}
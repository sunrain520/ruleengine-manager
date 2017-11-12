//系统时间显示
//setInterval("document.getElementById('nowTime').innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",1000);

$(function() {
	var firstUrl = initNav();
    loadTree(firstUrl);
});

function initNav() {
	var firstUrl = "";
    $.ajax({
    	type: 'GET',
    	url: 'common/loadNav',
    	dataType: "json",
    	success: function(result) {
    		var data = result.data;
    		for (var i = 0; i < data.length; i++) {
    			var item = data[i];
    			var name = item.name;
    			var tabUrl = item.url;
    			if (i == 0) {
    				firstUrl = tabUrl;
    			}
    			
    			var newLi = $("<li></li>");
    			var newA = $("<a></a>").attr("href", "#").text(name);
    			$("#nav-top").append(newLi.append(newA));
    			(function () {
        			var tabUrlL = tabUrl;
        			newLi.click(function() {
        				loadTree(tabUrlL);
        				$(this).addClass("active");
        				$(this).siblings("li").removeClass("active");
            		});
        		})();
    		}
    	}
    });
    return firstUrl;
}

function loadTree(url) {
	$('#side-menu').empty();
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function(result) {
        	var data = result.data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var id = item.id;
                var pId = item.parentId;
                if (pId == "" || typeof(pId)=="undefined") {
                    pId = "0";
                }
                var type = item.type;
                var name = item.name;
                var tabUrl = item.url;
                
                var level = "nav nav-second-level";
                if (type == 2) {
                	level = "nav nav-third-level";
                }
                
                var newSpan = $("<span></span>").attr("class", "fa arrow");
                var newA = $("<a></a>").attr("href", "#").text(name);
                var newLi = $("<li></li>").attr("id", id + "-li");
                var newUl = $("<ul></ul>").attr("class", level).attr("id", pId + "-ul");
                if (type != 2) {
                	newLi.append(newA.append(newSpan));
                } else {
                	newLi.append(newA);
                	(function () {
            			var nameL = name;
            			var tabUrlL = tabUrl;
            			newLi.click(function() {
                			openTab(nameL, tabUrlL);
                		});
            		})();
                }
            	newUl.append(newLi);
            	if (pId == null || pId == "0") {
            		$('#side-menu').append(newLi);
            	} else {
            		if ($("#" + pId + "-li").length > 0) {
                		if ($("#" + pId + "-ul").length <= 0) {
                    		$("#" + pId + "-li").append(newUl);
                		} else {
                			$("#" + pId + "-ul").append(newLi);
                		}
                	}
            	}
            }

            // 形成控件
            $('#side-menu').metisMenu();
        }
    });
}

function openTab(name, url){
	var isAdd = true;
	// 去掉其他tab的active
	// 如果已经存在相同的，将tab重新激活
	$('#tabs-ul').find('li').each(function() {
		$(this).removeClass("active");
		if($(this).attr("id") == (name + "-tab-head")) {
			$(this).addClass("active");
			isAdd = false;
		}
    });
    $('#tabs-div').find('div').each(function() {
		$(this).removeClass("in");
		$(this).removeClass("active");
		if($(this).attr("id") == (name + "-tab-body")) {
			$(this).addClass("active");
			$(this).addClass("in");
			isAdd = false;
		}
    });
    if (!isAdd) {
    	return;
    }
    
    // 增加tab头
    var newLi = $("<li></li>").attr("class", "active").attr("id", name + "-tab-head");
    var newA = $("<a></a>").attr("href", "#" + name + "-tab-body").attr("data-toggle", "tab").text(name);
    var newButton = $("<button></button>").attr("class", "close closeTab").attr("type", "button").text("×");
    newButton.click(function() {
    	closeTab(name);
	});
    $('#tabs-ul').append(newLi.append(newA.append(newButton)));
    
    // 增加tab页面
    var newDiv = $("<div></div>").attr("class", "tab-pane fade in active").attr("id", name + "-tab-body");
    var newFrame = $("<iframe></iframe>").attr("src", url).attr("id", name + "-iframe").attr("frameBorder", "0").attr("border", "1").attr("scrolling", "auto").attr("style", "width: 100%; height: 100%;");
    $('#tabs-div').append(newDiv.append(newFrame));
};

function closeTab(name) {
	// 删除对应id的tab，若左方仍有tab，则激活最近一个
	var preLiId = "";
	var preDivId = "";
	var preActive = false;
	$('#tabs-ul').find('li').each(function() {
		if($(this).attr("id") == (name + "-tab-head")) {
			if ($(this).hasClass("active")) {
    			$("#" + preLiId).addClass("active");
    			preActive = true;
			}
			$(this).remove();
		}
		preLiId = $(this).attr("id");
    });
    $('#tabs-div').find('div').each(function() {
    	if($(this).attr("id") == (name + "-tab-body")) {
    		if (preActive) {
	    		$("#" + preDivId).addClass("active");
				$("#" + preDivId).addClass("in");
    		}
			$(this).remove();
		}
    	preDivId = $(this).attr("id");
    });
}
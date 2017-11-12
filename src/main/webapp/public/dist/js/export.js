var exportForm = null;//导出的参数保存在这里
var timeIndex  = null; //定时器标记
var exportLayerIndex = null;//导出订单layer标记
var exportId = '';
var total = $('.total-wrap').find('span.total').html();

function exportdata(exportClassName,exportListRows,exportUrl,id){
    $(exportClassName).click(function(){
        var form = $('form');
        var checked     = $('.js-table tr .list-item-checkbox[checked="checked"]');
        if(checked.length){
            var export_id='',i=0;

            $.each(checked ,function(key,val) {
                export_id+='&'+id+'[]='+val.value;
                i++;
            });

            total = i;
            exportId = export_id;
        }else{
            exportId = '';
        }

        var maxRows = 100000;
        if(total > maxRows){
            layer.alert('导出失败！当前搜索条件导出超出' + maxRows + '条数据，请调整搜索条件。',{title:'提示'});
            return false;
        }

        //分页
        exportListRows = Math.ceil(parseInt(total)/parseInt(exportListRows));

        //当前第一个页
        form.find('[name="page"]').val(1);
        form.find('[name="exportTotalPage"]').val(exportListRows);

        layer.confirm('您确定要导出报表吗?', function(index){
            selectVal();
            var val = $('form').serialize();

            layer.close(index);
            exportLayerIndex = layer.open({
                title:'导出文件',
                type: 1,
                area:'400px',
                btn: false,
                content: $('#exportLayerBox'),
                cancel: function(index, layero){
                    clearInterval(timeIndex);
                    layer.close(index);
                }
            });

            $('#exportLayerBox .progress-bar').css({'width': '0%'});
            timeIndex = setInterval('exportDataLoop(exportId)', 1000);
        });
    });
}


//导出循环处理体
function exportDataLoop(id)
{
    form = $('form');

    var dataPageError = form.attr('data-page-error') || '0';
    if(dataPageError == '1'){
        exportData(false, form);
        return true;
    }
    var exportTotalPage = form.find('[name="exportTotalPage"]').val() * 1;
    var progress = 0;
    var p = form.find('[name="page"]').val() * 1;
    progress = p / exportTotalPage * 100;
    $('#exportLayerBox .progress-bar').css({'width': progress + '%'});

    if(p > exportTotalPage){
        exportData(true, form);
        return true;
    }

    var dataPageLock  = form.attr('data-page-lock')  || '0';
    if(dataPageLock == '0'){
        form.attr('data-page-lock', '1');
        form.attr('data-page-error', '0');
        var data =$('form').serialize()+id;

        $.ajax({
            type:'get',
            url:exportUrl,
            data:data,
            dataType:'json',
            success:function(r){
                if(r.code == '200'){
                    p++;
                    form.find('[name="page"]').val(p);
                    form.attr('data-page-lock', '0');
                }else{
                    form.attr('data-page-error', '1');
                }
            },
            error:function(){
                form.attr('data-page-error', '1');
            }
        });
    }
}

//导出文件最后一个步骤
function exportData(b){
    $('#exportLayerBox .progress-bar').css({'width': '0%'});
    form.attr('data-page-lock', '0');
    form.attr('data-page-error', '0');
    clearInterval(timeIndex);
    layer.close(exportLayerIndex);
    if(b){
        var url = exportUrl+'?_downloadFile=downloadCsv';
        window.location.href=url;
    }else{
        layer.alert("导出文件失败，请稍后再试！");
    }
}
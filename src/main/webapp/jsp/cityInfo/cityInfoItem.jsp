<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<div class="modal-header">
	<h4 class="modal-title" id="myModalLabel">
		查看城市信息详情
	</h4>
</div>
<div class="modal-body"  id="modal-sss">
    <input type="hidden" id="cityCode" value="${itemId}">
	<form >
	    <div class="row">
	    	<div class="col-lg-12">
				<div class="row-fluid" id="div-advanced-search">
					<span>代码：</span>
				    <input type="number" id="fCityCode" class="form-control" value="${cityInfo.fCityCode}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
		</div>
	    <div class="row">
	    	<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>名称：</span>
					<input type="text" id="fCityName" class="form-control" value="${cityInfo.fCityName}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>简称：</span>
					<input type="text" id="fCityNameAbbreviate" class="form-control" value="${cityInfo.fCityNameAbbreviate}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
		</div>
	    <div class="row">
	    	<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>所属省份：</span>
					<input type="text" id="fProvinceName" class="form-control" value="${cityInfo.fProvinceName}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>省份代码：</span>
					<input type="number" id="fProvinceCode" class="form-control" value="${cityInfo.fProvinceCode}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
		</div>
	    <div class="row">
	    	<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>行政级别：</span>
					<input type="number" id="fAdministrationLevel" class="form-control" value="${cityInfo.fAdministrationLevel}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="row-fluid" id="div-advanced-search">
					<span>分类：</span>
					<input type="text" id="fClassification" class="form-control" value="${cityInfo.fClassification}" ${opt == 'check' ? 'readonly':''}/>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-default" data-dismiss="modal">关闭
	</button>
	<c:choose>
        <c:when test="${opt ne 'check'}">
		<button id="save-btn" type="button" class="btn btn-primary">
			提交更改
		</button>
     	</c:when>
    </c:choose>
</div>

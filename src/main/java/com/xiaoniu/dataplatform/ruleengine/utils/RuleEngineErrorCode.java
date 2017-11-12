package com.xiaoniu.dataplatform.ruleengine.utils;

/**
 * C接口返回状态码枚举
 */
public enum RuleEngineErrorCode {

	C200(200,"成功"),//成功
	C202(202,"部分数据处理有问题"),// 部分数据处理有问题,针对批量处理接口
	C400(400,"参数为空或者错误"),
	C401(401,"请求验证错误"),
	C402(402,"未指明服务"),
	C403(403,"无权限操作"),
	C404(404,"无法找到"),
	C406(406,"同时操作太多文件"),
	C500(500,"服务器错误"),
	C501(501,"返回结果有误"),
	C502(502,"操作失败"),
	C507(507,"空间不足"),
	C508(508,"数据库异常"),

	itemidexist(4001,"规则项ID已存在");


	private final int code;
	private final String message;

	private RuleEngineErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}

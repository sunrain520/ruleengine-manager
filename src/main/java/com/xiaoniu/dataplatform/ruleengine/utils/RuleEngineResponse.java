package com.xiaoniu.dataplatform.ruleengine.utils;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

/**
 * 统一resp
 * @param <T>
 */
public class RuleEngineResponse<T> implements Serializable {
	private static final Logger logger = LoggerFactory.getLogger(RuleEngineResponse.class);

	private static final long serialVersionUID = 1L;
	private int code;
	private String msg;
	private T data;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public RuleEngineResponse() {

	}

	public RuleEngineResponse(RuleEngineErrorCode code) {
		setCode(code.getCode());
		setMsg(code.getMessage());
	}

	public RuleEngineResponse(int status, String message) {
		this.code = status;
		this.msg = message;
	}

	public RuleEngineResponse(int status, String message, T data) {
		this.code = status;
		this.msg = message;
		this.data = data;
	}

	public RuleEngineResponse(RuleEngineErrorCode code, T data) {
		setCode(code.getCode());
		setMsg(code.getMessage());
		this.data = data;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String toString() {
		return JSON.toJSONString(this);
	}


	/**
	 * 设置异常code
	 *
	 * @param code
	 * @param response
	 */
	public static void setCode(RuleEngineErrorCode code, RuleEngineResponse<?> response) {
		response.setCode(code.getCode());
		response.setMsg(code.getMessage());
	}

	/**
	 * 设置异常code
	 *
	 * @param code
	 * @param msg
	 * @param response
	 */
	public static void setCode(int code, String msg, RuleEngineResponse<?> response) {
		response.setCode(code);
		response.setMsg(msg == null ? "" : msg);
	}
}

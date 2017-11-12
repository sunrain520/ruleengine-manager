package com.xiaoniu.dataplatform.ruleengine.service;

import java.util.List;

import com.xiaoniu.dataplatform.ruleengine.entity.Function;

/** 
 * @author  zhengjiajun
 * @date 2017年11月6日
 */
public interface CommonService {

	List<Function> queryNav();
	List<Function> queryFunctionByPermission();
	
}

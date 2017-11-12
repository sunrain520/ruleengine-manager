package com.xiaoniu.dataplatform.ruleengine.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.Function;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.FunctionMapper;
import com.xiaoniu.dataplatform.ruleengine.service.CommonService;

/** 
 * @author  zhengjiajun
 * @date 2017年11月6日
 */
@Service
public class CommonServiceImpl implements CommonService {

	@Autowired
	private FunctionMapper functionMapper;

	@Override
	public List<Function> queryNav() {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("type", 0);
		return functionMapper.selectByType(params);
	}
	
	@Override
	public List<Function> queryFunctionByPermission() {
		return functionMapper.selectAll();
	}
}

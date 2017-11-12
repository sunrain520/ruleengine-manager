package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleSet;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RuleSetMapper;
import com.xiaoniu.dataplatform.ruleengine.service.RuleSetService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.ServiceUtil;

/** 
 * @author  zhengjiajun
 * @date 2017年11月8日
 */
@Service
public class RuleSetServiceImpl implements RuleSetService {

	private static final Logger LOGGER = LoggerFactory.getLogger(RuleSetServiceImpl.class);
	
	@Override
	public RuleEngineResponse<PageResult<RuleSet>> queryRuleSetsByPage(String appId, String ruleId, String bizClass,
			String remark, int startIndex, int pageSize) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("appId",appId);
        params.put("ruleId",ruleId);
        params.put("bizClass",bizClass);
        params.put("remark",remark);
		return ServiceUtil.queryDataByPage(params, startIndex, pageSize, RuleSet.class, RuleSetMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleSet> queryRuleSetById(Integer autoId) {
		return ServiceUtil.queryDataById(autoId, RuleSet.class, RuleSetMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleSet> updateRuleSetById(RuleSet ruleSet) {
		try {
        	checkRuleSet(ruleSet);
		} catch (Exception e) {
	    	LOGGER.error("updateRuleSetById params error,reason:{}", e);
	        return ServiceUtil.returnError400();
	    } 
        ruleSet.setfUpdateTime(new Date(System.currentTimeMillis()));
        return ServiceUtil.updateDataById(ruleSet, RuleSet.class, RuleSetMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleSet> insertRuleSet(RuleSet ruleSet) {
		try {
	        checkRuleSet(ruleSet);
		} catch (Exception e) {
	    	LOGGER.error("insertRuleSet params error,reason:{}", e);
	        return ServiceUtil.returnError400();
	    } 
        ruleSet.setfCreateTime(new Date(System.currentTimeMillis()));
        ruleSet.setfUpdateTime(ruleSet.getfCreateTime());
		return ServiceUtil.insertData(ruleSet, RuleSet.class, RuleSetMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleSet> deleteRuleSet(Integer autoId) {
		return ServiceUtil.deleteData(autoId, RuleSet.class, RuleSetMapper.class);
	}

    private void checkRuleSet(RuleSet ruleSet) throws Exception {
        checkArgument(ruleSet != null, "规则集不能为空");
        checkArgument(StringUtils.isNotEmpty(ruleSet.getfAppId()), "appId不能为空");
        checkArgument((ruleSet.getfRuleId() != null), "规则集id不能为空");
    }
}

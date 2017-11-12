package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.RulePre;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RulePreMapper;
import com.xiaoniu.dataplatform.ruleengine.service.RulePreService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.ServiceUtil;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
@Service
public class RulePreServiceImpl implements RulePreService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RulePreServiceImpl.class);

	@Override
	public RuleEngineResponse<PageResult<RulePre>> queryRulePresByPage(String ruleVariable, String preClass,
			String remark, int startIndex, int pageSize) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("ruleVariable", ruleVariable);
		params.put("perClass", preClass);
		params.put("remark", remark);
		return ServiceUtil.queryDataByPage(params, startIndex, pageSize, RulePre.class, RulePreMapper.class);
	}

	@Override
	public RuleEngineResponse<RulePre> queryRulePreById(String ruleVariable) {
		return ServiceUtil.queryDataById(ruleVariable, RulePre.class, RulePreMapper.class);
	}

	@Override
	public RuleEngineResponse<RulePre> updateRulePreById(RulePre rulePre) {
		try {
			checkRulePre(rulePre);
		} catch (Exception e) {
			LOGGER.error("updateRuleSetById params error,reason:{}", e);
	        return ServiceUtil.returnError400();
		}
		rulePre.setfUpdateTime(new Date(System.currentTimeMillis()));
		return ServiceUtil.updateDataById(rulePre, RulePre.class, RulePreMapper.class);
	}

	@Override
	public RuleEngineResponse<RulePre> insertRulePre(RulePre rulePre) {
		try {
			checkRulePre(rulePre);
		} catch (Exception e) {
			LOGGER.error("updateRuleSetById params error,reason:{}", e);
	        return ServiceUtil.returnError400();
		}
		rulePre.setfCreateTime(new Date(System.currentTimeMillis()));
		rulePre.setfUpdateTime(rulePre.getfCreateTime());
		return ServiceUtil.insertData(rulePre, RulePre.class, RulePreMapper.class);
	}

	@Override
	public RuleEngineResponse<RulePre> deleteRulePre(String ruleVariable) {
		return ServiceUtil.deleteData(ruleVariable, RulePre.class, RulePreMapper.class);
	}

    private void checkRulePre(RulePre rulePre) throws Exception {
        checkArgument(rulePre != null, "预处理不能为空");
        checkArgument(StringUtils.isNotEmpty(rulePre.getfRuleVariable()), "参数不能为空");
        checkArgument((rulePre.getfRuleVariable() != null), "处理器不能为空");
    }
}

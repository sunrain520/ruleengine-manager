package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItemLogic;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RuleItemLogicMapper;
import com.xiaoniu.dataplatform.ruleengine.service.RuleItemLogicService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.ServiceUtil;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
@Service
public class RuleItemLogicServiceImpl implements RuleItemLogicService {

	private static final Logger LOGGER = LoggerFactory.getLogger(RuleItemLogicServiceImpl.class);
	
	@Override
	public RuleEngineResponse<PageResult<RuleItemLogic>> queryRuleItemLogicsByPage(Integer id, String ruleExpression,
			String remark, int startIndex, int pageSize) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("ruleExpression", ruleExpression);
		params.put("remark", remark);
		return ServiceUtil.queryDataByPage(params, startIndex, pageSize, RuleItemLogic.class, RuleItemLogicMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleItemLogic> queryRuleItemLogicById(Integer id) {
		return ServiceUtil.queryDataById(id, RuleItemLogic.class, RuleItemLogicMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleItemLogic> updateRuleItemLogicById(RuleItemLogic ruleItemLogic) {
		try {
			checkRuleItemLogic(ruleItemLogic);
		} catch (Exception e) {
			LOGGER.error("updateRuleItemLogicById params error. error is ", e);
			return ServiceUtil.returnError400();
		}
		return ServiceUtil.updateDataById(ruleItemLogic, RuleItemLogic.class, RuleItemLogicMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleItemLogic> insertRuleItemLogic(RuleItemLogic ruleItemLogic) {
		try {
			checkRuleItemLogic(ruleItemLogic);
		} catch (Exception e) {
			LOGGER.error("insertRuleItemLogic params error. error is ", e);
			return ServiceUtil.returnError400();
		}
		return ServiceUtil.insertData(ruleItemLogic, RuleItemLogic.class, RuleItemLogicMapper.class);
	}

	@Override
	public RuleEngineResponse<RuleItemLogic> deleteRuleItemLogic(Integer id) {
		return ServiceUtil.deleteData(id, RuleItemLogic.class, RuleItemLogicMapper.class);
	}

    private void checkRuleItemLogic(RuleItemLogic ruleItemLogic) throws Exception {
        checkArgument(ruleItemLogic != null, "规则逻辑不能为空");
        checkArgument(StringUtils.isNotEmpty(ruleItemLogic.getfRuleExpression()), "表达式不能为空");
    }
}

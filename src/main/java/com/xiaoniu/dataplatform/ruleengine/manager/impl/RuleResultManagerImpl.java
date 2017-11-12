package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleResult;
import com.xiaoniu.dataplatform.ruleengine.manager.RuleResultManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RuleResultMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 规则结果仓储管理层实现
 * Created by tanhui on 2016/11/10.
 */
@Component
public class RuleResultManagerImpl implements RuleResultManager{

    @Autowired
    private RuleResultMapper ruleResultMapper;

    @Override
    public List<RuleResult> queryRuleResultsByPage(String tableName, String appId, String reqId, String ruleId, String idNum, int pageNum, int pageSize) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("reqId",reqId);
        map.put("ruleId",ruleId);
        map.put("idNum",idNum);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);

        return ruleResultMapper.queryRuleResultsByPage(map);
    }

    @Override
    public Integer queryRuleResultsCount(String tableName, String appId, String reqId, String ruleId, String idNum) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("reqId",reqId);
        map.put("ruleId",ruleId);
        map.put("idNum",idNum);

        return ruleResultMapper.queryRuleResultsCount(map);
    }
}

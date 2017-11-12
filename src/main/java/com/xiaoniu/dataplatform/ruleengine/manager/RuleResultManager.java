package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleResult;

import java.util.List;

/**
 * Created by tanhui on 2016/11/10.
 */
public interface RuleResultManager {
    List<RuleResult> queryRuleResultsByPage(String tableName,String appId, String reqId, String ruleId,String idNum, int pageNum, int pageSize);

    Integer queryRuleResultsCount(String tableName,String appId, String reqId, String ruleId,String idNum);
}

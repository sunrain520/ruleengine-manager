package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItem;

import java.util.List;

/**
 * 仓储管理层
 * Created by tanhui on 2016/11/1.
 */
public interface RuleItemManager {

    List<RuleItem> queryRuleItemsByPage(String appId,String ruleId, Integer itemId,String express,String remark,String paramList,int pageNum, int pageSize);

    Integer queryRuleItemsCount(String appId,String ruleId, Integer itemId,String express,String remark,String paramList);

    RuleItem queryRuleItem(String appId, String ruleId,Integer itemId);

    int updateRuleItem(RuleItem item);

    int addRuleItem(RuleItem item);

    int queryItemIdExist(String appId, String ruleId,Integer itemId);
}

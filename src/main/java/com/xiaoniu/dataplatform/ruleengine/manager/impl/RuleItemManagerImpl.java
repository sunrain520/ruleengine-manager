package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItem;
import com.xiaoniu.dataplatform.ruleengine.manager.RuleItemManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RuleItemMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created by tanhui on 2016/11/1.
 */
@Component
public class RuleItemManagerImpl implements RuleItemManager{

    @Autowired
    private RuleItemMapper ruleItemMapper;

    @Override
    public List<RuleItem> queryRuleItemsByPage(String appId,String ruleId, Integer itemId,String express,String remark,String paramList,int pageNum, int pageSize) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashedMap();
        map.put("appId",appId);
        map.put("ruleId",ruleId);
        map.put("itemId",itemId);
        map.put("express",express);
        map.put("remark",remark);
        map.put("paramList",paramList);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        return ruleItemMapper.queryRuleItemsByPage(map);
    }

    @Override
    public Integer queryRuleItemsCount(String appId,String ruleId, Integer itemId,String express,String remark,String paramList) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashedMap();
        map.put("appId",appId);
        map.put("ruleId",ruleId);
        map.put("itemId",itemId);
        map.put("express",express);
        map.put("remark",remark);
        map.put("paramList",paramList);
        return ruleItemMapper.queryRuleItemsCount(map);
    }

    @Override
    public RuleItem queryRuleItem(String appId, String ruleId, Integer itemId) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        return ruleItemMapper.queryRuleItem(appId,ruleId,itemId);
    }

    @Override
    public int updateRuleItem(RuleItem item) {
        return ruleItemMapper.updateRuleItem(item);
    }

    @Override
    public int addRuleItem(RuleItem item) {
        String ruleId = RuleUtils.appendRuleId(item.getfAppId(),item.getfRuleId());
        item.setfRuleId(ruleId);
        return ruleItemMapper.insertSelective(item);
    }

    @Override
    public int queryItemIdExist(String appId, String ruleId, Integer itemId) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        return ruleItemMapper.queryItemIdExist(appId,ruleId,itemId);
    }
}

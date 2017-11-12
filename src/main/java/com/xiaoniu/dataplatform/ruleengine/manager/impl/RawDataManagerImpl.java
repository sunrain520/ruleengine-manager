package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.RawData;
import com.xiaoniu.dataplatform.ruleengine.manager.RawDataManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RawDataMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 原始数据仓储管理层实现
 * Created by tanhui on 2016/11/10.
 */
@Component
public class RawDataManagerImpl implements RawDataManager {

    @Autowired
    private RawDataMapper rawDataMapper;

    @Override
    public List<RawData> queryRawDatasByPage(String tableName, String appId, String reqId, String ruleId, String interfaceName, int pageNum, int pageSize) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("reqId",reqId);
        map.put("ruleId",ruleId);
        map.put("interfaceName",interfaceName);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);

        return rawDataMapper.queryRawDatasByPage(map);
    }

    @Override
    public Integer queryRawDatasCount(String tableName, String appId, String reqId, String ruleId, String interfaceName) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("reqId",reqId);
        map.put("ruleId",ruleId);
        map.put("interfaceName",interfaceName);

        return rawDataMapper.queryRawDatasCount(map);
    }
}

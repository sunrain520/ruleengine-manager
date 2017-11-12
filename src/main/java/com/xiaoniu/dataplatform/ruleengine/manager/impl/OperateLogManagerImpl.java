package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;
import com.xiaoniu.dataplatform.ruleengine.manager.OperateLogManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.manage.OperateLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tanhui on 2016/11/16.
 */
@Component
public class OperateLogManagerImpl implements OperateLogManager{


    @Autowired
    private OperateLogMapper operateLogMapper;


    @Override
    public List<OperateLog> queryOperateLogsByPage(String appId, String module, String operator, int pageNum, int pageSize) {

        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("module",module);
        map.put("operator",operator);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);

        return operateLogMapper.queryOperateLogsByPage(map);
    }

    @Override
    public Integer queryOperateLogsCount(String appId, String module, String operator) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("module",module);
        map.put("operator",operator);
        return operateLogMapper.queryOperateLogsCount(map);
    }

    @Override
    public int saveOperateLog(OperateLog record) {
        return operateLogMapper.insertSelective(record);
    }
}

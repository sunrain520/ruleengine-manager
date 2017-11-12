package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xiaoniu.dataplatform.ruleengine.entity.WhiteList;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteListKey;
import com.xiaoniu.dataplatform.ruleengine.manager.WhiteListManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.WhiteListMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.IdSplitElement;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import com.xiaoniu.dataplatform.ruleengine.utils.SpiltTableUtil;

/**
 * 白名单仓储管理实现层
 * Created by tanhui on 2016/11/9.
 */
@Component
public class WhiteListManagerImpl implements WhiteListManager {

    private static final String TABLE_PRE_FIX = "t_white_list_";

    @Autowired
    private WhiteListMapper whiteListMapper;

    @Override
    public int saveWhiteList(WhiteList record) {

        String idNum = record.getfIdNum();
        IdSplitElement idSplitElement = SpiltTableUtil.spiltById(TABLE_PRE_FIX, idNum);
        record.setfIdIndex(idSplitElement.getIdIndex());
        record.setTableName(idSplitElement.getTableName());
        record.setfAppId(RuleUtils.getAppId());

        WhiteListKey key = new WhiteListKey();
        key.setfAppId(record.getfAppId());
        key.setfIdNum(record.getfIdNum());
        key.setTableName(idSplitElement.getTableName());

        WhiteList isExist = whiteListMapper.selectByPrimaryKey(key);
        if(isExist != null){ // 更新
            record.setfUpdateTime(new Date());
            record.setfUpdateUser(RuleUtils.getWorkNum());
            return whiteListMapper.updateByPrimaryKeySelective(record);
        }else{ //新增
            record.setfCreateUser(RuleUtils.getWorkNum());
            record.setfUpdateUser(RuleUtils.getWorkNum());
            record.setfState(1);//默认启用
            record.setfCreateTime(new Date());
            record.setfUpdateTime(record.getfCreateTime());
            return whiteListMapper.insertSelective(record);
        }
    }

    @Override
    public List<WhiteList> queryWhiteListByPage(String tableName, String appId, String idNum, String name, String mobile, int pageNum, int pageSize) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("idNum",idNum);
        map.put("name",name);
        map.put("mobile",mobile);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        return whiteListMapper.queryWhiteListByPage(map);
    }

    @Override
    public Integer queryWhiteListCount(String tableName, String appId, String idNum, String name, String mobile) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("idNum",idNum);
        map.put("name",name);
        map.put("mobile",mobile);
        return whiteListMapper.queryWhiteListCount(map);
    }
    
    @Override
    public int deleteWhiteList(WhiteListKey key){
    	String idNum = key.getfIdNum();
    	IdSplitElement idSplitElement = SpiltTableUtil.spiltById(TABLE_PRE_FIX, idNum);
    	key.setTableName(idSplitElement.getTableName());
    	return whiteListMapper.deleteByPrimaryKey(key);
    }
}

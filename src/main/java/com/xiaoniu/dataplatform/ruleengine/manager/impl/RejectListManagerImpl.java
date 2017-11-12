package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.RejectList;
import com.xiaoniu.dataplatform.ruleengine.manager.RejectListManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.RejectListMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.IdSplitElement;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import com.xiaoniu.dataplatform.ruleengine.utils.SpiltTableUtil;
import com.xiaoniu.dataplatform.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * 拒绝名单仓储管理实现层
 * Created by tanhui on 2016/11/9.
 */
@Component
public class RejectListManagerImpl implements RejectListManager {

    private static final String TABLE_PRE_FIX = "t_reject_list_";

    @Autowired
    private RejectListMapper rejectListMapper;

    @Override
    public int saveRejectList(RejectList record) {

        String idNum = record.getfIdNum();
        IdSplitElement idSplitElement = SpiltTableUtil.spiltById(TABLE_PRE_FIX, idNum);
        record.setfIdIndex(idSplitElement.getIdIndex());
        record.setTableName(idSplitElement.getTableName());

        if (record.getfAutoId() == null || record.getfAutoId() == 0) { //新增
            Date d = new Date();
            GregorianCalendar gc = new GregorianCalendar();
            gc.setTime(d);
            gc.add(1, +10); //10年
            record.setfReqId(record.getfAppId()+ MD5.encode(new Date().getTime() + ""));
            record.setfExpireDate(gc.getTime());
            record.setfCreateTime(new Date());
            record.setfUpdateTime(record.getfCreateTime());
            return rejectListMapper.insertSelective(record);
        }
        record.setfUpdateTime(new Date());
        return rejectListMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<RejectList> queryRejectsByPage(String tableName, String appId, String idNum, String ruleId, String reason, int pageNum, int pageSize) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("idNum",idNum);
        map.put("ruleId",ruleId);
        map.put("reason",reason);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        return rejectListMapper.queryRejectsByPage(map);
    }

    @Override
    public Integer queryRejectsCount(String tableName, String appId, String idNum, String ruleId, String reason) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("tableName",tableName);
        map.put("idNum",idNum);
        map.put("ruleId",ruleId);
        map.put("reason",reason);
        return rejectListMapper.queryRejectsCount(map);
    }

	@Override
	public int deleteRejectListById(Integer fAutoId, String idNum) {
        IdSplitElement idSplitElement = SpiltTableUtil.spiltById(TABLE_PRE_FIX, idNum);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("fAutoId",fAutoId);
		map.put("tableName",idSplitElement.getTableName());
		return rejectListMapper.deleteByPrimaryKey(map);
	}
}

package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import org.springframework.stereotype.Component;

/**
 * 规则参数配置
 * Created by tanhui on 2016/11/2.
 */
@Component
public class RuleParamManagerImpl  {
//
//    @Autowired
//    private RuleParamMapper ruleParamMapper;
//
//
//    @Override
//    public List<RuleParam> queryParamsByItem(String appId, String ruleId, Integer itemId) {
//        ruleId = RuleUtils.appendRuleId(appId,ruleId);
//        return ruleParamMapper.queryParamsByItem(appId, ruleId, itemId);
//    }
//
//    @Override
//    public List<RuleParam> queryRuleParamsByPage(String appId, String ruleId, Integer itemId, String paramName, String remark, String paramValue, int pageNum, int pageSize) {
//        ruleId = RuleUtils.appendRuleId(appId,ruleId);
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("appId",appId);
//        map.put("ruleId",ruleId);
//        map.put("itemId",itemId);
//        map.put("paramName",paramName);
//        map.put("remark",remark);
//        map.put("paramValue",paramValue);
//        map.put("pageNum",pageNum);
//        map.put("pageSize",pageSize);
//        return ruleParamMapper.queryRuleParamsByPage(map);
//    }
//
//    @Override
//    public Integer queryRuleParamsCount(String appId, String ruleId, Integer itemId, String paramName, String remark, String paramValue) {
//
//        ruleId = RuleUtils.appendRuleId(appId,ruleId);
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("appId",appId);
//        map.put("ruleId",ruleId);
//        map.put("itemId",itemId);
//        map.put("paramName",paramName);
//        map.put("remark",remark);
//        map.put("paramValue",paramValue);
//        return ruleParamMapper.queryRuleParamsCount(map);
//    }
//
//    @Override
//    public int updateRuleParam(RuleParam param) {
//        String paramValue = param.getfParamValue();
//        if(paramValue != null){
//            paramValue = paramValue.trim();
//        }
//        param.setfParamValue(paramValue);
//        return ruleParamMapper.updateByPrimaryKeySelective(param);
//    }
//
//    @Override
//    public int addRuleParam(RuleParam param) {
//        String ruleId = RuleUtils.appendRuleId(param.getfAppId(),param.getfRuleId());
//        param.setfRuleId(ruleId);
//        String paramValue = param.getfParamValue();
//        if(paramValue != null){
//            paramValue = paramValue.trim();
//        }
//        param.setfParamValue(paramValue);
//        return ruleParamMapper.insertSelective(param);
//    }
//
//    @Override
//    public int deleteParamById(Integer fAutoId) {
//        return ruleParamMapper.deleteByPrimaryKey(fAutoId);
//    }
}

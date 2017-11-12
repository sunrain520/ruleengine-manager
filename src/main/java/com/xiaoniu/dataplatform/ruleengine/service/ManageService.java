package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.dto.ImportCount;
import com.xiaoniu.dataplatform.ruleengine.entity.*;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

import java.util.List;

/**
 * 配置服务的service
 * Created by tanhui on 2016/11/8.
 */
public interface ManageService {

    //-----------------------------------渠道-----------------------------------------------------------------
    RuleEngineResponse<PageResult<Channel>> queryChannelsByPage(String appId, int pageNum, int pageSize);

    RuleEngineResponse<Channel> updateChannel(Channel channel);

    RuleEngineResponse<Channel> addChannel(Channel channel);

    //-------------------------------------关键字------------------------------------------------------------
    RuleEngineResponse<PageResult<Keyword>> queryKeywordsByPage(String appId,  String type, String keyword , int pageNum, int pageSize);

    RuleEngineResponse<Keyword> updateKeyword(Keyword keyword);

    RuleEngineResponse<Keyword> addKeyword(Keyword keyword);

    RuleEngineResponse<String> deleteKeywordById(Integer fAutoId);

    //----------------------------------------拒绝名单-------------------------------------------------------
    RuleEngineResponse<RejectList> saveRejectList(RejectList rejectList);

    RuleEngineResponse<PageResult<RejectList>> queryRejectsByPage(String appId, String idNum, String ruleId, String reason, int pageNum, int pageSize);


    //---------------------------------------规则结果集查询------------------------------------------------------
    RuleEngineResponse<PageResult<RuleResult>> queryRuleResultsByPage(String tableName, String appId, String reqId, String ruleId, String idNum, int pageNum, int pageSize);


    //---------------------------------------原始数据查询------------------------------------------------------
    RuleEngineResponse<PageResult<RawData>> queryRawDatasByPage(String tableName, String appId, String reqId, String ruleId, String interfaceName, int pageNum, int pageSize);


    //----------------------------------------员工信息--------------------------------------------------------
    RuleEngineResponse<EmployeeInfo> queryUserInfo(String workNum);

    //----------------------------------------操作日志-------------------------------------------------------
    RuleEngineResponse<PageResult<OperateLog>> queryOperateLogsByPage(String appId, String module, String operator, int pageNum, int pageSize);

    //----------------------------------------白名单-------------------------------------------------------
    RuleEngineResponse<WhiteList> saveWhiteList(WhiteList whiteList);

    RuleEngineResponse<PageResult<WhiteList>> queryWhiteListByPage(String appId, String idNum, String name, String mobile, int pageNum, int pageSize);

    RuleEngineResponse<ImportCount> importWhiteList(List<List<Object>> whiteList);

    RuleEngineResponse<String> deleteWhiteList(WhiteListKey key);
    
	RuleEngineResponse<String> deleteRejectListById(Integer fAutoId,String idNum);


}

package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.dto.ImportCount;
import com.xiaoniu.dataplatform.ruleengine.entity.Channel;
import com.xiaoniu.dataplatform.ruleengine.entity.CityInfo;
import com.xiaoniu.dataplatform.ruleengine.entity.Keyword;
import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;
import com.xiaoniu.dataplatform.ruleengine.entity.RawData;
import com.xiaoniu.dataplatform.ruleengine.entity.RejectList;
import com.xiaoniu.dataplatform.ruleengine.entity.RuleResult;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteList;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteListKey;
import com.xiaoniu.dataplatform.ruleengine.invoker.HRInvoker;
import com.xiaoniu.dataplatform.ruleengine.manager.ChannelManager;
import com.xiaoniu.dataplatform.ruleengine.manager.KeywordManager;
import com.xiaoniu.dataplatform.ruleengine.manager.OperateLogManager;
import com.xiaoniu.dataplatform.ruleengine.manager.RawDataManager;
import com.xiaoniu.dataplatform.ruleengine.manager.RejectListManager;
import com.xiaoniu.dataplatform.ruleengine.manager.RuleResultManager;
import com.xiaoniu.dataplatform.ruleengine.manager.WhiteListManager;
import com.xiaoniu.dataplatform.ruleengine.service.ManageService;
import com.xiaoniu.dataplatform.ruleengine.utils.IdSplitElement;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.SpiltTableUtil;
import com.xiaoniu.dataplatform.utils.MD5;

/**
 * 配置服务service实现类
 * Created by tanhui on 2016/11/8.
 */
@Service
public class ManageServiceImpl implements ManageService {

    private static final Logger logger = LoggerFactory.getLogger(ManageServiceImpl.class);

    @Autowired
    private ChannelManager channelManager;

    @Autowired
    private KeywordManager keywordManager;

    @Autowired
    private RejectListManager rejectListManager;

    @Autowired
    private RuleResultManager ruleResultManager;

    @Autowired
    private RawDataManager rawDataManager;

    @Autowired
    private OperateLogManager operateLogManager;

    @Autowired
    private WhiteListManager whiteListManager;

    @Autowired
    private HRInvoker hrInvoker;

    private static final String RULERESULT_TABLE_PREFIX = "t_rule_result_";

    private static final String RAWDATA_TABLE_PREFIX = "t_raw_data_";

    private static final String REJECT_TABLE_PRE_FIX = "t_reject_list_";

    private static final String WHITE_TABLE_PRE_FIX = "t_white_list_";

    //定义判别用户身份证号的正则表达式（要么是15位，要么是18位，最后一位可以为字母）
    private static final Pattern idNumPattern = Pattern.compile("(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)");

    //手机正则表达式验证
    private static final Pattern mobilePattern = Pattern.compile("^1[34578]\\d{9}$");


    @Override
    public RuleEngineResponse<PageResult<Channel>> queryChannelsByPage(String appId, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<Channel>> resp = new RuleEngineResponse<PageResult<Channel>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                return new RuleEngineResponse<PageResult<Channel>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            PageResult<Channel> pageResult = new PageResult<Channel>();
            List<Channel> channelList = new ArrayList<Channel>();
            int totalCount = channelManager.queryChannelCount(appId);
            if (totalCount > 0) {
                channelList = channelManager.queryChannelsByAppId(appId, pageNum, pageSize);
            }

            pageResult.setData(channelList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);

        } catch (Exception e) {
            logger.error("queryChannelsByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<Channel>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<Channel> updateChannel(Channel channel) {
        RuleEngineResponse<Channel> resp = new RuleEngineResponse<Channel>(RuleEngineErrorCode.C200);
        try {
            checkChannel(channel);
            channel.setfUpdateTime(new Date());
            channelManager.updateChannel(channel);
            resp.setData(channel);
        } catch (IllegalArgumentException e) {
            logger.error("updateChannel params error,reason:{}", e);
            return new RuleEngineResponse<Channel>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<Channel>(RuleEngineErrorCode.C500);
            logger.error("updateChannel fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<Channel> addChannel(Channel channel) {
        RuleEngineResponse<Channel> resp = new RuleEngineResponse<Channel>(RuleEngineErrorCode.C200);
        try {
            checkChannel(channel);
            channel.setfCreateTime(new Date());
            channel.setfUpdateTime(channel.getfCreateTime());
            channelManager.saveChannel(channel);
            resp.setData(channel);
        } catch (IllegalArgumentException e) {
            logger.error("addChannel params error,reason:{}", e);
            return new RuleEngineResponse<Channel>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<Channel>(RuleEngineErrorCode.C500);
            logger.error("addChannel fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<Keyword>> queryKeywordsByPage(String appId, String type, String keyword, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<Keyword>> resp = new RuleEngineResponse<PageResult<Keyword>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                return new RuleEngineResponse<PageResult<Keyword>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            PageResult<Keyword> pageResult = new PageResult<Keyword>();
            List<Keyword> keywordList = new ArrayList<Keyword>();
            int totalCount = keywordManager.queryKeywordsCount(appId, type, keyword);
            if (totalCount > 0) {
                keywordList = keywordManager.queryKeywordsByPage(appId, type, keyword, pageNum, pageSize);
            }
            pageResult.setData(keywordList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryKeywordsByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<Keyword>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<Keyword> updateKeyword(Keyword keyword) {
        RuleEngineResponse<Keyword> resp = new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C200);
        try {
            checkKeyword(keyword);
            keyword.setfUpdateTime(new Date());
            keywordManager.updateKeyword(keyword);
            resp.setData(keyword);
        } catch (IllegalArgumentException e) {
            logger.error("updateKeyword params error,reason:{}", e);
            return new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C500);
            logger.error("updateKeyword fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<Keyword> addKeyword(Keyword keyword) {
        RuleEngineResponse<Keyword> resp = new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C200);
        try {
            checkKeyword(keyword);
            keyword.setfCreateTime(new Date());
            keyword.setfUpdateTime(keyword.getfCreateTime());
            keywordManager.addKeyword(keyword);
            resp.setData(keyword);
        } catch (IllegalArgumentException e) {
            logger.error("addKeyword params error,reason:{}", e);
            return new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<Keyword>(RuleEngineErrorCode.C500);
            logger.error("addKeyword fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<String> deleteKeywordById(Integer fAutoId) {
        RuleEngineResponse<String> resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C200);
        try {
            if (fAutoId == null || fAutoId <= 0) {
                return new RuleEngineResponse<String>(RuleEngineErrorCode.C400);
            }
            keywordManager.deleteKeyword(fAutoId);
        } catch (Exception e) {
            resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C500);
            logger.error("deleteKeywordById fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<RejectList> saveRejectList(RejectList rejectList) {
        RuleEngineResponse<RejectList> resp = new RuleEngineResponse<RejectList>(RuleEngineErrorCode.C200);
        try {
            checkRejectList(rejectList);
            rejectListManager.saveRejectList(rejectList);
            resp.setData(rejectList);
        } catch (IllegalArgumentException e) {
            logger.error("saveRejectList params error,reason:{}", e);
            return new RuleEngineResponse<RejectList>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<RejectList>(RuleEngineErrorCode.C500);
            logger.error("saveRejectList fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<RejectList>> queryRejectsByPage(String appId, String idNum, String ruleId, String reason, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<RejectList>> resp = new RuleEngineResponse<PageResult<RejectList>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(idNum)) {
                return new RuleEngineResponse<PageResult<RejectList>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            IdSplitElement idSplitElement = SpiltTableUtil.spiltById(REJECT_TABLE_PRE_FIX, idNum);
            String tableName = idSplitElement.getTableName();

            PageResult<RejectList> pageResult = new PageResult<RejectList>();
            List<RejectList> rejectList = new ArrayList<RejectList>();
            int totalCount = rejectListManager.queryRejectsCount(tableName, appId, idNum, ruleId, reason);
            if (totalCount > 0) {
                rejectList = rejectListManager.queryRejectsByPage(tableName, appId, idNum, ruleId, reason, pageNum, pageSize);
            }
            pageResult.setData(rejectList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryRejectsByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<RejectList>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<RuleResult>> queryRuleResultsByPage(String tableName, String appId, String reqId, String ruleId, String idNum, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<RuleResult>> resp = new RuleEngineResponse<PageResult<RuleResult>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                return new RuleEngineResponse<PageResult<RuleResult>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            if (StringUtils.isEmpty(tableName)) {
                tableName = formatTableDate(new Date());
            }

            tableName = RULERESULT_TABLE_PREFIX + tableName;

            PageResult<RuleResult> pageResult = new PageResult<RuleResult>();
            List<RuleResult> ruleResultList = new ArrayList<RuleResult>();
            int totalCount = ruleResultManager.queryRuleResultsCount(tableName, appId, reqId, ruleId, idNum);
            if (totalCount > 0) {
                ruleResultList = ruleResultManager.queryRuleResultsByPage(tableName, appId, reqId, ruleId, idNum, pageNum, pageSize);
            }
            pageResult.setData(ruleResultList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryRuleResultsByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<RuleResult>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<RawData>> queryRawDatasByPage(String tableName, String appId, String reqId, String ruleId, String interfaceName, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<RawData>> resp = new RuleEngineResponse<PageResult<RawData>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                return new RuleEngineResponse<PageResult<RawData>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            if (StringUtils.isEmpty(tableName)) {
                tableName = formatTableDate(new Date());
            }

            tableName = RAWDATA_TABLE_PREFIX + tableName;

            PageResult<RawData> pageResult = new PageResult<RawData>();
            List<RawData> rawDataList = new ArrayList<RawData>();
            int totalCount = rawDataManager.queryRawDatasCount(tableName, appId, reqId, ruleId, interfaceName);
            if (totalCount > 0) {
                rawDataList = rawDataManager.queryRawDatasByPage(tableName, appId, reqId, ruleId, interfaceName, pageNum, pageSize);
            }
            pageResult.setData(rawDataList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryRawDatasByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<RawData>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<EmployeeInfo> queryUserInfo(String workNum) {
        RuleEngineResponse<EmployeeInfo> resp = new RuleEngineResponse<EmployeeInfo>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(workNum)) {
                return new RuleEngineResponse<EmployeeInfo>(RuleEngineErrorCode.C400);
            }
            EmployeeInfo employeeInfo = hrInvoker.queryEmployByWorkNum(workNum);
            resp.setData(employeeInfo);
        } catch (Exception e) {
            resp = new RuleEngineResponse<EmployeeInfo>(RuleEngineErrorCode.C500);
            logger.error("queryUserInfo fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<OperateLog>> queryOperateLogsByPage(String appId, String module, String operator, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<OperateLog>> resp = new RuleEngineResponse<PageResult<OperateLog>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                return new RuleEngineResponse<PageResult<OperateLog>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            PageResult<OperateLog> pageResult = new PageResult<OperateLog>();
            List<OperateLog> operateLogList = new ArrayList<OperateLog>();
            int totalCount = operateLogManager.queryOperateLogsCount(appId, module, operator);
            if (totalCount > 0) {
                operateLogList = operateLogManager.queryOperateLogsByPage(appId, module, operator, pageNum, pageSize);
            }
            pageResult.setData(operateLogList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryOperateLogsByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<OperateLog>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<WhiteList> saveWhiteList(WhiteList whiteList) {
        RuleEngineResponse<WhiteList> resp = new RuleEngineResponse<WhiteList>(RuleEngineErrorCode.C200);
        try {
            checkWhiteList(whiteList);
            whiteListManager.saveWhiteList(whiteList);
            resp.setData(whiteList);
        } catch (IllegalArgumentException e) {
            logger.error("saveWhiteList params error,reason:{}", e);
            return new RuleEngineResponse<WhiteList>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<WhiteList>(RuleEngineErrorCode.C500);
            logger.error("saveWhiteList fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<PageResult<WhiteList>> queryWhiteListByPage(String appId, String idNum, String name, String mobile, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<WhiteList>> resp = new RuleEngineResponse<PageResult<WhiteList>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(idNum)) {
                return new RuleEngineResponse<PageResult<WhiteList>>(RuleEngineErrorCode.C400);
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;

            IdSplitElement idSplitElement = SpiltTableUtil.spiltById(WHITE_TABLE_PRE_FIX, idNum);
            String tableName = idSplitElement.getTableName();

            PageResult<WhiteList> pageResult = new PageResult<WhiteList>();
            List<WhiteList> whiteList = new ArrayList<WhiteList>();
            int totalCount = whiteListManager.queryWhiteListCount(tableName, appId, idNum, name, mobile);
            if (totalCount > 0) {
                whiteList = whiteListManager.queryWhiteListByPage(tableName, appId, idNum, name, mobile, pageNum, pageSize);
            }
            pageResult.setData(whiteList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
            logger.error("queryWhiteListByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<WhiteList>>(RuleEngineErrorCode.C500);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<ImportCount> importWhiteList(List<List<Object>> whiteList) {
        RuleEngineResponse<ImportCount> resp = new RuleEngineResponse<ImportCount>(RuleEngineErrorCode.C200);
        ImportCount importCount = new ImportCount();
        int successCount = 0;
        int failCount = 0;
        try {
            if (CollectionUtils.isNotEmpty(whiteList)) {
                for (int i = 0; i < whiteList.size(); i++) {
                    List<Object> lo = whiteList.get(i);
                    String name = String.valueOf(lo.get(0));
                    String idNum = String.valueOf(lo.get(1));
                    String mobile = String.valueOf(lo.get(2));
                    String type = String.valueOf(lo.get(3));
                    String company = String.valueOf(lo.get(4));
                    String positon = String.valueOf(lo.get(5));
                    if(checkImport(idNum,mobile,name) == false){
                        failCount ++;
                        continue;
                    }
                    int whiteListType = 1;
                    int state = 1;
                    if (StringUtils.isNotEmpty(type)) {
                        if (type.equals("集团白名单")) {
                            whiteListType = 1;
                        }
                    }
                    WhiteList wl = new WhiteList();
                    wl.setfIdNum(idNum);
                    wl.setfName(name);
                    wl.setfMobile(mobile);
                    wl.setfCompany(company);
                    wl.setfPosition(positon);
                    wl.setfType(whiteListType);
                    wl.setfState(state);
                    wl.setfRemark("import_" + MD5.encode(new Date().getTime() + "")); //导入流水号
                    whiteListManager.saveWhiteList(wl);
                    successCount ++;
                }
            }
            importCount.setSuccessCount(successCount);
            importCount.setFailCount(failCount);
            resp.setData(importCount);
        } catch (IllegalArgumentException e) {
            logger.error("importWhiteList params error,reason:{}", e);
            return new RuleEngineResponse<ImportCount>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<ImportCount>(RuleEngineErrorCode.C500);
            logger.error("importWhiteList fail,reason:{}", e);
        }
        return resp;
    }

    private boolean checkImport(String idNum, String mobile, String name) {
        boolean flag = true;
        if(StringUtils.isEmpty(idNum) || StringUtils.isEmpty(mobile) || StringUtils.isEmpty(name)){
            return false;
        }
        Matcher matcher = idNumPattern.matcher(idNum);
        if(matcher.find() == false){
            return false;
        }
        matcher = mobilePattern.matcher(mobile);
        if(matcher.find() == false){
            return false;
        }
        return flag;
    }

    private void checkChannel(Channel channel) throws Exception {
        checkArgument(channel != null, "渠道信息不能为空");
        checkArgument(StringUtils.isNotEmpty(channel.getfAppId()), "业务ID不能为空");
        checkArgument(StringUtils.isNotEmpty(channel.getfChannelId()), "渠道ID不能为空");
    }

    private void checkKeyword(Keyword keyword) throws Exception {
        checkArgument(keyword != null, "关键字信息不能为空");
        checkArgument(StringUtils.isNotEmpty(keyword.getfAppId()), "业务ID不能为空");
        checkArgument(StringUtils.isNotEmpty(keyword.getfType()), "类型不能为空");
        checkArgument(StringUtils.isNotEmpty(keyword.getfKeywordList()), "关键字列表不能为空");
    }

    private void checkCityInfo(CityInfo cityInfo) throws Exception {
        checkArgument(cityInfo != null, "城市信息不能为空");
        checkArgument(StringUtils.isNotEmpty(cityInfo.getfAppId()), "业务ID不能为空");
        checkArgument((cityInfo.getfCityCode() != null), "城市编码不能为空");
        checkArgument(StringUtils.isNotEmpty(cityInfo.getfClassification()), "城市级别定义不能为空");
    }

    private void checkRejectList(RejectList rejectList) throws Exception {
        checkArgument(rejectList != null, "拒绝名单信息不能为空");
        checkArgument(StringUtils.isNotEmpty(rejectList.getfIdNum()), "身份证信息不能为空");
    }

    private void checkWhiteList(WhiteList whiteList) throws Exception {
        checkArgument(whiteList != null, "白名单信息不能为空");
        checkArgument(StringUtils.isNotEmpty(whiteList.getfIdNum()), "身份证信息不能为空");
        checkArgument(StringUtils.isNotEmpty(whiteList.getfName()), "姓名不能为空");
        checkArgument(StringUtils.isNotEmpty(whiteList.getfMobile()), "手机号不能为空");
    }

    private void checkOperateLog(OperateLog operateLog) throws Exception {
        checkArgument(operateLog != null, "操作日志信息不能为空");
        checkArgument(StringUtils.isNotEmpty(operateLog.getfAppId()), "业务ID不能为空");
        checkArgument((operateLog.getfOperator() != null), "操作人不能为空");
    }

    public static String formatTableDate(Date date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM");
        return sdf.format(date);
    }

	@Override
	public RuleEngineResponse<String> deleteWhiteList(WhiteListKey key) {
		if (key == null || StringUtils.isEmpty(key.getfAppId()) || 
				StringUtils.isEmpty(key.getfIdNum()) || key.getfIdIndex() == null) {
			return new RuleEngineResponse<String>(RuleEngineErrorCode.C400);
		}

		RuleEngineErrorCode code = RuleEngineErrorCode.C200;
		try {
			whiteListManager.deleteWhiteList(key);
		} catch (Exception e) {
			code = RuleEngineErrorCode.C500;
			logger.error("deleteWhiteList fail,reason:{}", e);
		}
		return new RuleEngineResponse<String>(code);
	}

	@Override
	public RuleEngineResponse<String> deleteRejectListById(Integer fAutoId, String idNum) {
		RuleEngineErrorCode code = RuleEngineErrorCode.C200;
		try {
			rejectListManager.deleteRejectListById(fAutoId,idNum);
		} catch (Exception e) {
			code = RuleEngineErrorCode.C500;
			logger.error("deleteWhiteList fail,reason:{}", e);
		}
		return new RuleEngineResponse<String>(code);
	}
    
    
}

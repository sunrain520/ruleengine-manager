package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItem;
import com.xiaoniu.dataplatform.ruleengine.entity.ScoreCardDegree;
import com.xiaoniu.dataplatform.ruleengine.manager.RuleItemManager;
import com.xiaoniu.dataplatform.ruleengine.manager.ScoreDegreeManager;
import com.xiaoniu.dataplatform.ruleengine.service.RuleEngineService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/**
 * 规则引擎service层
 * Created by tanhui on 2016/11/1.
 */
@Service
public class RuleEngineServiceImpl implements RuleEngineService {

    private static final Logger logger = LoggerFactory.getLogger(RuleEngineServiceImpl.class);

    @Autowired
    private RuleItemManager ruleItemManager;

    @Autowired
    private ScoreDegreeManager scoreDegreeManager;


    @Override
    public RuleEngineResponse<PageResult<RuleItem>> queryRuleItemsByPage(String appId, String ruleId, Integer itemId, String express, String remark, String paramList, int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<RuleItem>> resp = new RuleEngineResponse<PageResult<RuleItem>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(ruleId)) {
                resp = new RuleEngineResponse<PageResult<RuleItem>>(RuleEngineErrorCode.C400);
                return resp;
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;
            PageResult<RuleItem> pageResult = new PageResult<RuleItem>();
            List<RuleItem> ruleItemList = new ArrayList<RuleItem>();

            Integer count = ruleItemManager.queryRuleItemsCount(appId, ruleId, itemId, express, remark, paramList);
            if (count != null && count > 0) {
                ruleItemList = ruleItemManager.queryRuleItemsByPage(appId, ruleId, itemId, express, remark, paramList, pageNum, pageSize);
            }

            pageResult.setTotal(count);
            pageResult.setData(ruleItemList);
            resp.setData(pageResult);
        } catch (Exception e) {
            resp = new RuleEngineResponse<PageResult<RuleItem>>(RuleEngineErrorCode.C500);
            logger.error("queryRuleItemsByPage fail ,reason : {}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<RuleItem> queryRuleItem(String appId, String ruleId, Integer itemId) {
        RuleEngineResponse<RuleItem> resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(ruleId) || itemId == null || itemId < 0) {
                resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C400);
                return resp;
            }
            RuleItem ruleItem = ruleItemManager.queryRuleItem(appId, ruleId, itemId);
            resp.setData(ruleItem);
        } catch (Exception e) {
            resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C500);
            logger.error("queryRuleItem fail ,reason : {}", e);
        }
        return resp;
    }

//    @Override
//    public RuleEngineResponse<PageResult<RuleParam>> queryParamsByItem(String appId, String ruleId, Integer itemId) {
//        RuleEngineResponse<PageResult<RuleParam>> resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C200);
//        try {
//            if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(ruleId)) {
//                resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C400);
//                return resp;
//            }
//            if (itemId == null || itemId < 0) {
//                resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C400);
//                return resp;
//            }
//            PageResult<RuleParam> pageResult = new PageResult<RuleParam>();
//            int count;
//            List<RuleParam> ruleParams = ruleParamManager.queryParamsByItem(appId, ruleId, itemId);
//            if (CollectionUtils.isEmpty(ruleParams)) {
//                ruleParams = new ArrayList<RuleParam>();
//            }
//            count = ruleParams.size();
//            pageResult.setTotal(count);
//            pageResult.setData(ruleParams);
//            resp.setData(pageResult);
//        } catch (Exception e) {
//            resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C500);
//            logger.error("queryParamsByItem fail ,reason : {}", e);
//        }
//        return resp;
//    }

    @Override
    public RuleEngineResponse<RuleItem> updateRuleItem(RuleItem item) {
        RuleEngineResponse<RuleItem> resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C200);
        try {
            checkRuleItemArgument(item);
            item.setfUpdateTime(new Date());
            //检查item id是否存在
            RuleItem existItem = ruleItemManager.queryRuleItem(item.getfAppId(),item.getfRuleId(),item.getfRuleItemId());
            if (existItem != null && existItem.getfAutoId().intValue() != item.getfAutoId().intValue()) {
                return new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.itemidexist);
            }
            ruleItemManager.updateRuleItem(item);
            resp.setData(item);
        } catch (IllegalArgumentException e) {
            logger.error("updateRuleItem params error,reason:{}", e);
            return new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C500);
            logger.error("updateRuleItem fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<RuleItem> addRuleItem(RuleItem item) {
        RuleEngineResponse<RuleItem> resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C200);
        try {
            checkRuleItemArgument(item);
            item.setfCreateTime(new Date());
            item.setfUpdateTime(item.getfCreateTime());
            //检查item id是否存在
            int count = ruleItemManager.queryItemIdExist(item.getfAppId(), item.getfRuleId(), item.getfRuleItemId());
            if (count > 0) {
                return new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.itemidexist);
            }
            ruleItemManager.addRuleItem(item);
            resp.setData(item);
        } catch (IllegalArgumentException e) {
            logger.error("addRuleItem params error,reason:{}", e);
            return new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<RuleItem>(RuleEngineErrorCode.C500);
            logger.error("addRuleItem fail,reason:{}", e);
        }
        return resp;
    }

//    @Override
//    public RuleEngineResponse<PageResult<RuleParam>> queryRuleParamsByPage(String appId, String ruleId, Integer itemId, String paramName, String remark, String paramValue, int pageNum, int pageSize) {
//        RuleEngineResponse<PageResult<RuleParam>> resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C200);
//        try {
//            if (StringUtils.isEmpty(appId)) {
//                resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C400);
//                return resp;
//            }
//            if (pageNum < 1) {
//                pageNum = 1;
//            }
//            if (pageSize > 100) {
//                pageSize = 100;
//            }
//            pageNum = (pageNum - 1) * pageSize;
//            PageResult<RuleParam> pageResult = new PageResult<RuleParam>();
//            List<RuleParam> ruleParamList = new ArrayList<RuleParam>();
//
//            Integer count = ruleParamManager.queryRuleParamsCount(appId, ruleId, itemId, paramName, remark, paramValue);
//            if (count != null && count > 0) {
//                ruleParamList = ruleParamManager.queryRuleParamsByPage(appId, ruleId, itemId, paramName, remark, paramValue, pageNum, pageSize);
//            }
//            pageResult.setTotal(count);
//            pageResult.setData(ruleParamList);
//            resp.setData(pageResult);
//        } catch (Exception e) {
//            resp = new RuleEngineResponse<PageResult<RuleParam>>(RuleEngineErrorCode.C500);
//            logger.error("queryRuleParamsByPage fail ,reason : {}", e);
//        }
//        return resp;
//    }
//
//    @Override
//    public RuleEngineResponse<RuleParam> updateRuleParam(RuleParam param) {
//        RuleEngineResponse<RuleParam> resp = new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C200);
//        try {
//            checkRuleParamArgument(param);
//            param.setfUpdateTime(new Date());
//            ruleParamManager.updateRuleParam(param);
//            resp.setData(param);
//        } catch (IllegalArgumentException e) {
//            logger.error("updateRuleParam params error,reason:{}", e);
//            return new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C400);
//        } catch (Exception e) {
//            resp = new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C500);
//            logger.error("updateRuleParam fail,reason:{}", e);
//        }
//        return resp;
//    }
//
//    @Override
//    public RuleEngineResponse<RuleParam> addRuleParam(RuleParam param) {
//        RuleEngineResponse<RuleParam> resp = new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C200);
//        try {
//            checkRuleParamArgument(param);
//            param.setfCreateTime(new Date());
//            param.setfUpdateTime(param.getfCreateTime());
//            ruleParamManager.addRuleParam(param);
//            resp.setData(param);
//        } catch (IllegalArgumentException e) {
//            logger.error("addRuleParam params error,reason:{}", e);
//            return new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C400);
//        } catch (Exception e) {
//            resp = new RuleEngineResponse<RuleParam>(RuleEngineErrorCode.C500);
//            logger.error("addRuleItem fail,reason:{}", e);
//        }
//        return resp;
//    }

    @Override
    public RuleEngineResponse<PageResult<ScoreCardDegree>> queryScoreDegreesByPage(String appId,String ruleId,Integer itemId,String degree,String remark , int pageNum, int pageSize) {
        RuleEngineResponse<PageResult<ScoreCardDegree>> resp = new RuleEngineResponse<PageResult<ScoreCardDegree>>(RuleEngineErrorCode.C200);
        try {
            if (StringUtils.isEmpty(appId)) {
                resp = new RuleEngineResponse<PageResult<ScoreCardDegree>>(RuleEngineErrorCode.C400);
                return resp;
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageSize > 100) {
                pageSize = 100;
            }
            pageNum = (pageNum - 1) * pageSize;
            PageResult<ScoreCardDegree> pageResult = new PageResult<ScoreCardDegree>();
            List<ScoreCardDegree> scoreCardDegreeList = new ArrayList<ScoreCardDegree>();

            Integer count = scoreDegreeManager.queryScoreDegreesCount(appId, ruleId, itemId, degree, remark);
            if (count != null && count > 0) {
                scoreCardDegreeList = scoreDegreeManager.queryScoreDegreesByPage(appId, ruleId, itemId, degree, remark, pageNum, pageSize);
            }
            pageResult.setTotal(count);
            pageResult.setData(scoreCardDegreeList);
            resp.setData(pageResult);
        } catch (Exception e) {
            resp = new RuleEngineResponse<PageResult<ScoreCardDegree>>(RuleEngineErrorCode.C500);
            logger.error("queryScoreDegreesByPage fail ,reason : {}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<ScoreCardDegree> updateScoreDegree(ScoreCardDegree score) {
        RuleEngineResponse<ScoreCardDegree> resp = new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C200);
        try {
            checkScoreArgument(score);
            score.setfUpdateTime(new Date());
            scoreDegreeManager.updateScoreDegree(score);
            resp.setData(score);
        } catch (IllegalArgumentException e) {
            logger.error("updateScoreDegree params error,reason:{}", e);
            return new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C500);
            logger.error("updateRuleParam fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<ScoreCardDegree> addScoreDegree(ScoreCardDegree score) {
        RuleEngineResponse<ScoreCardDegree> resp = new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C200);
        try {
            checkScoreArgument(score);
            score.setfCreateTime(new Date());
            score.setfUpdateTime(score.getfCreateTime());
            scoreDegreeManager.addScoreDegree(score);
            resp.setData(score);
        } catch (IllegalArgumentException e) {
            logger.error("addScoreDegree params error,reason:{}", e);
            return new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<ScoreCardDegree>(RuleEngineErrorCode.C500);
            logger.error("addScoreDegree fail,reason:{}", e);
        }
        return resp;
    }

    @Override
    public RuleEngineResponse<String> deleteScoreById(Integer fAutoId) {
        RuleEngineResponse<String> resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C200);
        try {
           if(fAutoId == null || fAutoId <= 0){
               return new RuleEngineResponse<String>(RuleEngineErrorCode.C400);
           }
           scoreDegreeManager.deleteScoreById(fAutoId);
        }catch (Exception e) {
            resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C500);
            logger.error("deleteScoreById fail,reason:{}", e);
        }
        return resp;
    }

//    @Override
//    public RuleEngineResponse<String> deleteParamById(Integer fAutoId) {
//        RuleEngineResponse<String> resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C200);
//        try {
//            if(fAutoId == null || fAutoId <= 0){
//                return new RuleEngineResponse<String>(RuleEngineErrorCode.C400);
//            }
//            ruleParamManager.deleteParamById(fAutoId);
//        }catch (Exception e) {
//            resp = new RuleEngineResponse<String>(RuleEngineErrorCode.C500);
//            logger.error("deleteParamById fail,reason:{}", e);
//        }
//        return resp;
//    }

    private void checkRuleItemArgument(RuleItem item) throws Exception {
        checkArgument(item != null, "规则项信息不能为空");
        checkArgument(StringUtils.isNotEmpty(item.getfAppId()), "业务ID不能为空");
        checkArgument(StringUtils.isNotEmpty(item.getfRuleId()), "规则ID不能为空");
        checkArgument((item.getfRuleItemId() != null), "规则项ID不能为空");
    }

//    private void checkRuleParamArgument(RuleParam param) throws Exception {
//        checkArgument(param != null, "规则参数信息不能为空");
//        checkArgument(StringUtils.isNotEmpty(param.getfAppId()), "业务ID不能为空");
//        checkArgument(StringUtils.isNotEmpty(param.getfRuleId()), "规则ID不能为空");
//        checkArgument((param.getfRuleItemId() != null), "规则项ID不能为空");
//    }

    private void checkScoreArgument(ScoreCardDegree score) throws Exception {
        checkArgument(score != null, "规则参数信息不能为空");
        checkArgument(StringUtils.isNotEmpty(score.getfAppId()), "业务ID不能为空");
        checkArgument(StringUtils.isNotEmpty(score.getfRuleId()), "规则ID不能为空");
        checkArgument((score.getfRuleItemId() != null), "规则项ID不能为空");
    }
}

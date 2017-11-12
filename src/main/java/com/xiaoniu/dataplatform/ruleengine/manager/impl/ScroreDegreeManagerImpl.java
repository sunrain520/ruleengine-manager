package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.ScoreCardDegree;
import com.xiaoniu.dataplatform.ruleengine.manager.ScoreDegreeManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.ScoreCardDegreeMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 评分卡等级仓储管理层
 * Created by tanhui on 2016/11/3.
 */
@Component
public class ScroreDegreeManagerImpl implements ScoreDegreeManager{

    @Autowired
    private ScoreCardDegreeMapper scoreCardDegreeMapper;

    @Override
    public List<ScoreCardDegree> queryScoreDegreesByPage(String appId,String ruleId,Integer itemId,String degree,String remark,int pageNum, int pageSize) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("ruleId",ruleId);
        map.put("itemId",itemId);
        map.put("degree",degree);
        map.put("remark",remark);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        return scoreCardDegreeMapper.queryScoreDegreesByPage(map);
    }

    @Override
    public Integer queryScoreDegreesCount(String appId,String ruleId,Integer itemId,String degree,String remark) {
        ruleId = RuleUtils.appendRuleId(appId,ruleId);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("ruleId",ruleId);
        map.put("itemId",itemId);
        map.put("degree",degree);
        map.put("remark",remark);
        return scoreCardDegreeMapper.queryScoreDegreesCount(map);
    }

    @Override
    public int updateScoreDegree(ScoreCardDegree score) {
        return scoreCardDegreeMapper.updateByPrimaryKeySelective(score);
    }

    @Override
    public int addScoreDegree(ScoreCardDegree score) {
        return scoreCardDegreeMapper.insertSelective(score);
    }

    @Override
    public int deleteScoreById(Integer fAutoId) {
        return scoreCardDegreeMapper.deleteByPrimaryKey(fAutoId);
    }
}

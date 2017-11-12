package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.ScoreCardDegree;

import java.util.List;

/**
 * Created by tanhui on 2016/11/3.
 */
public interface ScoreDegreeManager {

    List<ScoreCardDegree> queryScoreDegreesByPage(String appId,String ruleId,Integer itemId,String degree,String remark,int pageNum, int pageSize);

    Integer queryScoreDegreesCount(String appId,String ruleId,Integer itemId,String degree,String remark);

    int updateScoreDegree(ScoreCardDegree score);

    int addScoreDegree(ScoreCardDegree score);

    int deleteScoreById(Integer fAutoId);
}

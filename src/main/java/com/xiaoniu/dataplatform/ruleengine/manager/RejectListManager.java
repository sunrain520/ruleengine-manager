package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.RejectList;

import java.util.List;

/**
 * Created by tanhui on 2016/11/9.
 */
public interface RejectListManager {
    int saveRejectList(RejectList record);

    List<RejectList> queryRejectsByPage(String tableName, String appId, String idNum, String ruleId, String reason, int pageNum, int pageSize);

    Integer queryRejectsCount(String tableName, String appId, String idNum, String ruleId, String reason);

	int deleteRejectListById(Integer fAutoId, String idNum);
}

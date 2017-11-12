package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RuleItemMapper {
    int insert(RuleItem record);

    int insertSelective(RuleItem record);

    RuleItem selectByPrimaryKey(Integer fAutoId);

    int updateRuleItem(RuleItem record);

    int updateByPrimaryKey(RuleItem record);

    List<RuleItem> queryRuleItemsByPage(Map<String,Object> map);

    Integer queryRuleItemsCount(Map<String,Object> map);

    RuleItem queryRuleItem(@Param("appId") String appId, @Param("ruleId") String ruleId,@Param("itemId") Integer itemId);

    int queryItemIdExist(@Param("appId") String appId, @Param("ruleId") String ruleId,@Param("itemId") Integer itemId);
}
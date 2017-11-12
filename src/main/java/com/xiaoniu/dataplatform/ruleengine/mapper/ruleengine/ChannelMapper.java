package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.Channel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ChannelMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(Channel record);

    int insertSelective(Channel record);

    Channel selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(Channel record);

    int updateByPrimaryKey(Channel record);

    List<Channel> queryChannelsByAppId(@Param("appId")String appId,@Param("pageNum") int pageNum,@Param("pageSize") int pageSize);

    int queryChannelCount(@Param("appId")String appId);
}
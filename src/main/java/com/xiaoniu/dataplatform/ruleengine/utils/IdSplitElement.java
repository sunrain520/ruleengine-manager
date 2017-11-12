package com.xiaoniu.dataplatform.ruleengine.utils;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * 
 * @author rendongfu
 * @date 2016-10-08
 * @description 按身份证分表的拆分元素
 */
public class IdSplitElement {

    private String idNum;       //身份证号
    private Long idIndex;       //身份证号索引
    private String tableName;   //表名
    
    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this,ToStringStyle.SHORT_PREFIX_STYLE);
    }

    public String getIdNum() {
        return idNum;
    }

    public void setIdNum(String idNum) {
        this.idNum = idNum;
    }

    public Long getIdIndex() {
        return idIndex;
    }

    public void setIdIndex(Long idIndex) {
        this.idIndex = idIndex;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

}

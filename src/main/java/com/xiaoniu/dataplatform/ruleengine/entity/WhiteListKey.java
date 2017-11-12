package com.xiaoniu.dataplatform.ruleengine.entity;

public class WhiteListKey {
    private String fIdNum;

    private Long fIdIndex;

    private String fAppId;

    private String tableName;

    public String getfIdNum() {
        return fIdNum;
    }

    public void setfIdNum(String fIdNum) {
        this.fIdNum = fIdNum == null ? null : fIdNum.trim();
    }

    public Long getfIdIndex() {
        return fIdIndex;
    }

    public void setfIdIndex(Long fIdIndex) {
        this.fIdIndex = fIdIndex;
    }

    public String getfAppId() {
        return fAppId;
    }

    public void setfAppId(String fAppId) {
        this.fAppId = fAppId == null ? null : fAppId.trim();
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
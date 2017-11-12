package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RuleItemLogic {
    private Integer fAutoId;

    private String fRuleExpression;

    private String fRuleVariableList;

    private String fRuleParamList;

    private String fRemark;

    private Byte fBlacklistType;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;

    public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public String getfRuleExpression() {
        return fRuleExpression;
    }

    public void setfRuleExpression(String fRuleExpression) {
        this.fRuleExpression = fRuleExpression == null ? null : fRuleExpression.trim();
    }

    public String getfRuleVariableList() {
        return fRuleVariableList;
    }

    public void setfRuleVariableList(String fRuleVariableList) {
        this.fRuleVariableList = fRuleVariableList == null ? null : fRuleVariableList.trim();
    }

    public String getfRuleParamList() {
        return fRuleParamList;
    }

    public void setfRuleParamList(String fRuleParamList) {
        this.fRuleParamList = fRuleParamList == null ? null : fRuleParamList.trim();
    }

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark == null ? null : fRemark.trim();
    }

    public Byte getfBlacklistType() {
        return fBlacklistType;
    }

    public void setfBlacklistType(Byte fBlacklistType) {
        this.fBlacklistType = fBlacklistType;
    }

    public Date getfCreateTime() {
        return fCreateTime;
    }

    public void setfCreateTime(Date fCreateTime) {
        this.fCreateTime = fCreateTime;
    }

    public String getfCreateUser() {
        return fCreateUser;
    }

    public void setfCreateUser(String fCreateUser) {
        this.fCreateUser = fCreateUser == null ? null : fCreateUser.trim();
    }

    public Date getfUpdateTime() {
        return fUpdateTime;
    }

    public void setfUpdateTime(Date fUpdateTime) {
        this.fUpdateTime = fUpdateTime;
    }

    public String getfUpdateUser() {
        return fUpdateUser;
    }

    public void setfUpdateUser(String fUpdateUser) {
        this.fUpdateUser = fUpdateUser == null ? null : fUpdateUser.trim();
    }
}
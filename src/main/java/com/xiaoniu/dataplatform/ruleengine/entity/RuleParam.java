package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RuleParam {
    private Integer fAutoId;

    private Integer fRuleItemId;

    private String fParamName;

    private String fParamType;

    private String fParamValue;

    private String fRemark;

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

    public Integer getfRuleItemId() {
        return fRuleItemId;
    }

    public void setfRuleItemId(Integer fRuleItemId) {
        this.fRuleItemId = fRuleItemId;
    }

    public String getfParamName() {
        return fParamName;
    }

    public void setfParamName(String fParamName) {
        this.fParamName = fParamName == null ? null : fParamName.trim();
    }

    public String getfParamType() {
        return fParamType;
    }

    public void setfParamType(String fParamType) {
        this.fParamType = fParamType == null ? null : fParamType.trim();
    }

    public String getfParamValue() {
        return fParamValue;
    }

    public void setfParamValue(String fParamValue) {
        this.fParamValue = fParamValue == null ? null : fParamValue.trim();
    }

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark == null ? null : fRemark.trim();
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
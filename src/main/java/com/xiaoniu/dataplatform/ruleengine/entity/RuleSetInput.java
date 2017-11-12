package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RuleSetInput {
    private Integer fAutoId;

    private Integer fRuleSetId;

    private String fFieldName;

    private String fRemark;

    private Boolean fIsRequired;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;
    
    private String fRuleSetName;

    public String getfRuleSetName() {
		return fRuleSetName;
	}

	public void setfRuleSetName(String fRuleSetName) {
		this.fRuleSetName = fRuleSetName;
	}

	public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public Integer getfRuleSetId() {
        return fRuleSetId;
    }

    public void setfRuleSetId(Integer fRuleSetId) {
        this.fRuleSetId = fRuleSetId;
    }

    public String getfFieldName() {
        return fFieldName;
    }

    public void setfFieldName(String fFieldName) {
        this.fFieldName = fFieldName == null ? null : fFieldName.trim();
    }

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark == null ? null : fRemark.trim();
    }

    public Boolean getfIsRequired() {
        return fIsRequired;
    }

    public void setfIsRequired(Boolean fIsRequired) {
        this.fIsRequired = fIsRequired;
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
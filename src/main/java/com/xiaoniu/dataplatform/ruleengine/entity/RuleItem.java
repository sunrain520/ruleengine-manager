package com.xiaoniu.dataplatform.ruleengine.entity;

import java.io.Serializable;
import java.util.Date;

public class RuleItem implements Serializable{
    private static final long serialVersionUID = 7988657230915073712L;

    private Integer fAutoId;

    private String fAppId;

    private String fRuleId;

    private Integer fRuleItemId;

    private String fRuleExpression;

    private String fRuleVariableList;

    private String fRuleParamList;

    private Double fRulePassScore;

    private Double fRuleRejectScore;

    private Double fRuleNodataScore;

    private Integer fState;

    private String fRemark;

    private Integer fIsExclusive;

    private Integer fPassCondition;

    private Integer fPostHandle;

    private Integer fPostHandleExpireDay;

    private String fPostHandleReason;

    private Integer fBlacklistType;

    private Integer fFrequency;

    private Integer fCheckVariableNull;

    private Integer fNodataHandle;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;

    private Integer fEncrypt;

    private Integer fVersion;

    private Integer fFrequencyMode;

    public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public String getfAppId() {
        return fAppId;
    }

    public void setfAppId(String fAppId) {
        this.fAppId = fAppId;
    }

    public String getfRuleId() {
        return fRuleId;
    }

    public void setfRuleId(String fRuleId) {
        this.fRuleId = fRuleId;
    }

    public Integer getfRuleItemId() {
        return fRuleItemId;
    }

    public void setfRuleItemId(Integer fRuleItemId) {
        this.fRuleItemId = fRuleItemId;
    }

    public String getfRuleExpression() {
        return fRuleExpression;
    }

    public void setfRuleExpression(String fRuleExpression) {
        this.fRuleExpression = fRuleExpression;
    }

    public String getfRuleVariableList() {
        return fRuleVariableList;
    }

    public void setfRuleVariableList(String fRuleVariableList) {
        this.fRuleVariableList = fRuleVariableList;
    }

    public String getfRuleParamList() {
        return fRuleParamList;
    }

    public void setfRuleParamList(String fRuleParamList) {
        this.fRuleParamList = fRuleParamList;
    }

    public Double getfRulePassScore() {
        return fRulePassScore;
    }

    public void setfRulePassScore(Double fRulePassScore) {
        this.fRulePassScore = fRulePassScore;
    }

    public Double getfRuleRejectScore() {
        return fRuleRejectScore;
    }

    public void setfRuleRejectScore(Double fRuleRejectScore) {
        this.fRuleRejectScore = fRuleRejectScore;
    }

    public Double getfRuleNodataScore() {
        return fRuleNodataScore;
    }

    public void setfRuleNodataScore(Double fRuleNodataScore) {
        this.fRuleNodataScore = fRuleNodataScore;
    }

    public Integer getfState() {
        return fState;
    }

    public void setfState(Integer fState) {
        this.fState = fState;
    }

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark;
    }

    public Integer getfIsExclusive() {
        return fIsExclusive;
    }

    public void setfIsExclusive(Integer fIsExclusive) {
        this.fIsExclusive = fIsExclusive;
    }

    public Integer getfPassCondition() {
        return fPassCondition;
    }

    public void setfPassCondition(Integer fPassCondition) {
        this.fPassCondition = fPassCondition;
    }

    public Integer getfPostHandle() {
        return fPostHandle;
    }

    public void setfPostHandle(Integer fPostHandle) {
        this.fPostHandle = fPostHandle;
    }

    public Integer getfPostHandleExpireDay() {
        return fPostHandleExpireDay;
    }

    public void setfPostHandleExpireDay(Integer fPostHandleExpireDay) {
        this.fPostHandleExpireDay = fPostHandleExpireDay;
    }

    public String getfPostHandleReason() {
        return fPostHandleReason;
    }

    public void setfPostHandleReason(String fPostHandleReason) {
        this.fPostHandleReason = fPostHandleReason;
    }

    public Integer getfBlacklistType() {
        return fBlacklistType;
    }

    public void setfBlacklistType(Integer fBlacklistType) {
        this.fBlacklistType = fBlacklistType;
    }

    public Integer getfFrequency() {
        return fFrequency;
    }

    public void setfFrequency(Integer fFrequency) {
        this.fFrequency = fFrequency;
    }

    public Integer getfCheckVariableNull() {
        return fCheckVariableNull;
    }

    public void setfCheckVariableNull(Integer fCheckVariableNull) {
        this.fCheckVariableNull = fCheckVariableNull;
    }

    public Integer getfNodataHandle() {
        return fNodataHandle;
    }

    public void setfNodataHandle(Integer fNodataHandle) {
        this.fNodataHandle = fNodataHandle;
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
        this.fCreateUser = fCreateUser;
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
        this.fUpdateUser = fUpdateUser;
    }

    public Integer getfEncrypt() {
        return fEncrypt;
    }

    public void setfEncrypt(Integer fEncrypt) {
        this.fEncrypt = fEncrypt;
    }

    public Integer getfVersion() {
        return fVersion;
    }

    public void setfVersion(Integer fVersion) {
        this.fVersion = fVersion;
    }

    public Integer getfFrequencyMode() {
        return fFrequencyMode;
    }

    public void setfFrequencyMode(Integer fFrequencyMode) {
        this.fFrequencyMode = fFrequencyMode;
    }
}
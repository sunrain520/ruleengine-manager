package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RawData {
    private Integer fAutoId;

    private String fAppId;

    private String fReqId;

    private String fRuleId;

    private String fInterfaceName;

    private Integer fRespRetcode;

    private Integer fCostTime;

    private String fDataSource;

    private String fRemark;

    private Date fCreateTime;

    private String fReqContent;

    private String fRespContent;

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
        this.fAppId = fAppId == null ? null : fAppId.trim();
    }

    public String getfReqId() {
        return fReqId;
    }

    public void setfReqId(String fReqId) {
        this.fReqId = fReqId == null ? null : fReqId.trim();
    }

    public String getfRuleId() {
        return fRuleId;
    }

    public void setfRuleId(String fRuleId) {
        this.fRuleId = fRuleId == null ? null : fRuleId.trim();
    }

    public String getfInterfaceName() {
        return fInterfaceName;
    }

    public void setfInterfaceName(String fInterfaceName) {
        this.fInterfaceName = fInterfaceName == null ? null : fInterfaceName.trim();
    }

    public Integer getfRespRetcode() {
        return fRespRetcode;
    }

    public void setfRespRetcode(Integer fRespRetcode) {
        this.fRespRetcode = fRespRetcode;
    }

    public Integer getfCostTime() {
        return fCostTime;
    }

    public void setfCostTime(Integer fCostTime) {
        this.fCostTime = fCostTime;
    }

    public String getfDataSource() {
        return fDataSource;
    }

    public void setfDataSource(String fDataSource) {
        this.fDataSource = fDataSource == null ? null : fDataSource.trim();
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

    public String getfReqContent() {
        return fReqContent;
    }

    public void setfReqContent(String fReqContent) {
        this.fReqContent = fReqContent;
    }

    public String getfRespContent() {
        return fRespContent;
    }

    public void setfRespContent(String fRespContent) {
        this.fRespContent = fRespContent;
    }
}
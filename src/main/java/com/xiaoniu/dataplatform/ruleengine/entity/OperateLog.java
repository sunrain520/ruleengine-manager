package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class OperateLog {
    private Integer fAutoId;//ID

    private String fAppId; //业务ID

    private String fServiceName; //服务名

    private String fLocalAddress; //本地服务IP

    private String fRemoteAddress;//客户端IP

    private String fUrl; //请求地址

    private String fMethod; //方法GET/POST/DELETE/PUT

    private String fSubModule; //父模块

    private String fModule;//当前模块

    private String fOperate; //操作

    private String fOperator; //操作人

    private Date fCreateTime; //创建时间

    private Date fUpdateTime; //更新时间

    private String fData; //请求体数据

    public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public String getfServiceName() {
        return fServiceName;
    }

    public void setfServiceName(String fServiceName) {
        this.fServiceName = fServiceName == null ? null : fServiceName.trim();
    }

    public String getfLocalAddress() {
        return fLocalAddress;
    }

    public void setfLocalAddress(String fLocalAddress) {
        this.fLocalAddress = fLocalAddress == null ? null : fLocalAddress.trim();
    }

    public String getfRemoteAddress() {
        return fRemoteAddress;
    }

    public void setfRemoteAddress(String fRemoteAddress) {
        this.fRemoteAddress = fRemoteAddress == null ? null : fRemoteAddress.trim();
    }

    public String getfUrl() {
        return fUrl;
    }

    public void setfUrl(String fUrl) {
        this.fUrl = fUrl == null ? null : fUrl.trim();
    }

    public String getfMethod() {
        return fMethod;
    }

    public void setfMethod(String fMethod) {
        this.fMethod = fMethod == null ? null : fMethod.trim();
    }

    public String getfSubModule() {
        return fSubModule;
    }

    public void setfSubModule(String fSubModule) {
        this.fSubModule = fSubModule == null ? null : fSubModule.trim();
    }

    public String getfModule() {
        return fModule;
    }

    public void setfModule(String fModule) {
        this.fModule = fModule == null ? null : fModule.trim();
    }

    public String getfOperate() {
        return fOperate;
    }

    public void setfOperate(String fOperate) {
        this.fOperate = fOperate == null ? null : fOperate.trim();
    }

    public String getfOperator() {
        return fOperator;
    }

    public void setfOperator(String fOperator) {
        this.fOperator = fOperator == null ? null : fOperator.trim();
    }

    public Date getfCreateTime() {
        return fCreateTime;
    }

    public void setfCreateTime(Date fCreateTime) {
        this.fCreateTime = fCreateTime;
    }

    public Date getfUpdateTime() {
        return fUpdateTime;
    }

    public void setfUpdateTime(Date fUpdateTime) {
        this.fUpdateTime = fUpdateTime;
    }

    public String getfData() {
        return fData;
    }

    public void setfData(String fData) {
        this.fData = fData == null ? null : fData.trim();
    }

    public String getfAppId() {
        return fAppId;
    }

    public void setfAppId(String fAppId) {
        this.fAppId = fAppId;
    }
}
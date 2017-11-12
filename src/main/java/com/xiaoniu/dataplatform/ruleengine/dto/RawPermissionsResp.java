package com.xiaoniu.dataplatform.ruleengine.dto;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;
import java.util.List;

/**
 * PMS权限资源列表返回
 * Created by tanhui on 2016/10/13.
 */
public class RawPermissionsResp implements Serializable{
    private static final long serialVersionUID = -6596477615268559920L;

    private String appId;

    private String code;

    private List<RawPermission> data;

    public String toString() {
        return JSON.toJSONString(this);
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<RawPermission> getData() {
        return data;
    }

    public void setData(List<RawPermission> data) {
        this.data = data;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}

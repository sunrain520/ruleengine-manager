package com.xiaoniu.dataplatform.ruleengine.dto;

/**
 * Created by tanhui on 2016/12/20.
 */
public class ImportCount {

    private int successCount;

    private int failCount;

    public int getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }

    public int getFailCount() {
        return failCount;
    }

    public void setFailCount(int failCount) {
        this.failCount = failCount;
    }
}

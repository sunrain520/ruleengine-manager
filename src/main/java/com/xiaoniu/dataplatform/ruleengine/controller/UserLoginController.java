package com.xiaoniu.dataplatform.ruleengine.controller;


import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.dto.RawPermissionsResp;
import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;
import com.xiaoniu.dataplatform.ruleengine.entity.RawData;
import com.xiaoniu.dataplatform.ruleengine.invoker.PMSInvoker;
import com.xiaoniu.dataplatform.ruleengine.service.ManageService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户登录的信息，权限的逻辑控制
 * Created by tanhui on 2016/10/13.
 */
@Controller
@RequestMapping("/api/user")
public class UserLoginController {

    private Logger logger = LoggerFactory.getLogger(UserLoginController.class);

    @Autowired
    private PMSInvoker pmsInvoker;

    @Autowired
    private ManageService manageService;

    /**
     * 获取权限树
     *
     * @return
     */
//    @RequiresPermissions("p10")
    @RequestMapping(value = "/tree", method = RequestMethod.GET)
    @ResponseBody
    public String queryUserTree() {
//        String result = RuleUtils.getPermissionTree();
//        if(StringUtils.isEmpty(result)){
            String workNum = RuleUtils.getWorkNum();
            RawPermissionsResp resp = pmsInvoker.getPMSTree(workNum);
            resp.setAppId(RuleUtils.getAppId());
            String result = resp.toString();
//        }
        return result;
    }

    /**
     * 获取员工信息
     *
     * @return
     */
//    @RequiresPermissions("route/ruleengine/userinfo")
    @RequestMapping(value = "/userinfo", method = RequestMethod.GET)
    @ModuleDef(subModule = "系统管理",module = "员工信息", operate = "查询")
    @ResponseBody
    public String queryUserInfo(@RequestParam("workNum")String workNum) {
        RuleEngineResponse<EmployeeInfo> resp = manageService.queryUserInfo(workNum);
        return resp.toString();
    }

    /**
     * 获取员工信息
     * @return
     */
//    @RequiresPermissions("route/ruleengine/operatelogs")
    @RequestMapping(value = "/operatelogs", method = RequestMethod.GET)
    @ResponseBody
    public String queryUserInfo(@RequestParam(value= "module", required = false) String module,
                                            @RequestParam(value= "operator",required = false) String operator,
                                            @RequestParam("page") int pageNum,
                                            @RequestParam("rows") int pageSize) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<OperateLog>> resp = manageService.queryOperateLogsByPage(appId,module,operator,pageNum,pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }

}

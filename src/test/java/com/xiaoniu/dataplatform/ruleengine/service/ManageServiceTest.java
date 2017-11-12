package com.xiaoniu.dataplatform.ruleengine.service;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.xiaoniu.dataplatform.ruleengine.entity.RejectList;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteList;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional("rtTransactionManager")
@ContextConfiguration({ "classpath:spring-context.xml" })
//@ContextConfiguration(locations={"classpath:spring-context.xml","classpath:spring/spring-shiro.xml"})
//@ContextConfiguration(locations={"classpath:spring/spring-db-manage.xml","classpath:spring/spring-db-ruleengine.xml","classpath:spring/spring-shiro.xml"})
//@ContextConfiguration(locations={"classpath:spring/spring-db-manage.xml"})
public class ManageServiceTest {
	
	@Autowired
	private ManageService manageService;

	@Test
	public void testDeleteWhiteListByPrimaryKey() {
		WhiteList whiteList = new WhiteList();
		whiteList.setfIdNum("431025199003025114");
		whiteList.setfIdIndex(2979914041L);
		whiteList.setfName("王五");
		whiteList.setfMobile("18682419077");
		whiteList.setfAppId("credit-ndf");
		whiteList.setfCreateTime(new Date());
		whiteList.setfUpdateTime(new Date());
		
		WhiteList clone = JSON.parseObject(JSON.toJSONString(whiteList), WhiteList.class);
		
		RuleEngineResponse<WhiteList> save = manageService.saveWhiteList(whiteList);
		assertTrue(save.getCode() == 200);
		
		RuleEngineResponse<String> delete = manageService.deleteWhiteList(clone);
		assertEquals(200, delete.getCode());
		
	}
	
	@Test
	public void testDeleteRejectListById() {
		RejectList rejectList = new RejectList();
		rejectList.setfIdNum("431025199003025114");
		rejectList.setfIdIndex(2979914041L);
		rejectList.setfName("王五");
		rejectList.setfMobile("18682419077");
		rejectList.setfAppId("credit-ndf");
		rejectList.setfCreateTime(new Date());
		rejectList.setfUpdateTime(new Date());
		
		RuleEngineResponse<RejectList> save = manageService.saveRejectList(rejectList);
		assertTrue(save.getCode() == 200);
		
		RuleEngineResponse<String> delete = manageService.deleteRejectListById(rejectList.getfAutoId(), rejectList.getfIdNum());
		assertEquals(200, delete.getCode());
		
	}

}

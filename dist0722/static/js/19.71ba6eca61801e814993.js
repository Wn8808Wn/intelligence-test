webpackJsonp([19],{O3GW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={components:{commonTop:a("a8s2").a},data:function(){return{titleTop:"修改标准",dataType:1,id:"",examLevel:null,examLevelName:"",addDisabled:!1,reduceDisabled:!1,signRequirement:null,examServiceFee:null,certificationServiceFee:null,knowledgeHierarchy:[],examLength:"0",itemDifficulty:"",disabled:!1,details:null,number:0,examLevelList:[],knowledStr:"",ai:"",evaluateDanId:"",passScore:"",totalScore:"",aiTime:"",a:"",b:"",c:"",d:""}},methods:{changeExamLevel:function(e){var t=this;this.itemDifficulty=e,this.examLevelName=this.examLevelList.filter(function(e){return e.id===t.examLevel})[0].levelName},getKnowledgeSystem:function(e){var t=this,a={levelId:e};this.$http.get("/api/standard/get_knowledge",{params:a}).then(function(e){if(t.knowledgeHierarchy=[],0===e.data.code){if(console.log(e,"pppp"),e.data.data!=={}){var a=e.data.data;t.evaluateDanId=a.evaluateDanId,t.passScore=a.passScore,t.totalScore=a.totalScore,t.aiTime=a.aiTime,t.ai=a.ai}e.data.data.totalTime?t.examLength=e.data.data.totalTime:t.examLength=0,e.data.data.knowledgeSystem&&(t.knowledStr=e.data.data.knowledgeSystem,t.knowledgeHierarchy=e.data.data.knowledgeSystem.split(","))}})},addLevel:function(){if(this.examLevel<18){var e=this.examLevel+1;this.examLevelName=this.examLevelList.filter(function(t){return t.id===e})[0].levelName,this.itemDifficulty=e,this.getKnowledgeSystem(e)}else{this.itemDifficulty=18,this.examLevelName=this.examLevelList.filter(function(e){return 18===e.id})[0].levelName,this.getKnowledgeSystem(18)}},reduceLevel:function(){if(this.examLevel>1){var e=this.examLevel-1;this.itemDifficulty=e,this.examLevelName=this.examLevelList.filter(function(t){return t.id===e})[0].levelName,this.getKnowledgeSystem(e)}else{this.itemDifficulty=1,this.examLevelName=this.examLevelList.filter(function(e){return 1===e.id})[0].levelName,this.getKnowledgeSystem(1)}},handleChange:function(e){console.log(e)},descInput:function(){this.number=this.details.length},handleput:function(){var e=this,t=new URLSearchParams;t.append("id",this.id),this.evaluateDanId&&t.append("evaluateDanId",this.evaluateDanId),this.totalScore&&t.append("totalScore",this.totalScore),this.passScore&&t.append("passScore",this.passScore),this.aiTime&&t.append("aiTime",this.aiTime),this.ai&&t.append("isAI",this.ai),""===this.examLevel?this.a=!1:(this.a=!0,t.append("examLevel",this.examLevel)),""===this.signRequirement?this.b=!1:(this.b=!0,t.append("signRequirement",this.signRequirement)),""===this.examServiceFee?this.c=!1:(this.c=!0,t.append("examServiceFee",this.examServiceFee)),""===this.certificationServiceFee?this.d=!1:(this.d=!0,t.append("certificationServiceFee",this.certificationServiceFee)),t.append("itemDifficulty",this.itemDifficulty),t.append("knowledgeHierarchy",this.knowledStr),t.append("examLength",this.examLength),t.append("dataType",this.dataType),this.a&&this.b&&this.c&&this.d?this.$http.post("/api/standard/edit_standard",t).then(function(t){console.log(t),0===t.data.code?(e.$message({message:"恭喜你，修改成功",type:"success"}),e.$router.push({name:"standard"})):e.$message.error("修改失败")}):this.$message.error("输入考试服务费、认证服务费后才能进行提交")}},created:function(){var e=this;this.$http.get("/api/standard/standard_level_list",{params1:{}}).then(function(t){0===t.data.code&&(console.log(t.data.data.levelList),e.examLevelList=t.data.data.levelList)}).then(function(){var t=e.$route.query.id;e.id=t;var a="/api/standard/standard_detail?id="+t;e.$http.get(a).then(function(t){console.log(t.data.data,"8888888");var a=t.data.data;e.examLevel=a.examLevel,e.signRequirement=a.signRequirement,e.itemDifficulty=a.itemDifficulty,e.certificationServiceFee=a.certificationServiceFee,e.examServiceFee=a.examServiceFee,e.examLength=a.examLength,e.knowledStr=a.knowledgeHierarchy,e.knowledgeHierarchy=a.knowledgeHierarchy.split(","),e.itemDifficulty=a.itemDifficulty,e.examLevelName=e.examLevelList.filter(function(e){return e.id===Number(a.itemDifficulty)})[0].levelName,e.evaluateDanId=a.evaluateDanId,e.passScore=a.passScore,e.totalScore=a.totalScore,e.aiTime=a.aiLength,e.ai=a.isAI})})}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"standardTemplateBox"}},[a("div",{staticClass:"standardTemplate"},[a("div",{staticClass:"addStandard"},[a("commonTop",{attrs:{titleTop:e.titleTop}}),e._v(" "),a("div",{staticClass:"standardBody"},[a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("考试级别:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},on:{change:e.changeExamLevel},model:{value:e.examLevel,callback:function(t){e.examLevel=t},expression:"examLevel"}},e._l(e.examLevelList,function(e){return a("el-option",{key:e.id,attrs:{label:e.levelName,value:e.id}})}),1)],1),e._v(" "),a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("报考条件:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},model:{value:e.signRequirement,callback:function(t){e.signRequirement=t},expression:"signRequirement"}},e._l(e.examLevelList,function(e){return a("el-option",{key:e.id,attrs:{label:e.levelName,value:e.id}})}),1)],1),e._v(" "),a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("题库难度:")]),e._v(" "),a("div",{staticClass:"ajustBtn"},[a("el-input",{model:{value:e.examLevelName,callback:function(t){e.examLevelName=t},expression:"examLevelName"}}),e._v(" "),a("button",{staticClass:"addLevel",attrs:{disabled:e.addDisabled},on:{click:e.addLevel}},[e._v("+")]),e._v(" "),a("button",{staticClass:"reduceLevel",attrs:{disabled:e.reduceDisabled},on:{click:e.reduceLevel}},[e._v("—")])],1)]),e._v(" "),a("div",{staticClass:"knowledgeHierarchy"},[a("span",[e._v("知识体系:")]),e._v(" "),a("p",e._l(e.knowledgeHierarchy,function(t,i){return a("span",{key:i},[e._v(e._s(t.split("@")[0])+" "+e._s(t.split("@")[1])+"道")])}),0)]),e._v(" "),a("div",{staticClass:"testTime"},[a("span",[e._v("考试时长:")]),e._v(" "),a("p",[e._v(e._s(e.examLength)+"分钟")])])]),e._v(" "),a("div",{staticClass:"examFee"},[a("span",[e._v("考试服务费:（元）")]),e._v(" "),a("el-input",{model:{value:e.examServiceFee,callback:function(t){e.examServiceFee=e._n(t)},expression:"examServiceFee"}})],1),e._v(" "),a("div",{staticClass:"examFee"},[a("span",[e._v("认证服务费:（元）")]),e._v(" "),a("el-input",{model:{value:e.certificationServiceFee,callback:function(t){e.certificationServiceFee=e._n(t)},expression:"certificationServiceFee"}})],1),e._v(" "),a("div",{staticClass:"examFee detailInfo"},[e._e(),e._v(" "),e._e(),e._v(" "),e._e(),e._v(" "),a("div",{staticStyle:{"text-align":"center",width:"100%"}},[a("el-button",{staticStyle:{background:"#1f91b5",width:"145px",heiht:"40px","font-size":"16px","margin-top":"38px"},attrs:{type:"primary",round:""},on:{click:e.handleput}},[e._v("提交")])],1)],1)],1)])])},staticRenderFns:[]};var l=a("C7Lr")(i,s,!1,function(e){a("RBhY")},null,null);t.default=l.exports},RBhY:function(e,t){}});
//# sourceMappingURL=19.71ba6eca61801e814993.js.map
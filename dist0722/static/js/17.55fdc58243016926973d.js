webpackJsonp([17],{"2M3U":function(e,t){},k59L:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={components:{commonTop:a("a8s2").a},data:function(){return{titleTop:"考题标准详情",dataType:1,id:"",examLevel:null,examLevelName:"",signRequirement:null,examServiceFee:null,certificationServiceFee:null,knowledgeHierarchy:[],examLength:"0",itemDifficulty:"",details:null,number:0,examLevelList:[]}},methods:{descInput:function(){this.number=this.details.length}},created:function(){var e=this;this.$http.get("/api/standard/standard_level_list",{params1:{}}).then(function(t){0===t.data.code&&(console.log(t.data.data.levelList),e.examLevelList=t.data.data.levelList)}).then(function(){var t=e.$route.query.id;e.id=t;var a="/api/standard/standard_detail?id="+t;e.$http.get(a).then(function(t){console.log(t.data.data,"8888888");var a=t.data.data;e.examLevel=e.examLevelList.filter(function(e){return e.id==a.examLevel})[0].levelName,e.signRequirement=e.examLevelList.filter(function(e){return e.id==a.signRequirement})[0].levelName,e.itemDifficulty=e.examLevelList.filter(function(e){return e.id==a.itemDifficulty})[0].levelName,e.certificationServiceFee=a.certificationServiceFee,e.examServiceFee=a.examServiceFee,e.examLength=a.examLength,e.knowledgeHierarchy=a.knowledgeHierarchy.split(","),e.itemDifficulty=a.itemDifficulty,e.examLevelName=e.examLevelList.filter(function(e){return e.id==a.itemDifficulty})[0].levelName})})}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"standardTemplateBox"}},[a("div",{staticClass:"standardTemplate"},[a("div",{staticClass:"addStandard"},[a("commonTop",{attrs:{titleTop:e.titleTop}}),e._v(" "),a("div",{staticClass:"standardBody"},[a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("考试级别:")]),e._v(" "),a("el-input",{attrs:{disabled:""},model:{value:e.examLevel,callback:function(t){e.examLevel=t},expression:"examLevel"}})],1),e._v(" "),a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("报考条件:")]),e._v(" "),a("el-select",{attrs:{disabled:""},model:{value:e.signRequirement,callback:function(t){e.signRequirement=t},expression:"signRequirement"}})],1),e._v(" "),a("div",{staticClass:"testLevel"},[a("span",{staticClass:"commontips"},[e._v("题库难度:")]),e._v(" "),a("div",{staticClass:"ajustBtn"},[a("el-input",{attrs:{disabled:""},model:{value:e.examLevelName,callback:function(t){e.examLevelName=t},expression:"examLevelName"}}),e._v(" "),a("button",{staticClass:"addLevel",attrs:{disabled:""}},[e._v("+")]),e._v(" "),a("button",{staticClass:"reduceLevel",attrs:{disabled:""}},[e._v("—")])],1)]),e._v(" "),a("div",{staticClass:"knowledgeHierarchy"},[a("span",[e._v("知识体系:")]),e._v(" "),a("p",e._l(e.knowledgeHierarchy,function(t,i){return a("span",{key:i},[e._v(e._s(t.split("@")[0])+" "+e._s(t.split("@")[1])+"道")])}),0)]),e._v(" "),a("div",{staticClass:"testTime"},[a("span",[e._v("考试时长:")]),e._v(" "),a("p",[e._v(e._s(e.examLength)+"分钟")])])]),e._v(" "),a("div",{staticClass:"examFee"},[a("span",[e._v("考试服务费:（元）")]),e._v(" "),a("el-input",{attrs:{disabled:""},model:{value:e.examServiceFee,callback:function(t){e.examServiceFee=e._n(t)},expression:"examServiceFee"}})],1),e._v(" "),a("div",{staticClass:"examFee"},[a("span",[e._v("认证服务费:（元）")]),e._v(" "),a("el-input",{attrs:{disabled:""},model:{value:e.certificationServiceFee,callback:function(t){e.certificationServiceFee=e._n(t)},expression:"certificationServiceFee"}})],1),e._v(" "),e._e()],1)])])},staticRenderFns:[]};var l=a("C7Lr")(i,s,!1,function(e){a("2M3U")},null,null);t.default=l.exports}});
//# sourceMappingURL=17.55fdc58243016926973d.js.map
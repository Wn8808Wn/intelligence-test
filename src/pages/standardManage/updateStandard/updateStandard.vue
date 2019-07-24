<template>
<div id="standardTemplateBox">
    <div class="standardTemplate">
          <div class="addStandard">
            <commonTop :titleTop="titleTop"></commonTop>
                <!-- 新增标准内容 -->
            <div class="standardBody">
                <div class="testLevel">
                    <span class="commontips">考试级别:</span>
                    <el-select v-model="examLevel" placeholder="请选择" :disabled="disabled" @change="changeExamLevel">
                        <el-option
                        v-for="item in examLevelList"
                        :key="item.id"
                        :label="item.levelName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div class="testLevel">
                    <span class="commontips">报考条件:</span>
                    <el-select v-model="signRequirement" placeholder="请选择"  :disabled="disabled">
                        <el-option
                        v-for="item in examLevelList"
                        :key="item.id"
                        :label="item.levelName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div class="testLevel">
                    <span class="commontips">题库难度:</span>
                    <div class="ajustBtn">
                        <el-input v-model="examLevelName"></el-input>
                        <button class="addLevel" @click="addLevel" :disabled='addDisabled'>+</button>
                        <button class="reduceLevel"  @click="reduceLevel" :disabled='reduceDisabled'>—</button>
                    </div>
                </div>

                <div class="knowledgeHierarchy">
                  <span>知识体系:</span> 
                  <p class="knowP">
                    <span class="KnowPspan" v-for="(item,index) in knowledgeHierarchy" :key="index" >{{item.split('@')[0]}} {{item.split('@')[1]}}道</span>
                  </p>
                </div>

                 <div class="testTime">
                  <span>考试时长:</span> 
                  <p>{{examLength}}分钟</p>
                </div>

            </div>

                <div class="examFee">
                    <span>考试服务费:（元）</span>
                    <el-input v-model.number="examServiceFee"></el-input>
                </div>

                <div class="examFee">
                    <span>认证服务费:（元）</span>
                    <el-input v-model.number="certificationServiceFee"></el-input>
                </div>

                <div class="examFee detailInfo" >
                    <span v-if="false">详情介绍:</span>
                    <el-input
                      type="textarea"
                      v-if="false"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      maxlength="200"
                      @input = "descInput"
                      v-model="details"
                      >
                    </el-input>
                    <p v-if="false">已输入<span v-html="number"></span>个字,不得超过200字</p>
                    <div style="text-align:center;width:100%;">
                      <el-button type="primary" round 
                        style="background:#1f91b5;
                        width:145px;
                        heiht:40px;
                        font-size:16px;
                        margin-top:38px;"
                        @click="handleput"  
                      >提交</el-button>
                    </div>
                </div>

        </div>

            
    </div>

</div>
</template>

<script>
import commonTop from "../../common/commonTop";
export default {
    components: {
        commonTop
    },
    data() {
        return {
        titleTop: "修改标准",
        dataType:1,
        id:'',
        examLevel: '',
        examLevelName:'',
        addDisabled:false,
        reduceDisabled:false,
        signRequirement: '',
        examServiceFee: '',
        certificationServiceFee:'',
        knowledgeHierarchy:[],
        examLength:"0",
        itemDifficulty:'',
        disabled: false,
        details:'',
        number:0,
        ranglist:[],
        betweenIndex:1,
        examLevelList: [],
        knowledStr:'',
        ai:'',
        evaluateDanId:'',
        passScore:'',
        totalScore:'',
        aiTime:'',
        a:'',
        b:'',
        c:'',
        d:''
        };
    },
    methods: {
        changeExamLevel(val){
            this.itemDifficulty = val;
            if(val === 18){
                this.ranglist = [17,18];
            }else if(val === 1){
                this.ranglist=[1,2];
            }else{
                this.ranglist=[val-1,val,val+1];
            } 
            this.examLevelName = this.examLevelList.filter( item => item.id === this.examLevel)[0].levelName;
            this.getKnowledgeSystem(val);
        },
        getKnowledgeSystem(num){
            let params ={
                "levelId":num
            }
            this.$http.get('/api/standard/get_knowledge',{params}).then( res =>{
                this.knowledgeHierarchy =[];
                if( res.data.code === 0){
                    //   console.log(res,'pppp')
                    //保存后台需要的数据
                    if(res.data.data !== {}){
                        let rst = res.data.data;
                        this.evaluateDanId = rst.evaluateDanId;
                        this.passScore = rst.passScore;
                        this.totalScore = rst.totalScore;
                        this.aiTime = rst.aiTime;
                        this.ai = rst.ai;
                    }
                    //处理不存在的情况
                    if(res.data.data.totalTime){
                        this.examLength = res.data.data.totalTime;
                    }else{
                        this.examLength = 0;
                    }
                    if(res.data.data.knowledgeSystem){
                        this.knowledStr = res.data.data.knowledgeSystem;
                        this.knowledgeHierarchy = res.data.data.knowledgeSystem.split(',');
                    }
                }
            })
        },
        addLevel(){
            if(this.ranglist.length === 2){
                this.betweenIndex++;
                if(this.betweenIndex >= 2){
                    this.betweenIndex = 1;
                }
            }else{
                this.betweenIndex++;
                if(this.betweenIndex > 2){
                    this.betweenIndex = 2;
                }
            }
            if(0<=this.betweenIndex&&this.betweenIndex<=2){
                let addLev = this.ranglist[this.betweenIndex];
                this.examLevelName = this.examLevelList.filter( item => item.id === addLev)[0].levelName;
                this.itemDifficulty = addLev;
                this.getKnowledgeSystem(addLev);
            }
        },
        reduceLevel(){
            if(this.ranglist.length === 2){
                this.betweenIndex--;
                if(this.betweenIndex <=0){
                    this.betweenIndex = 0;
                }
            }else{
                this.betweenIndex--;
                if(this.betweenIndex < 0){
                    this.betweenIndex = 0;
                }
            }
            if(0<=this.betweenIndex&&this.betweenIndex<=2){
                let addLev = this.ranglist[this.betweenIndex];
                this.examLevelName = this.examLevelList.filter( item => item.id === addLev)[0].levelName;
                this.itemDifficulty = addLev;
                this.getKnowledgeSystem(addLev);
            }
        },
        handleChange(value) {
        console.log(value);
        },
        descInput(){
        details:null,
        this.number = this.details.length
        },
        handleput(){
            let params = new URLSearchParams();
            params.append('id',this.id)
            if(this.evaluateDanId){
                params.append('evaluateDanId',this.evaluateDanId)
            }
            if(this.totalScore){
                params.append('totalScore',this.totalScore)
            }
            if(this.passScore){
                params.append('passScore',this.passScore)
            }
            if(this.aiTime){
                params.append('aiTime',this.aiTime)
            }
            if(this.ai){
                params.append('isAI',this.ai)
            }
            if(this.examLevel === ''){
                this.a = false;
            }else{
                this.a = true;
                params.append("examLevel", this.examLevel);
            }
            if(this.signRequirement === ''){
                this.b = false;
            }else{
                this.b = true;
                params.append("signRequirement", this.signRequirement);
            }
            if(this.examServiceFee === ''){
                this.c = false;
            }else{
                this.c = true;
                params.append("examServiceFee", this.examServiceFee);
            }
            if(this.certificationServiceFee === ''){
                this.d = false;
            }else{
                this.d = true;
                params.append("certificationServiceFee", this.certificationServiceFee);
            }
            params.append("itemDifficulty",  this.itemDifficulty);
            params.append("knowledgeHierarchy", this.knowledStr); 
            params.append("examLength", this.examLength); 
            // params.append("details", this.details);  //产品取消描述需求
            params.append("dataType", this.dataType); 
            if(this.a && this.b && this.c && this.d){
                this.$http.post("/api/standard/edit_standard", params).then(res => {
                    console.log(res);
                    if(res.data.code === 0){
                        this.$message({
                            message: '恭喜你，修改成功',
                            type: 'success'
                        });
                        this.$router.push({name: "standard"})
                    }else{
                        this.$message.error('添加失败');
                    }
            });

            }else{
                this.$message.error('输入考试服务费、认证服务费后才能进行提交');
            }
        }
    },
    created(){
        //获取考试级别
        this.$http.get('/api/standard/standard_level_list').then( res =>{
            if(res.data.code === 0){
                this.examLevelList = res.data.data.levelList;
                console.log(this.examLevelList,'iiii')
            }
        }).then( ()=>{
            let id = this.$route.query.id;
            this.id = id;
            let url = '/api/standard/standard_detail?id='+id
            this.$http.get(url).then(res => {
            console.log(res.data.data,'8888888');
                if( res.data.code === 0){
                    let rst = res.data.data;
                    //处理数据
                    this.examLevel = rst.examLevel
                    this.signRequirement = rst.signRequirement
                    this.certificationServiceFee = rst.certificationServiceFee
                    this.examServiceFee = rst.examServiceFee
                    this.examLength = rst.examLength
                    this.knowledStr = rst.knowledgeHierarchy
                    this.knowledgeHierarchy = rst.knowledgeHierarchy.split(',')
                    this.itemDifficulty = rst.itemDifficulty;
                    this.changeExamLevel(Number(rst.itemDifficulty));
                    this.examLevelName = this.examLevelList.filter( item => item.id === Number(rst.itemDifficulty))[0].levelName;
                    // //保存AI数据
                    this.evaluateDanId = rst.evaluateDanId;
                    this.passScore = rst.passScore;
                    this.totalScore = rst.totalScore;
                    this.aiTime = rst.aiLength;
                    this.ai = rst.isAI;
                    // this.details = rst.details
                    // this.number = rst.details.length    
                }
            })
        })
    }
};
</script>
<style rel='stylesheet/scss' lang="scss">
.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
#standardTemplateBox{
  width: 100%;
  background: #f0f0f0;
}
.standardTemplate{
    width: 1042px;
    height: auto;
}
.addStandard {
  width: 952px;
  height: 880px;
  padding: 0 50px 0 40px;
  background: #ffffff;
  // background: #1f91b5;
  .standardBody {
    padding-left: 3px;
    width: 952px;
    overflow: hidden;
    padding-bottom: 39px;
    margin-bottom: 27px;
    border-bottom: 1px solid #acacac;
    .testLevel {
      width: 164px;
      height: 112px;
      float: left;
      margin-right: 27px;
      .commontips {
        width: 164px;
        height: 17px;
        display: block;
        height: 15px;
        font-size: 16px;
        color: #a3a3a3;
        padding-top: 39px;
        padding-bottom: 18px;
        padding-left: 7px;
      }
      &>.ajustBtn{
          width: 160px;
          height: 40px;
          position: relative;
          & /deep/ .el-input__inner{
            width: 134px;
            border-radius: 4px 0 0 4px;
          }
          &>.addLevel{
            width: 26px;
            height: 20px;
            border: none;
            outline: none;
            position: absolute;
            right:0px;
            top: 0px;
            background: #ffffff;
            border: 1px solid #DCDFE6;
            border-radius:0 4px 0  0;
            text-align: center;
            font-size: 16px;
            border-left:none;
            line-height: 18px;
          } 
          &>.reduceLevel{
            width: 26px;
            height: 20px;
            border: none;
            outline: none;
            position: absolute;
            right: 0px;
            top: 20px;
            border-radius:0 0 4px  0;
            text-align: center;
            font-size: 12px;
            background: #ffffff;
            border: 1px solid #DCDFE6;
            border-top:none;
            border-left:none;
            line-height: 15px;
          }
      }
     
    }
   
    .knowledgeHierarchy {
      width: 100%;
      height: 121px;
      float: left;
      margin-bottom: 36px;
      &>span{
        width: 164px;
        height: 17px;
        display: block;
        height: 15px;
        font-size: 16px;
        color: #a3a3a3;
        padding-top: 35px;
        padding-bottom: 27px;
        padding-left: 7px;
      }
      & > .knowP {
        width: calc( 100% - 7px);
        padding-left: 7px;
        height: 70px;
        & >.KnowPspan {
           float: left;
           width: auto;
           font-size: 16px;
           height: 70px;
           line-height: 70px;
           margin-right: 20px;
        }
      }
    }
    .testTime {
      float: left;
      height: 53px;
      &>span{
        width: 164px;
        height: 17px;
        display: block;
        height: 15px;
        font-size: 16px;
        color: #a3a3a3;
        padding-bottom: 20px;
        padding-left: 7px;
      }
      & > p {
        padding-left: 7px;
        width: 112px;
        
        font-size: 16px;
      }
    }
  }
  .examFee {
    width: 164px;
    height: 85px;
    float: left;
    margin-right: 27px;
    font-size: 16px;
    margin-bottom: 35px;
    & > span {
      height: 38px;
      line-height: 38px;
      color: #acacac;
    }
  }

  .detailInfo{
    width: 100%;
    height: 125px;
    margin-bottom: 34px;
    &>p{
      float: right;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      color:#1f91b5;
    }
  }

  .el-select {
    width: 100%;
    background: #f8f8f8;
    border-color: #cccccc;
    border-radius: 4px;
    color: #000;
  }
}


</style>



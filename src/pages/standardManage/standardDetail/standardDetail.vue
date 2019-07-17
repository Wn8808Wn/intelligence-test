<template>
<div id="standardTemplateBox">
    <div class="standardTemplate">
          <div class="addStandard">
            <commonTop :titleTop="titleTop"></commonTop>
                <!-- 新增标准内容 -->
            <div class="standardBody">
                <div class="testLevel">
                    <span class="commontips">考试级别:</span>
                    <el-input v-model="examLevel"  disabled></el-input>
                </div>

                <div class="testLevel">
                    <span class="commontips">报考条件:</span>
                    <el-select v-model="signRequirement" disabled>
                      
                    </el-select>
                </div>

                <div class="testLevel">
                    <span class="commontips">题库难度:</span>
                    <div class="ajustBtn">
                        <el-input v-model="examLevelName" disabled></el-input>
                        <button class="addLevel" disabled>+</button>
                        <button class="reduceLevel" disabled>—</button>
                    </div>
                </div>

                <div class="knowledgeHierarchy">
                  <span>知识体系:</span> 
                  <p>
                    <span v-for="(item,index) in knowledgeHierarchy" :key="index" >{{item.split('@')[0]}} {{item.split('@')[1]}}道</span>
                  </p>
                </div>

                 <div class="testTime">
                  <span>考试时长:</span> 
                  <p>{{examLength}}分钟</p>
                </div>

            </div>

                <div class="examFee">
                    <span>考试服务费:（元）</span>
                    <el-input v-model.number="examServiceFee" disabled></el-input>
                </div>

                <div class="examFee">
                    <span>认证服务费:（元）</span>
                    <el-input v-model.number="certificationServiceFee" disabled></el-input>
                </div>

                <div class="examFee detailInfo"  v-if="false">
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
      titleTop: "考题标准详情",
      dataType:1,
      id:'',
      examLevel: null,
      examLevelName:'',
      signRequirement: null,
      examServiceFee: null,
      certificationServiceFee:null,
      knowledgeHierarchy:[],
      examLength:"0",
      itemDifficulty:'',
      details:null,
      number:0,
      examLevelList: [],
    };
  },
  methods: {
    descInput(){
      details:null,
      this.number = this.details.length
    },
  },
  created(){
      //获取考试级别
      let params1 ={
        // "levelId":1
      }
      this.$http.get('/api/standard/standard_level_list',{params1}).then( res =>{
        if(res.data.code === 0){
          console.log(res.data.data.levelList)
          this.examLevelList = res.data.data.levelList;
        }
      }).then( ()=>{
          let id = this.$route.query.id;
          this.id = id;
          let url = '/api/standard/standard_detail?id='+id
          this.$http.get(url).then(res => {
            console.log(res.data.data,'8888888');
            let rst = res.data.data;
            //处理数据
            this.examLevel = this.examLevelList.filter( item => item.id == rst.examLevel)[0].levelName;
            this.signRequirement = this.examLevelList.filter( item => item.id == rst.signRequirement)[0].levelName;
            this.itemDifficulty = this.examLevelList.filter( item => item.id == rst.itemDifficulty)[0].levelName;
            this.certificationServiceFee = rst.certificationServiceFee
            this.examServiceFee = rst.examServiceFee
            this.examLength = rst.examLength
            this.knowledgeHierarchy = rst.knowledgeHierarchy.split(',')
            this.itemDifficulty = rst.itemDifficulty;
            this.examLevelName = this.examLevelList.filter( item => item.id == rst.itemDifficulty)[0].levelName;
            // this.details = rst.details
            // this.number = rst.details.length    
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
      & > p {
        width: calc( 100% - 7px);
        padding-left: 7px;
        height: 70px;
        & > span {
          display: block;
          float: left;
          width: 140px;
          font-size: 16px;
          height: 70px;
          line-height: 70px;
          margin-right: 10px;
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



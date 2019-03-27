<template>
<div id="standardTemplateBox">
    <div class="standardTemplate">
          <div class="addStandard">
            <commonTop :titleTop="titleTop"></commonTop>
                <!-- 新增标准内容 -->
            <div class="standardBody">
                <div class="testLevel">
                    <span class="commontips">考试级别:</span>
                    <el-select v-model="examLevel" placeholder="请选择" :disabled="disabled">
                        <!-- <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option> -->
                    </el-select>
                </div>

                <div class="testLevel">
                    <span class="commontips">报考条件:</span>
                    <el-select v-model="signRequirement" placeholder="请选择"  :disabled="disabled">
                        <!-- <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option> -->
                    </el-select>
                </div>

                
                <div class="testLevel">
                    <span class="commontips">题库难度:</span>
                    <el-select v-model="itemDifficulty" placeholder="请选择"  :disabled="disabled"></el-select>
                    <!-- <el-input-number v-model="itemDifficulty" controls-position="right"  :disabled="disabled"></el-input-number> -->
                </div>

                <div class="knowledgeHierarchy">
                  <span>知识体系:</span> 
                  <p>
                    <span v-for="(item,index) in knowledgeHierarchy" :key="index" >{{item}}道</span>
                    <!-- <span>中盘2道</span>
                    <span>布局2道</span>
                    <span>官子2道</span>
                    <span>死活2道</span>
                    <span>对弈2道</span> -->
                  </p>
                </div>

                 <div class="testTime">
                  <span>考试时长:</span> 
                  <p v-html='examLength'></p>
                </div>

            </div>

                <div class="examFee">
                    <span>考试服务费:（元）</span>
                    <el-input v-model="examServiceFee" :disabled="disabled"></el-input>
                </div>

                <div class="examFee">
                    <span>认证服务费:（元）</span>
                    <el-input v-model="certificationServiceFee" :disabled="disabled"></el-input>
                </div>

                <div class="examFee detailInfo">
                    <span>详情介绍:</span>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      maxlength="200"
                      v-model="details"
                      :disabled="disabled"
                      >
                    </el-input>
                    <p>已输入<span v-html="number"></span>个字,不得超过200字</p>
                    <!-- <div style="text-align:center;width:100%;">
                      <el-button type="primary" round 
                        style="background:#1f91b5;
                        width:145px;
                        heiht:40px;
                        font-size:16px;
                        margin-top:38px;"
                        @click="handleput"  
                      >回到上一页</el-button>
                    </div> -->
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
      examLevel: null,
      signRequirement: null,
      itemDifficulty: null,
      examServiceFee: null,
      certificationServiceFee:null,
      knowledgeHierarchy:null,
      examLength:null,
      disabled: true,
      details: null,
      number: 0
    };
  },
  methods: {
    handleput() {}
  },
  created() {
    let id = this.$route.query.id;
    let params = new URLSearchParams();
    params.append("id", id);
    this.$http.get("/api/standard/standard_detail",{params}).then(res => {
        console.log(res.data.data);
        let rst = res.data.data;
        //处理数据
        this.examLevel = rst.examLevel +'级'
        this.signRequirement = rst.signRequirement+'级'
        this.itemDifficulty = rst.itemDifficulty+'级'
        this.certificationServiceFee = rst.certificationServiceFee
        this.examServiceFee = rst.examServiceFee
        this.examLength = rst.examLength
        this.details = rst.details
        this.knowledgeHierarchy = rst.knowledgeHierarchy.split(',').splice(0,5)
        this.number = rst.details.length
        console.log(this.knowledgeHierarchy)
        })
  }
  
};
</script>


<style rel='stylesheet/scss' lang="scss">
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
#standardTemplateBox {
  width: 100%;
  background: #f0f0f0;
}
.standardTemplate {
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
    }

    .knowledgeHierarchy {
      width: 100%;
      height: 121px;
      float: left;
      margin-bottom: 36px;
      & > span {
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
        padding-left: 7px;
        height: 70px;
        & > span {
          display: block;
          float: left;
          width: 112px;
          font-size: 16px;
          height: 70px;
          line-height: 70px;
        }
      }
    }
    .testTime {
      float: left;
      height: 53px;
      & > span {
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

  .detailInfo {
    width: 100%;
    height: 125px;
    margin-bottom: 34px;
    & > p {
      float: right;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      color: #1f91b5;
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



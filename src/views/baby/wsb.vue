<template>
  <div class="first">
    <div class="second">
      <div class="card front" v-for="card in cards" :key="card.id"
           :class="{
          'hoverOther': card.id !== hoverId && beginHover && card.frontView === true,
          'hoverTarget': card.id === hoverId && beginHover && card.frontView === true,
          'turnItem': card.frontView === false
        }"
           @mouseenter="hover(card)"
           @mouseleave="leave"
           @click="turnBack(card)">
        <div class="back" v-if="!card.frontView">{{card.content}}</div>
      </div>
    </div>
    <div class="fourth1">
      <el-popover
          placement="top"
          title="你鼠标放在哪里了？"
          :width="200"
          trigger="hover"
          hide-after="100"
          content="你想干什么？你不会想打我吧？"
      >
        <template #reference>
          <div class="fourth2 m-2">
            <el-popconfirm
                title="你真的想打我？"
                width="200px"
                confirm-button-text="就要打"
                cancel-button-text="舍不得"
                @confirm="dbd"
                @cancel="qq"
            >
              <template #reference>
                <div class="images tw1" v-if="imagesStatus['tw1']"></div>
                <div class="images dz" v-if="imagesStatus['dz']"></div>
                <div class="images qq" v-if="imagesStatus['qq']"></div>
                <div class="images tw2" v-if="imagesStatus['tw2']"></div>
                <div class="images tw3" v-if="imagesStatus['tw3']"></div>
                <div class="images tw4" v-if="imagesStatus['tw4']"></div>
              </template>
            </el-popconfirm>
            <el-popconfirm
                title="你还想打我，呵呵"
                width="200px"
                confirm-button-text="坚持打"
                cancel-button-text="放弃了"
                @confirm="jxd"
                @cancel="qq"
            >
              <template #reference>
                <div class="images dbd" v-if="imagesStatus['dbd']"></div>
              </template>
            </el-popconfirm>
              <el-popconfirm
                  title="我错了，宝宝"
                  width="200px"
                  confirm-button-text="继续打"
                  cancel-button-text="放弃了"
                  @confirm="zf1"
                  @cancel="qq"
              >
                <template #reference>
                  <div class="images jxd" v-if="imagesStatus['jxd']"></div>
                </template>
            </el-popconfirm>
            <el-popconfirm
                title="宝宝我爱你"
                width="200px"
                confirm-button-text="继续打"
                cancel-button-text="放弃了"
                @confirm="zf1"
                @cancel="qq"
            >
              <template #reference>
                <div class="images zf1" v-if="imagesStatus['zf1']"></div>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="third">
      <el-button type="primary" @click="tw2">我跳舞给你看</el-button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "WsbView",

  data() {
    return {
      cards: [
        {id: 0, content: '宝', frontView: true},
        {id: 1, content: '宝', frontView: true},
        {id: 2, content: '，', frontView: true},
        {id: 3, content: '我', frontView: true},
        {id: 4, content: '爱', frontView: true},
        {id: 5, content: '你', frontView: true},
      ],
      card2s: [
        {id: 0, content: '宝', frontView: false},
        {id: 1, content: '宝', frontView: false},
        {id: 2, content: '早', frontView: false},
        {id: 3, content: '日', frontView: false},
        {id: 4, content: '康', frontView: false},
        {id: 5, content: '复', frontView: false},
      ],
      hoverId: -1,
      beginHover: false,
      next: false,
      tw_img: "",
      tw: [
          "tw1",
          "tw2",
          "tw3",
          "tw4",
      ],
      imagesStatus: {
        dz: true,
        tw1: false,
        tw2: false,
        tw3: false,
        tw4: false,
        dbd: false,
        qq: false,
        jxd: false,
        zf1: false
      },
    }
  },
  methods: {
    hover(card) {
      this.hoverId = card.id,
          this.beginHover = true
    },
    leave() {
      this.beginHover = false
    },
    turnBack(card) {
      if (card.frontView) {
        this.hoverId = card.id,
            card.frontView = false
      } else {
        card.frontView = true
      }
    },
    init_image_status() {
      for (const key in this.imagesStatus) {
        this.imagesStatus[key] = false
      }
    },
    tw1() {
      this.init_image_status()
      this.imagesStatus['tw1'] = true
    },
    tw2() {
      this.init_image_status()
      this.tw_key = this.tw[Math.floor(Math.random() * this.tw.length)]
      this.imagesStatus[this.tw_key] = true
    },
    tw3() {
      this.init_image_status()
      this.imagesStatus['tw3'] = true
    },
    tw4() {
      this.init_image_status()
      this.imagesStatus['tw4'] = true
    },
    dz() {
      this.init_image_status()
      this.imagesStatus['dz'] = true
    },
    dbd() {
      this.init_image_status()
      this.imagesStatus['dbd'] = true
    },
    qq() {
      this.init_image_status()
      this.imagesStatus['qq'] = true
    },
    jxd() {
      this.init_image_status()
      this.imagesStatus['jxd'] = true
    },
    zf1() {
      this.init_image_status()
      this.cards = this.card2s
      this.imagesStatus['zf1'] = true
    },
  }
})
</script>

<style lang="less" scoped>
@import url("../../style/font.css");
.first {
  height: 100vh;
  display: flow-root;
  //background-color: #2c3e50;
  justify-content: center;

  .second {
    height: 300px;
    display: flex;
    justify-content: center;
    //background-color: #58b942;

    .card {
      width: 180px;
      height: 200px;
      transition: 1s;
      margin: 3rem 1rem;
      cursor: pointer;
      border-radius: 10px;
      border: #f1c40f;
    }

    .front {
      //background: url("../../assets/logo.png") center center no-repeat;
      background: #d5e825;
      background-size: 100% 100%;
    }

    .hoverTarget {
      transform: scale(1.2);
    }

    .hoverOther {
      filter: blur(5px);
      transform: scale(0.8);
    }

    .turnItem {
      box-shadow: 0px 0px 20px 10px #d5e825;
      transform: perspective(200px) rotateY(180deg) scale(1) translateY(-20%);
    }
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      background: rgb(168, 10, 3);
      transform: rotateY(180deg);
      font-family: font_type_1;
      font-size: 5rem;
      color: #f1c40f;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .fourth1{
    height: 350px;
    align-items: center;
    justify-content: center;
    display: flex;

    .fourth2{
      width: 350px;
      height: 350px;
      align-items: center;
      justify-content: center;
      display: flex;

      .images{
        width: 300px;
        height: 300px;
        cursor: pointer;
        position: relative;
        transform: scale();
      }
      .tw1{
        background: url("../../style/resources/images/tw/tw1.gif") center center no-repeat;
      }
      .tw2{
        background: url("../../style/resources/images/tw/tw2.gif") center center no-repeat;
      }
      .tw3{
        background: url("../../style/resources/images/tw/tw3.gif") center center no-repeat;
      }
      .tw4{
        background: url("../../style/resources/images/tw/tw4.gif") center center no-repeat;
      }
      .dz{
        background: url("../../style/resources/images/dz.gif") center center no-repeat;
      }
      .dbd{
        background: url("../../style/resources/images/dbd.gif") center center no-repeat;
      }
      .qq{
        background: url("../../style/resources/images/qq.gif") center center no-repeat;
      }
      .jxd{
        background: url("../../style/resources/images/bd.jpeg") center center no-repeat;
      }
      .zf1{
        background: url("../../style/resources/images/zf/zf1.gif") center center no-repeat;
      }
    }
  }
  .third{
    height: 3rem;
    justify-content: center;
    align-items: center;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
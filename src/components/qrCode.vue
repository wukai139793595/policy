<template>
    <div id="qr-code">
      <div id='code'>请使用{{chooseWay === 'aliChoose'?'支付宝':'微信'}}扫码支付</div>
      <div class="canvas-wrap">
        <canvas id="canvas"></canvas>
      </div>
      <div class="success-wrap" v-if="isSuccess">
        <div class="text">支付成功，3秒后跳转页面</div>
      </div>
    </div>
</template>
<style></style>
<script>
  import QRCode from 'qrcode'
  import axios from 'axios'
  import Qs from 'qs'
  import {postPolling} from '@/api/api.js'
    export default{
      props: {
        qr_code: {
          type: String,
          default: 'https://www.yunbisai.com/'
        },
        amount: {
          type: Number,
          default: 0
        },
        chooseWay: {
          type: String,
          default: 'aliChoose'
        },
        orderId: {
          type: String,
          default: ''
        }
      },
      // props: ['qr_code','amount','chooseWay'],
      data(){
            return {
              codes:'',
              times: 100,
              timeId: 0,
              isSuccess: false
            }
      },
      components: {
        QRCode: QRCode
      },

      methods: {
        pollingOrder () {
          postPolling({
            orderid: this.orderId
          }).then(res => {
            if (res.data.code === 'success') {
              console.log(`orderid:${this.orderId};success`)
              this.isSuccess = true;
              clearTimeout(this.timeId);
              setTimeout(() => {
                this.$router.push({
                  path: '/'
                })
              }, 3e3)

            } else if (res.data.code === 'waiting') {
              console.log(`orderid:${this.orderId};waiting`)
              this.times -= 1;
              if (this.times > 0) {
                this.timeId = setTimeout(this.pollingOrder, 3000)
              }
            } else {

            }
          },err => {
            console.log(err)
          })
        },
        useqrcode(){
          if (this.qr_code) {
            var canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, this.qr_code, function (error) {
              if (error) {
                console.error(error)
              } else {
                this.timeId = setTimeout(this.pollingOrder,3000)
              }
            })

          }
        }
      },
      created () {
          console.log('qr_code',this.qr_code);
          console.log('amount',this.amount);
      },
      mounted(){
            this.useqrcode();
      }
    }
</script>

<style lang="less">
#qr-code{
    margin: 0 auto;
    padding-top: 200px;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    div{
        text-align: center;
        font-size: 38px; /*px*/
        margin-bottom: 40px;
    }
    .canvas-wrap{
        margin: 0 auto;
        width: 328px; /*px*/
        height: 328px; /*px*/
    }
    .success-wrap{
      width: 100%;
      height:100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      .text{
        // position: absolute;
        // top: 200px;
        // left: 0;
        text-align: center;
        margin: 200px auto;
      }
    }
}
</style>

<template>
    <div class="write-info">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="" @click="turnBack($event)">
            </div>
            <div class="title">填写信息</div>
        </div>
        <div class="set-time">
            <p>请设置保险起止时间</p>
            <div class="time-wrap">
                <div class="time time-left">2019-03-06</div>
                <div class="striping"></div>
                <div class="time time-right">2019-03-06</div>
            </div>
        </div>
        <div class="info-wrap">
            <p>请填写投保人信息</p>
            <div class="info-content">
                <div class="name-wrap">
                    <span class="name">姓名</span>
                    <input type="text" placeholder="输入投保人姓名">
                </div>
                <div class="name-wrap">
                    <span class="name">身份证</span>
                    <input type="text" placeholder="输入投保人身份证">
                </div>
                <div class="phone-wrap">
                    <span class="phone">电话</span>
                    <input type="text" placeholder="输入投保人电话">
                </div>
                <div class="email-wrap">
                    <span class="email">邮箱</span>
                    <input type="text" placeholder="输入投保人邮箱">
                </div>
            </div>
        </div>
        <div class="pay-way">
            <p>请选择支付方式</p>
            <div class="way-wrap">
                <div class="balance-wrap">
                    <div class="balance-left">
                        <img class="pay-icon" src="../assets/icon/money@2x.png" alt="">
                        <div class="balance-hint">
                            <div class="balance-word">余额支付</div>
                            <div class="hint">可用额度<span>{{'1000'}}元</span></div>
                        </div>
                    </div>
                    <div class="balance-right">
                        <img src="../assets/icon/circle.png" alt="" class="icon-common" v-if="balanceChoose">
                        <img src="../assets/icon/choose-circle.png" alt="" class="icon-common" v-else>
                    </div>
                </div>
                <div class="bank-wrap">
                    <div class="bank-left">
                        <img class="pay-icon" src="../assets/icon/bank.png" alt="">
                        <div class="name-wrap">
                            <div class="name">建设银行</div>
                            <div class="bank-number">储蓄卡<span>(3365)</span></div>
                        </div>
                    </div>
                    <div class="bank-right">
                        <img src="../assets/icon/circle.png" alt="" class="icon-common" v-if="bankChoose">
                        <img src="../assets/icon/choose-circle.png" alt="" class="icon-common" v-else>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="submit">
            立即支付
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            balanceChoose: true,
            bankChoose: false
        }
    },
    methods: {
        
        turnBack (event) {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
.write-info{
    p{
        font-size: 26px;/*px*/
        color: #666;
    }
    input{
        flex: 1;
        height: 60px;
        line-height:60px;
        border: none;
        margin-left: 20px;
        background-color: #f6f6f6;
        outline: none;
    }
    input::placeholder{
        color: #9999;
    }
    .head{
        width: 702px;
        height: 30px;
        margin: 0 auto;
        padding-top: 20px;
        text-align: center;
        position: relative;
        line-height: 30px;
        .turn-back{
            position: absolute;
            left: 0px;
            top: 20px;
            width: 30px;
            height: 30px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            display: inline-block;
            font-size: 30px;/*px*/
        }
    }
    .set-time{
        width: 702px;       
        margin: 50px auto 0 auto;
        .time-wrap{
            width: 682px;
            height: 60px;
            margin: 30px auto 40px auto;
            display: flex;
            div{
                height: 60px;
                line-height: 60px;
                text-align: center;
            }
            .time{
                width: 48%;
                background-color: #eee;
            }
            .striping{
                width: 4%;
                position: relative;
                &::after{
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    top: 50%;
                    left: 0;
                    background-color: #666;
                }
            }
        }
    }
    .info-wrap{
        width: 702px;
        margin: 0 auto;
        .info-content{
            width: 100%;
            box-sizing: border-box;
            padding-left: 40px;
            margin-top: 40px;
            background-color: #f4f4f4;
            &>div{
                margin-bottom: 20px;
                margin-top: 20px;
                display: flex;
                span{
                    color: #333;
                    font-size: 30px;/*px*/
                    margin-right: 40px;
                    font-weight: bold;
                }

            }
        }
    }
    .pay-way{
        width: 702px;
        margin: 50px auto;
        .way-wrap{
            width: 662px;
            margin: 30px auto;
            .pay-icon{
                width: 40px;
                height:40px;
            }
            &>div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
            .balance-wrap{
                margin-bottom: 30px;
                .balance-left{
                    display: flex;
                    align-items: center;
                    .balance-hint{
                        margin-left: 20px;
                        div{
                            margin-bottom: 10px;
                            font-size: 30px; /*px*/
                            color: #333;
                        }
                        .hint{
                            color: #666;
                            font-size: 24px; /*px*/
                        }
                    }
                }
                .balance-right{
                    display: flex;
                    align-items: center;
                    .to-recharge{
                        margin-right: 40px;
                        color: #3399ff;
                        font-size: 24px; /*px*/                       
                    }
                }
            }
            .bank-wrap{
                .bank-left{
                    display: flex;
                    align-items: center;   
                    .name-wrap{
                        margin-left: 20px;
                        .name{
                            font-size: 30px; /*px*/
                            color: #333;                            
                        }
                        .bank-number{
                            color: #666;
                            font-size: 24px; /*px*/                            
                        }
                    }                 
                }
                .bank-right{
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
    .submit{
        width: 702px;
        height: 80px;
        margin: 0 auto;
        background-color: #3399ff;
        text-align: center;
        line-height: 80px;
        border-radius: 40px;
        color: #fff;
        font-size: 30px;/*px*/
        font-weight: bold;
        letter-spacing: 8px;
    }
}
</style>


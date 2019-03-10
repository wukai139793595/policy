<template>
    <div class="policy-classify">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="" @click="turnBack($event)">
            </div>
            <div class="title">请选择保险</div>
        </div>    
        <div class="classify-wrap">
            <div class="classify-list" v-for="index in 9" :key="index">
                <div class="name-wrap">
                    <div class="name">个人意外险</div>
                    <div class="choose">
                        <span>{{money}}元/份</span>
                        <div class="img-wrap">
                            <img src="../assets/icon/circle.png" alt="" v-if="true">
                            <img src="../assets/icon/choose-circle.png" alt="" v-else>
                        </div>
                    </div>
                </div>
                <div class="info-wrap">
                    <span class="policy-duration">
                        险期：
                        <span>{{'1-3'}}天</span>
                    </span>
                    <span class="policy-sum">
                        保额：
                        <span>{{1000}}元</span>
                    </span>
                </div>
            </div>
        </div>    
        <div class="protocols-submit">
            <div class="protocols-wrap">
                <div class="img-wrap">
                    <img src="../assets/icon/square.png" alt="" v-if="false">
                    <img src="../assets/icon/choose-square.png" alt="" v-else>
                </div>
                <div class="protocols">
                    我已阅读
                    <span @click="showProtocols($event)">保险协议</span>
                </div>
            </div>
            <div class="submit" @click="toSelectPerson($event)">
                确定
            </div>
        </div>
        <div class="protocols-detail" v-if='isShowProtocols'>
            <div class="content">
                <div class="close-wrap">
                    <img src="../assets/icon/close.png" alt="" @click="hideProtocols($event)">
                </div>
                <div class="word-wrap">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data () {
        return {
            isShowProtocols: false
        }
    },
    computed: {
        ...mapState(['money'])
    },
    methods: {
        ...mapMutations(['changeMoney']) ,
        showProtocols (event) {
            this.isShowProtocols = true;
            this.changeMoney(10);
        },
        hideProtocols (event) {
            this.isShowProtocols = false;
        },
        toSelectPerson (event) {
            this.$router.push({
                path: '/selectPerson'
            })
        },
        turnBack (event) {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
.policy-classify{
    width: 100%;
    height: 100%;
    position: relative;
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
    .classify-wrap{
        width: 702px;
        box-sizing: border-box;
        padding: 50px 20px 0 20px;
        margin: 0 auto;
        .classify-list{
            width: 100%;
            padding-bottom: 30px;
            padding-top: 30px;
            border-bottom: 2px solid #f4f4f4;
            .name-wrap{
                width: 100%;
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
                .name{
                    font-size: 30px; /*px*/
                    color: #333;
                }
                .choose{
                    .img-wrap{
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        margin-left: 50px;
                        img{
                            width: 100%;
                            height: 100%;
                            vertical-align: middle;
                        }
                    }
                }
            }
            .info-wrap{
                width: 100%;
                color: #999;
                text-align: left;
                font-size: 24px; /*px*/
                .policy-duration{
                    margin-right: 20px;
                }
            }
        }
    }
    .protocols-submit{
        width: 100%;
        position: fixed;
        bottom: 0px;
        left:0;
        background-color: #fff;
        padding-bottom: 30px;
        .protocols-wrap{
            width: 702px;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 20px;
            .img-wrap{
                width: 30px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .protocols{
                display: inline-block;
                margin-left: 30px;
                font-size: 26px;/*px*/
                letter-spacing: 4px;
                span{
                    display: inline-block;
                    color: #3399ff;
                    text-decoration: underline;
                    transform: translateX(-4px);
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
    .protocols-detail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        .content{
            position: absolute;
            top: 80px;
            left: 80px;
            right:80px;
            bottom: 200px;
            background-color: #fff;
            border-radius: 40px;
            border: 2px solid #eee;
            overflow: hidden;
            .close-wrap{
                text-align: right;
                margin-right: 20px;
                margin-top: 20px;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
            .word-wrap{
                width: 100%;
                background-color: #fff;
            }

        }
    }
}
</style>

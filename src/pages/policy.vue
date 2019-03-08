<template>
    <div class="policy">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="">
            </div>
            <div class="title">购买保险</div>
        </div>
        <div class="group-wrap">
            <div class="group-list" v-for="index in 9" :key="index">
                <div class="name-wrap">
                    <div class="group-name">
                        少儿围棋一组
                    </div>
                    <div class="group-info">
                        <span>总人数：{{'50'}}人，</span>
                        <span>未交保险：{{'50'}}人</span>
                    </div>
                </div>
                <div class="buy-btn" @click="toBuyPolicy($event, index)">
                    购买
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        toBuyPolicy (event, index) {
            this.$router.push({
                path: '/policyClassify',
                query: {
                    groupId: '1'
                }
            })
        }
    }
}
</script>
<style lang="less">
.policy{
    width: 100%;
    height: 100%;
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
    .group-wrap{
        width: 702px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 40px 20px 0 20px;
        .group-list{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
            .name-wrap{
                text-align: left;
                .group-name{
                    color: #333;
                    font-size: 30px; /*px*/
                }
                .group-inf{
                    font-size: 24px; /*px*/
                    span{
                        color: #999;
                    }
                }
            }
            .buy-btn{
                width: 100px;
                height: 40px;
                line-height: 40px;
                font-size: 26px;/*px*/
                background-color: #3399ff;
                color: #fff;
                font-weight: bold;
                text-align: center;
            }

        }
    }
}
</style>

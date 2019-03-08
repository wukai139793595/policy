<template>
    <div class="select-person">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="" @click="turnBack($event)">
            </div>
            <div class="title">请选择保险</div>
        </div> 
        <div class="search-wrap">
            <img src="../assets/icon/search-icon.png" alt="">
            <input class="input" type="text" placeholder="搜索">
        </div>
        <div class="person-wrap">
            <div class="person-list" v-for="index in 9" :key="index">
                <div class="img-wrap">
                    <img src="../assets/icon/square.png" alt="">
                    <div class="name-wrap">
                        <div>{{"戴安娜"}}</div>
                        <div>身份证：{{"36545*****6456"}}</div>
                    </div>
                </div>
                <div class="money-wrap">
                    需交：<span>{{"10"}}元</span>
                </div>
            </div>
        </div>
        <div class="submit-wrap">
            <div class="select-all">
                <img src="../assets/icon/square.png" alt="">
                <span>全选</span>
            </div>
            <div class="select-info">
                <span>已选：{{"0"}}人</span>
                <span>合计：{{"0"}}元</span>
            </div>
            <div class="submit" @click="toWriteInfo($event)">
                购买
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        toWriteInfo (event) {
            this.$router.push({
                path: '/writeInfo'
            })
        },
        turnBack (event) {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
.select-person{
    width: 100%;
    height: 100%;
    position: relative;
    .search-wrap{
        width: 702px;
        height: 60px;
        line-height: 60px;
        background-color: #f6f6f6;
        margin: 40px auto 30px auto;
        img{
            width: 30px;
            height: 30px;
            margin-left: 20px;
            position: relative;
            top: 4px;
        }
        input{
            width: 500px;
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
    }
    .person-wrap{
        width: 702px;
        margin: 0 auto;
        .person-list{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
            .img-wrap{
                display: flex;
                img{
                    width:30px;
                    height: 30px;
                    position: relative;
                    top: 4px;
                }
                .name-wrap{
                    margin-left: 20px;
                    div:nth-of-type(1) {
                        font-size: 30px; /*px*/
                        color: #333;
                        margin-bottom: 8px;
                    }
                    div:nth-of-type(2) {
                        font-size: 24px; /*px*/
                        color: #666;
                    }
                }
            }
            .money-wrap{
                color: #666;
                font-size: 28px; /*px*/
                span{
                    color: #3399ff;
                    font-weight: bold;
                }
            }
        }
    }
    .submit-wrap{
        width: 100%;
        height: 100px;
        padding-left: 28px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        background-color: #fff;
        .select-all{
            img{
                width: 30px;
                height: 30px;
            }
            span{
                font-size: 30px;/*px*/
            }
        }
        .select-info{
            margin-left: -40px;
            span{
                font-size: 24px;/*px*/
            }
        }
        .submit{
            width: 180px;
            height: 100px;
            background-color: #3399ff;
            line-height: 100px;
            text-align: center;
            font-size: 30px; /*px*/
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>

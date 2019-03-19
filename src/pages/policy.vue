<template>
    <div class="policy">
        <!-- <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="">
            </div>
            <div class="title">购买保险</div>
        </div> -->
        <ls-head :headName="headName"/>
        <scroll @refresh="refresh" @loadmore="loadmore">
            <div class="group-wrap">
                <div class="group-list" v-for="(item,index) in groupArr" :key="index">
                    <div class="name-wrap">
                        <div class="group-name">
                            {{item.groupname}}
                        </div>
                        <div class="group-info">
                            <span>总人数：{{item.apply}}人，</span>
                            <span>未交保险：{{item.apply-item.policy}}人</span>
                        </div>
                    </div>
                    <div class="buy-btn" @click="toBuyPolicy($event, index)">
                        购买
                    </div>
                </div>
            </div>        
        </scroll>
    </div>
</template>
<script>
import lsHead from '@/components/lsHead.vue'
import Scroll from '@/components/scroll.vue'
import {postGroup} from '@/api/api.js'
export default {
    data () {
        return {
            headName: '购买保险',
            page: 1, //当前加载到第几页
            limit: 12,
            total: 0,  //总数量
            totalPage: 1, //总页数
            isClock: false, //网络请求锁 
            groupArr:[
                {
                "event_group_id":"20058", //小组id
                "groupname":"I",  //小组名
                "ROW_NUMBER":"1",
                "apply":3,  //报名人数
                "policy":1  //已保险人数
                },
                {
                "event_group_id":"20059",
                "groupname":"甲组",
                "ROW_NUMBER":"2",
                "apply":0,
                "policy":0
           }
           ]
        }
    },
    methods: {
        // 获取赛事小组
        initData () {
            this.isClock = true;
            postGroup({
                event_id: this.eventID,   //需替换成参数
                page: this.page,
                limit: this.limit
            })
            .then((res) => {
                this.isClock = false;
                console.log("policy",res)
                if (res.data.errcode === 0) {
                    var data = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.groupArr.push(...data);                
                }else {
                    this.$message.error(res.data.msg)
                }
            })
            .catch((err) => {
                this.$message.error('网络错误')
            })
        },
        // 下拉刷新
        refresh () {
            this.page = 1;
            this.groupArr = [];
            this.initData();
        },
        //上拉加载
        loadmore (func) {
            if(this.groupArr.length >= this.total) {
                func(true);
            }else{
                if (!this.isClock) {
                    this.page += 1;
                    this.initData();
                }
                func();
            }
        },
        toBuyPolicy (event, index) {
           
            var groupId = this.groupArr[index].event_group_id;
            this.$router.push({
                path: '/policyClassify',
                query: {
                    groupId: groupId
                }
            })
        }
    },
    components: {
        Scroll,
        lsHead
    },
    created () {
        // this.eventId = '1620' || window.parent.name ;
        if (this.$route.query.event_id) {
            this.eventID = this.$route.query.event_id;
        }
        console.log(this.eventID)
        this.initData();
    }
}
</script>
<style lang="less">
.policy{
    width: 100%;
    height: 100%;
    // .head{
    //     width: 702px;
    //     height: 30px;
    //     margin: 0 auto;
    //     padding-top: 20px;
    //     text-align: center;
    //     position: relative;
    //     line-height: 30px;
    //     .turn-back{
    //         position: absolute;
    //         left: 0px;
    //         top: 20px;
    //         width: 30px;
    //         height: 30px;
    //         img{
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }
    //     .title{
    //         display: inline-block;
    //         font-size: 34px;
    //     }
    // }
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
            margin-bottom: 30px;
            box-sizing: border-box;
            padding-bottom: 30px;
            border-bottom: 2px solid #eee;
            .name-wrap{
                text-align: left;
                .group-name{
                    color: #333;
                    font-size: 30px; 
                }
                .group-info{
                    font-size: 28px; 
                    span{
                        color: #999;
                    }
                }
            }
            .buy-btn{
                width: 100px;
                height: 40px;
                line-height: 40px;
                font-size: 28px;
                background-color: #3399ff;
                color: #fff;
                font-weight: bold;
                text-align: center;
            }

        }
    }
}
</style>

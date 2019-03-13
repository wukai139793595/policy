<template>
    <div class="select-person">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="" @click="turnBack($event)">
            </div>
            <div class="title">请选择被保险的名单</div>
        </div> 
        <div class="search-wrap">
            <img src="../assets/icon/search-icon.png" alt="">
            <input class="input" type="text" placeholder="搜索" @input='toSearchPerson($event)'>
        </div>
        <div class="person-wrap" v-if="isSearch">
            <div class="person-list" v-for="(item,index) in searchArr" :key="index">
                <div class="img-wrap">
                    <div class="img-box" @click="selectPerson($event, index)">
                        <img src="../assets/icon/choose-square.png" alt="" v-if="hasSelect(item.idcard)">
                        <img src="../assets/icon/square.png" alt="" v-else>
                    </div>
                    <div class="name-wrap">
                        <div>{{item.name}}</div>
                        <div>身份证：{{item.idcard | identifiHide}}</div>
                    </div>
                </div>
                <div class="money-wrap">
                    需交：<span>{{oneCost | divisionHundred}}元</span>
                </div>
            </div>
        </div>
        <div class="person-wrap" v-if="!isSearch">
            <div class="person-list" v-for="(item,index) in noPolicyPerson" :key="index">
                <div class="img-wrap">
                    <div class="img-box" @click="selectPerson($event, index)">
                        <img src="../assets/icon/choose-square.png" alt="" v-if="hasSelect(item.idcard)">
                        <img src="../assets/icon/square.png" alt="" v-else>
                    </div>
                    <div class="name-wrap">
                        <div>{{item.name}}</div>
                        <div>身份证：{{item.idcard | identifiHide}}</div>
                    </div>
                </div>
                <div class="money-wrap">
                    需交：<span>{{oneCost | divisionHundred}}元</span>
                </div>
            </div>
        </div>
        <div class="submit-wrap">
            <div class="select-all" @click="selectAll($event)">
                <img src="../assets/icon/choose-square.png" alt="" v-if="selectArr.length === noPolicyPerson.length">
                <img src="../assets/icon/square.png" alt="" v-else>
                <span>全选</span>
            </div>
            <div class="select-info">
                <span>已选：{{selectArr.length}}人</span>
                <span>合计：{{selectArr.length | totalMoney(oneCost)}}元</span>
            </div>
            <div class="submit" @click="toWriteInfo($event)">
                购买
            </div>
        </div>
    </div>
</template>
<script>
import {postNoPolicyPerson} from '@/api/api.js'
export default {
    data () {
        return {
            isSearch: false,
            searchArr: [],
            oneCost: 0,           //没份保险金额，需除以100
            noPolicyPerson: [{    //未保险人员集合
                    "group_id": 20058,
                    "name": "阿萨德",
                    "tel": "13666698009",
                    "idcard": "asd4342323",
                    "row_number": "1"
                },
                {
                    "group_id": 20058,
                    "name": "叶晓飞",
                    "tel": "13478670738",
                    "idcard": "332521197703260239",
                    "row_number": "2"
                }],
            isSelectAll: false      //是否全选
        }
    },
    computed: {
        selectArr() {    //客户选择要保险的人员
            return this.$store.state.selectArr
        }
    },
    methods: {
        // 获取赛事小组未保险人员
        getInfo () {
            postNoPolicyPerson({
                group_id: '20058'  //注：正式应改成参数
            })
            .then((res) => {
                console.log(res)
                if (res.data.errcode === 0) {                   
                    this.noPolicyPerson = res.data.list
                }else {
                    this.$message.error(res.data.msg)
                }
            })
            .catch((err) => {
                this.$message.error('网络错误')
            })
        },
        initData() {
            this.getInfo();
            this.oneCost = this.$route.query.oneCost;

        },
        selectPerson (event, index) {  //选择单个人操作
            let person = this.isSearch ? this.searchArr[index] :this.noPolicyPerson[index];
            let flag = false;   //是否已经选中
            let i = -1;
            for (let j = 0 ; j < this.selectArr.length ; j ++) {
                if (person.idcard === this.selectArr[j].idcard) {
                    i = j;
                    flag = true;
                    break;
                }   
            }
            if (flag) {
                this.selectArr.splice(i, 1);
                this.isSelectAll = false;
            }else {
                this.selectArr.push(person);
            }
            this.$store.commit('changeUser', this.selectArr);
        },
        selectAll (event) {   //选择全部操作
            if (!this.isSelectAll) {
                let tempArr = [];
                this.tempSelect = [];
                this.noPolicyPerson.forEach((ele, ind) => {
                    tempArr.push(ele);
                    this.tempSelect.push(ind);
                })
                this.$store.commit('changeUser', tempArr)
                this.isSelectAll = true;
            } else {
                this.tempSelect = [];
                this.$store.commit('changeUser', [])
                this.isSelectAll = false;
            }
        },
        toWriteInfo (event) {
            if (!this.selectArr.length) {
                this.$message('您还未选择要保险的名单');
                return
            }
            this.$store.commit('changeMoney', this.totalMoney);
            this.$router.push({
                path: '/writeInfo',
                query: {
                    oneCost: this.$route.query.oneCost,
                    groupId: this.$route.query.groupId,
                    policyId: this.$route.query.policyId
                }
            })
        },
        // 搜索成员
        toSearchPerson (event) {
            this.searchArr = [];
            if (event.target.value) {
                this.noPolicyPerson.forEach((ele,ind) => {
                    if (ele.name.indexOf(event.target.value) > -1) {
                        this.searchArr.push(ele);
                        this.isSearch = true;
                    }
                })  
            } else {
                this.isSearch = false;
            }
        },
        turnBack (event) {
            this.$store.commit('changeUser',[]);
            this.$router.go(-1);
        },
        hasSelect (value) {
            var len = this.selectArr.length;
            for (let i = 0 ; i < len ; i ++) {
                if (this.selectArr[i].idcard === value) {
                    return true
                }
            }
            return false
        }
    },
    created () {
        this.initData();
    },
    filters: {
        divisionHundred (value) {   //没分金额要除以100
            return (Number(value)/100).toFixed(2);
        },
        totalMoney (value, oneCost) {   //合计金额
            return  (Number(oneCost)/100).toFixed(2) * value
        },
        identifiHide (value) {     //身份证显示****
            let temp = '';
            if(value && value.length > 4) {
                temp = value.substr(0, 2) + '******' + value.substr(-2, value.length);
            }
            return temp;
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
        padding-bottom: 80px;
        .person-list{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
            .img-wrap{
                display: flex;
                .img-box{
                    width: 30px;
                    height: 30px;

                    img{
                        width:30px;
                        height: 30px;
                        position: relative;
                        top: 4px;
                    }
                }
                .name-wrap{
                    margin-left: 20px;
                    div:nth-of-type(1) {
                        font-size: 34px; /*px*/
                        color: #333;
                        margin-bottom: 8px;
                    }
                    div:nth-of-type(2) {
                        font-size: 28px; /*px*/
                        color: #666;
                    }
                }
            }
            .money-wrap{
                color: #666;
                font-size: 32px; /*px*/
                span{
                    color: #3399ff;
                    font-weight: bold;
                }
            }
        }
    }
    .submit-wrap{
        width: 750px;
        height: 100px;
        padding-left: 28px;
        box-sizing: border-box;
        position: absolute;
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
                font-size: 32px;/*px*/
            }
        }
        .select-info{
            margin-left: -40px;
            span{
                font-size: 26px;/*px*/
            }
        }
        .submit{
            width: 180px;
            height: 100px;
            background-color: #3399ff;
            line-height: 100px;
            text-align: center;
            font-size: 32px; /*px*/
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>

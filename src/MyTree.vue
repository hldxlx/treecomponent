<template>
    <el-tree
            :data="allData"
    ></el-tree>
</template>

<script>
    import _ from 'lodash'
    export default {
        props:{
            data:{
                type:Array,
                default:()=>[]
            }
        },
        data(){
            return {
                allData:[]
            }
        },
        watch:{//需要监控父组件传递的data属性，如果有更新 重新渲染
            data(){//数据更新了就需要重新渲染
                this.transformData();
            }
        },
        methods:{
            transformData(){
                //需要根据数据进行克隆，克隆后的数据再进行操作
                let AllData = _.cloneDeep(this.data);
                //目的就是防止在子组件中操作我们父组件的数据
                let treeMapList = AllData.reduce((memo,current) =>{
                    current.label = current.name;
                    memo[current["id"]] = current;
                    return memo;
                },{})
                console.log(treeMapList);
                //vue里 vuex源码
                let result = AllData.reduce((arr,current)=>{
                    let pid = current.pid;
                    let parent = treeMapList[pid];
                    if(parent){
                        parent.children ? parent.children.push(current):parent.children = [current];
                    }else if(pid === 0){//这是根文件夹
                        arr.push(current)
                    }
                    return arr;
                },[]);
                this.allData = result;
            }
        },
        mounted(){
            this.transformData();
        }
    }
</script>


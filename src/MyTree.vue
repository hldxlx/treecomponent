<template>
    <el-tree
            :data="allData"
            default-expand-all
            :render-content="renderContent"
            :expand-on-click-node="false"
    ></el-tree>
</template>

<script>
    import _ from 'lodash'
    export default {
        props:{
            data:{
                type:Array,
                default:()=>[]
            },
            fileDrop:Array,
            diectoryDrop:Array
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
            isParent(data){
                return data.type == 'parent'
            },
            renderContent(h, {node, data}) {
                let list = this.isParent(data)?this.diectoryDrop:this.fileDrop;
                return (<div style={{width:'100%'}}>
                        {
                            this.isParent(data)?
                            node.expanded?<i class="el-icon-folder-opened"></i>:
                            <i class="el-icon-folder"></i>:
                            <i class="el-icon-document"></i>
                        }
                       {data.name}
                        <el-dropdown placement="bottom-start" trigger="click">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                {list.map(item =>(
                                    <el-dropdown-item>{item.value}</el-dropdown-item>
                                 ))}
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>);
            },
            transformData(){
                //需要根据数据进行克隆，克隆后的数据再进行操作
                let AllData = _.cloneDeep(this.data);
                //目的就是防止在子组件中操作我们父组件的数据
                let treeMapList = AllData.reduce((memo,current) =>{
                    //current.label = current.name;
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
<style>
    .el-tree{
        width: 50%;
    }
    .el-dropdown{
        float: right;
    }

</style>

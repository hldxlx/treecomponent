<template>
    <div id="app">
        <MyTree :data="data"></MyTree>
    </div>
</template>

<script>
    import {getTreeList} from '../api'
    import MyTree from './MyTree.vue'
    export default {
        data(){
            return {
                data:[]
            }
        },
        components:{
            MyTree
        },
        async mounted(){
            let {data} = await getTreeList();
            console.log(data);
            //1 扁平的数据如何变成 多层数据 递归数据
            this.data = [...data.parent,...data.child];
            //{id:1, {name:'文件夹1',pid:0,id:1}}

        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>

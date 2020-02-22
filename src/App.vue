<template>
    <div id="app">

    </div>
</template>

<script>
    import {getTreeList} from '../api'
    export default {
        async mounted(){
            let {data} = await getTreeList();
            console.log(data);
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>

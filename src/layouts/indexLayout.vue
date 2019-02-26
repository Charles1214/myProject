<template>
    <div>
           <Header>
                <Menu mode="horizontal" theme="dark" :active-name='$store.state.routerStore.column' @on-select='changeLight'>
                    <div class="layout-logo"><p>Chales二手车交易</p></div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                            <Icon type="ios-search"></Icon>
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                            <Icon type="ios-keypad"></Icon>
                            卖车
                        </MenuItem>
                        <MenuItem name="insurance">
                            <Icon type="ios-analytics"></Icon>
                            保险
                        </MenuItem>
                        <MenuItem name="transfer">
                            <Icon type="ios-paper"></Icon>
                            过户
                        </MenuItem>
                        <MenuItem name="parking">
                            <Icon type="ios-settings"></Icon>
                            停车场
                        </MenuItem>
                    </div>
                    <div class='avatar'>
                             <Dropdown @on-click='all($event)' >
                             <Avatar src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1090633550,3477234281&fm=26&gp=0.jpg'></Avatar>
                                <DropdownMenu slot="list">
                                        <DropdownItem name='message'>个人信息</DropdownItem>
                                        <DropdownItem name='experience'>工作经验</DropdownItem>
                                        <DropdownItem name='letter'>站内信</DropdownItem>
                                        <DropdownItem name='ins'>博客</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                    </div>
                </Menu>
            </Header>
         <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            changeLight(v){
                // 注意push方法可以切换路由
               this.$router.push('/index/' + v)
            },
            all(event){
               if(event=='message'){
                   this.$bus.emit('isshowDrawer',true)
               }
            }
        }
    }
</script>

<style scoped lang="less">
.layout-nav[data-v-46bc4a66]{
    width: 570px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
 .layout-logo{
    width: 150px;
    height: 40px;
    background:slategrey;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 12px;
    left: 20px;
    
    p{
        background:moccasin;
        width:150px;
        height: 40px;
        line-height: 40px;
        font-size: 17px;
        color: #848181;
        text-align: center;
        border-radius:5px;
         text-shadow:0 0 0.2em #b2c0c6,-0 -0 0.2em #d9caca;
    }
    
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 120px;
}
.ivu-layout-header {
    background: #2b313f;
    padding: 0 50px;
    height: 64px;
    line-height: 64px;
}
.ivu-menu-dark{
    background: #2b313f;
}
.avatar{
    cursor: pointer
}
</style>
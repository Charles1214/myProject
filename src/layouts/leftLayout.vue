<template>
    <div>
        <Layout>
            <!-- 侧边栏导航 -->
            <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu v-if="$store.state.routerStore.isShow" :active-name="$store.state.routerStore.subcolumn" theme="light" width="auto" :open-namse="['']" @on-select="changeSub">
                        
                      <MenuItem  v-for="item in get.children" :key="item.En" :name="item.En">{{item.Cn}}</MenuItem>   
                    </Menu>
            </Sider>

            <Layout :style="{padding: '0 24px 24px'}">

                <!-- 面包屑导航 -->
                <Breadcrumb :style="{margin: '24px 0'}">

                    <BreadcrumbItem>
                       <router-link to='/index/index'>首页</router-link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <router-link :to="'/index/'+get.columnEng">{{get.columnTitle}}</router-link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <!-- 这一个块只需要显示当前subcolumn，不负责跳转 -->
                        {{$store.state.routerStore.subcolumnCn}}
                    </BreadcrumbItem>
                    
                    </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                 
                    <router-view></router-view>
                    
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
     //引入抽象过的买车和过户两个包
     import buyroute from '../router/buyroute.js'
     import transferroute from '../router/transferroute.js'
     //将他们封装到对象中
     const use = {
         buy : buyroute,
         transfer: transferroute
     }
     //用计算属性根据全局的column来返回对应的抽象包中的内容，在你点击顶部导航栏的时候，全局的column已经变了
    export default { 
         computed : {
             get(){
                 return use[this.$store.state.routerStore.column]
             }
         },
         //点击触发改变路由
         methods: {
             changeSub(v){
                 this.$router.push({name : v}) 
             }
         },
         created(){
             //解决组件复用不刷新问题
              this.$store.commit('routerStore/changeisShow',{isShow : true})
         },
         updated(){
             //解决组件复用不刷新问题
              this.$store.commit('routerStore/changeisShow',{isShow : true})
         }
        
         
        
    }
</script>

<style scoped lang="less">

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    font-family: Verdana;
    color: #d59b9b;
    background:navajowhite;
    }
    .ivu-menu {
    color: #bca4a4;
    }
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background:blanchedalmond;
    }
    .ivu-layout {
    background:white;
}
</style>
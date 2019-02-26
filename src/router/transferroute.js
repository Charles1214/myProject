//过户栏目下的子栏目数据抽象
export default
    {
        'columnTitle': '过户',
        'columnEng': 'transfer',
        'children': [
            { 'Cn': '本省到本省', 'En': 'InToin', 'component': () => import('../views/transfer/InToin.vue') },
            { 'Cn': '本省到外省', 'En': 'InToout', 'component': () => import('../views/transfer/InToout.vue') },
            { 'Cn': '外省到本省', 'En': 'OutToin', 'component': () => import('../views/transfer/OutToin.vue') },
        ] 
    }

//买车栏目下的子栏目数据抽象
export default
    {
        'columnTitle': '买车',
        'columnEng': 'buy',
        'children': [
            { 'Cn': '选车栏目', 'En': 'SelectCar', 'component': () => import('../views/buy/SelectCar.vue') },
            { 'Cn': 'AI荐车栏目', 'En': 'AIrecmmend', 'component': () => import('../views/buy/AIrecmmend.vue') },
            { 'Cn': '司法拍卖栏目', 'En': 'AuctionCar', 'component': () => import('../views/buy/AuctionCar.vue') },
        ] 
    }

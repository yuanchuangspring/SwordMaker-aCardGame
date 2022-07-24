var guanfangku=[{name:"绝世平原.json",from:"官方",obj:{
    name:"绝世平原",
    description:"官方制作卡包，适合新手入门",
    dif:"0.1",
    version:"DEMO",
    author:"工作室官方",
    num:35,
    cards:[
        {
            name:"史莱姆",
            itstype:"bio",
            num:20,
            heart:10,
            att:5,
            img:[],
            canThrough:false,
            attdis:1
        },
        {
            name:"石堆",
            itstype:"building",
            num:10,
            heart:2,
            img:[]
            
        },
        {
            name:"守原人商店",
            itstype:"building",
            num:5,
            heart:1,
            shop:true,
            shoplist:[{
        name:"运锋",
        func:"transQi('feng');",
        consume:5,
        des:"将剑气运至剑锋",
        cost:10
    }],
            img:[]
        }
       //结束
        
    ]
}}];

var myku=[
    {
        name:"运锋",
        func:"transQi('feng');",
        consume:5,
        des:"将剑气运至剑锋"
    },
    {
        name:"运脊",
        func:"transQi('ji');",
        consume:5,
        des:"将剑气运至剑脊"
    },
    {
        name:"运左从",
        func:"transQi('cong1');",
        consume:5,
        des:"将剑气运至剑左从"
    },
    {
        name:"运格",
        func:"transQi('ge');",
        consume:5,
        des:"将剑气运至剑格"
    },
    {
        name:"运右从",
        func:"transQi('cong2');",
        consume:5,
        des:"将剑气运至剑右从"
    },
    {
        name:"前进",
        func:"forWard(1);",
        consume:2,
        des:"前进一步"
    },
    {
        name:"后退",
        func:"backWard(1);",
        consume:3,
        des:"后退一步"
    },
       
    {
        name:"刺",
        func:"if(qipos=='feng'){attit(7);}else{attit(5);}",
        range:[0,-3],
        jianrange:[0,-3,-6],
        itstype:"dis-att",
        jianjiang:true,
        jianpan:"feng",
        consume:5,
        des:"造成5伤害,若剑气在剑锋，则扩大攻击范围，7伤害",
        maxattdis:1
    },
    {
        name:"左劈",
        func:"if(qipos=='cong1'){attit(6);}else{attit(4);}",
        range:[0,-1,-3],
        jianrange:[0,-3,-1,-4],
        itstype:"dis-att",
        jianjiang:true,
        jianpan:"cong1",
        consume:7,
        des:"造成4伤害,若剑气在左剑从，则扩大攻击范围，6伤害",
        maxattdis:1
    },
    {
        name:"右劈",
        func:"if(qipos=='cong2'){attit(6);}else{attit(4);}",
        range:[0,1,-3],
        jianrange:[0,-3,1,-2],
        itstype:"dis-att",
        jianjiang:true,
        jianpan:"cong2",
        consume:7,
        des:"造成4伤害,若剑气在右剑从，则扩大攻击范围，6伤害",
        maxattdis:1
    },
    {
        name:"挺剑",
        func:"if(qipos=='ji'){attit(7);}else{attit(1);}",
        range:[0],
        jianrange:[0],
        itstype:"dis-att",
        jianjiang:true,
        jianpan:"ji",
        consume:4,
        des:"造成1伤害,若剑气在剑脊，则扩大攻击范围，7伤害",
        maxattdis:1
    },
    {
        name:"格挡",
        func:"if(qipos=='ge'){jianshang(0.3);endTurn(true);}else{jianshang(0.1);endTurn(true);}",
        
        jianjiang:true,
        jianpan:"ge",
        consume:6,
        des:"结束本回合，下回合敌人对你的伤害减10%,若剑气在剑格,减伤30%",
        
    },
    {
        name:"归心",
        func:"if(qipos=='ba'){cure(10);}else{cure(7);}",
        
        jianjiang:true,
        jianpan:"ba",
        consume:5,
        des:"回复7血量,若剑气在剑把，回复10血量",
        
    },
    {
        name:"灵感火花",
        func:"giveCard(2);",
        
        jianjiang:false,
        
        consume:3,
        des:"抽两张牌",
       
    },
    {
        name:"精力充沛",
        func:"chooseGiveup(1,'addEnergy(10);');",
        
        jianjiang:false,
        
        consume:0,
        des:"弃一张牌,回复10点能量",
       
    },
    {
        name:"献祭",
        func:"hurt(15);addEnergy(5);giveCard(1);",
        getFromStart:false,
        jianjiang:false,
        
        consume:0,
        des:"失去15点血,回复5点能量,抽一张牌",
       
    },
    {
        name:"舍命相搏",
        func:"hurt(15);attit(10);",
        getFromStart:false,
        jianjiang:false,
        itstype:"dis-att",
        range:[0],
        consume:2,
        des:"失去10点血,造成10点伤害",
        maxattdis:2
       
    }
];


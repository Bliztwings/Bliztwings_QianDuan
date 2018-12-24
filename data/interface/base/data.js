var orderplace = {}

var recharge = {
    "user_icard_amount": "0.00",
    "recharge_list": {
        "special_recharge": [],
        "normal_recharge": [
            {
                "min": 500,
                "max": 1000,
                "money_give": 100,
                "display_money": 600,
                "display_money_give": 100,
                "description": null,
                "serial_index": 13
            },
            {
                "min": 1000,
                "max": 2000,
                "money_give": 260,
                "display_money": 1260,
                "display_money_give": 260,
                "description": null,
                "serial_index": 14
            },
            {
                "min": 2000,
                "max": 299999,
                "money_give": 600,
                "display_money": 2600,
                "display_money_give": 600,
                "description": null,
                "serial_index": 15
            },
            {
                "min": 200,
                "max": 500,
                "money_give": 30,
                "display_money": 230,
                "display_money_give": 30,
                "description": null,
                "serial_index": 18
            }
        ]
    },
    "online_charge_url": "/base/rechargemoney",
    "recommend_url": "",
    "recommend_name": null
};

var service = {
    categories: [
        {
            "category_id": "aefe3a11a1ab11e7ab6400163e0d2b95",
            "category_name": "洗衣",
            "serviceitem": "1",
            "delivery_fee": [
                {
                    "sentinel_min": "满39.0元",
                    "fee": "免运费"
                },
                {
                    "sentinel_min": "不满39.0元",
                    "fee": "10.0元"
                }
            ]
        }, {
            "category_id": "af108d40a1ab11e7ab6400163e0d2b95",
            "category_name": "洗鞋",
            "serviceitem": "2",
            "delivery_fee": [
                {
                    "sentinel_min": "满39.0元",
                    "fee": "免运费"
                },
                {
                    "sentinel_min": "不满39.0元",
                    "fee": "10.0元"
                }
            ]
        }, {
            "category_id": "af1e85d2a1ab11e7ab6400163e0d2b95",
            "category_name": "家居家纺",
            "serviceitem": "3",
            "delivery_fee": [
                {
                    "sentinel_min": "满39.0元",
                    "fee": "免运费"
                },
                {
                    "sentinel_min": "不满39.0元",
                    "fee": "10.0元"
                }
            ]
        }, {
            "category_id": "af319463a1ab11e7ab6400163e0d2b95",
            "category_name": "皮具洗护",
            "serviceitem": "4",
            "delivery_fee": [
                {
                    "sentinel_min": "满39.0元",
                    "fee": "免运费"
                },
                {
                    "sentinel_min": "不满39.0元",
                    "fee": "10.0元"
                }
            ]
        }
    ]
}

module.exports.orderplace = orderplace

module.exports.recharge = recharge

module.exports.service = service
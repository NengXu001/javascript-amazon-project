import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays:7,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}
];

// The following function is to get the delivery option based on the delivery option id.

export const getDeliveryOption = (deliveryOptionId) => {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

export const calculateDeliveryDate = (deliveryOption) => {

    let deliveryDAY = dayjs();
    let remainingDays = deliveryOption.deliveryDays;

    while (remainingDays > 0) {
        deliveryDAY = deliveryDAY.add(1, 'day');
        if (deliveryDAY.format('dddd') !== 'Saturday' && deliveryDAY.format('dddd') !== 'Sunday') {
            remainingDays--;
        }
    }
    

    return deliveryDAY.format('dddd, MMMM D');
};
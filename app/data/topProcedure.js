import { Images } from "@config";
import { UserData } from "./user";
const PackageData = [
    {
        id: "1",
        image: Images.trip1,
        name: "Package in London",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "2",
        image: Images.trip2,
        name: "Package in Paris",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "3",
        image: Images.trip3,
        name: "Package in Italy",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "4",
        image: Images.trip4,
        name: "Package in Portugal",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "5",
        image: Images.trip5,
        name: "Package in Netherlands",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "6",
        image: Images.trip6,
        name: "Package in Belgium",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "7",
        image: Images.trip7,
        name: "Package in Finland",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "8",
        image: Images.trip8,
        name: "Package in Luxembourg",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "9",
        image: Images.trip1,
        name: "Package in Slovakia",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "10",
        image: Images.trip2,
        name: "Package in Latvia",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "11",
        image: Images.trip3,
        name: "Package in Kosovo",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "12",
        image: Images.trip4,
        name: "Package in Vatican City",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    },
    {
        id: "13",
        image: Images.trip5,
        name: "Package in French Guiana",
        location: "Euro",
        travelTime: "8 Days 7 Nights",
        startTime: "July 19th 2019",
        price: "$1500,99",
        rate: 4,
        rateCount: "85 of 100",
        numReviews: 100,
        author: {
            image: Images.profile2,
            point: "9.5",
            name: "by สภากาชาติไทย"
        },
        services: [
            { icon: "history", name: "8 Days 1 Night" },
            { icon: "medkit", name: "Insurrance Included" },
            { icon: "user", name: "10 slots available" },
            { icon: "ship", name: "Moving by Boat" }
        ]
    }
];

export { PackageData };

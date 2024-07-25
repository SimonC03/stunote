import Card from "@/components/stripe/Card"

const plans = [
    {
        name: 'Monthly Plan',
        price: 19,
        currency: 'SEK',
        frequency: '/month',
        priceId: 'price_1Pg7v1Rq7k4dESwAS2pqyeiT',
        featured: false,
        features: [
            '7 Days Free Trial',
            'bla asdasd',
            'bla',
        ]
    },
    {
        name: 'Term Plan',
        price: 49,
        currency: 'SEK',
        frequency: '/3-months',
        priceId: 'price_1Pg7t0Rq7k4dESwALfL6McdI',
        featured: true,
        features: [
            '7 Days Free Trial',
            'bla',
            'bla',
        ]
    },
    {
        name: 'Yearly Plan',
        price: 189,
        currency: 'SEK',
        frequency: '/year',
        priceId: 'price_1Pg7tkRq7k4dESwAYMcpGEEi',
        featured: false,
        features: [
            '7 Days Free Trial',
            'bla',
            'bla',
        ]
    },
]

const SubscriptionPage = () => {
  return (
    <div className="h-full py-36 lg:flex lg:justify-center lg:items-center">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-0">
            {plans.map(plan => (
            <div key={plan.name} className={`w-full max-w-md mx-auto ${
                plan.featured ? "order-first lg:order-none lg:scale-110 lg:transform lg:z-10" : "lg:transform lg:scale-90"
            }`}>
                <Card {...plan}  />
            </div>
            ))}
        </div>
    </div>
  );
};

export default SubscriptionPage;

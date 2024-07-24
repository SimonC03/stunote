import { FaCheck } from 'react-icons/fa';
import EmbeddedCheckoutButton from "@/components/stripe/EmbeddedCheckoutButton"; // Justera sökvägen enligt din mappstruktur

const Card = ({ 
    name = 'Monthly', 
    price = 0, 
    currency='SEK', 
    frequency='month',
    priceId='',
    featured = false,
    features = [],
}) => (
    <div 
    className={`bg-white border-orange-1 rounded-md shadow-xl cursor-pointer relative ${ featured ? 'border' : 'border border-opacity-10'
    }`}>

    {/* Popular tag */}
    {featured ? (
        <span className='bg-blue-500 text-white px-6 py-1 rounded-full uppercase text-sm font-semibold whitespace-nowrap absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                Most popular
            </span>
        ) : null}

    {/* Card header */}
    <div className="px-6 py-12 border-b-2 border-gray-100">
        <p className="text-3xl font-semibold text-center mb-4">{name}</p>
        <div className="flex justify-center items-center">
            <div className="flex items-start ">
                <p className="text-4xl font-medium">{currency}</p>
                <p className="text-7xl font-bold">{price}</p>
            </div>
            <p className="text-2xl text-gray-400">{frequency}</p>
        </div>
    </div>
    {/* Card body */}
    <div className="p-12 bg-gray-200">
        <ul className="space-y-3">
            {features.map((feature, index) => (
                <li key={index}className='flex items-center space-x-4 flex-shrink-0'>
                    <FaCheck className='w-6 h-6 text-green-500'/>
                    <p className="text-lg text-gray-600">{feature}</p>
                </li>
            ))
            }
        </ul>
        <EmbeddedCheckoutButton featured={featured} priceId={priceId}/>
    </div>
</div>
)

export default Card
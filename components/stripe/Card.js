import { FaCheck } from 'react-icons/fa';
import EmbeddedCheckoutButton from "@/components/stripe/EmbeddedCheckoutButton"; // Adjust the path according to your folder structure
import './Card.css'; // Ensure this path is correct based on your project structure

const Card = ({ 
    name = 'Monthly', 
    price = 0, 
    currency='SEK', 
    frequency='month',
    description= '',
    priceId='',
    featured = false,
    features = [],
    userId = '',
}) => (
    <div className={`card ${featured ? 'featured' : 'not-featured'}`}>
        {/* Popular tag */}
        {featured ? (
            <span className='popular-tag'>
                Most popular
            </span>
        ) : null}

        {/* Card header */}
        <div className="card-header">
            <p className="title">{name}</p>
            <div className="price-container">
                <div className="currency-price">
                    <p className="currency">{currency}</p>
                    <p className="price">{price}</p>
                </div>
                <p className="frequency">{frequency}</p>
            </div>
            <p className='description'>{description}</p>
        </div>
        {/* Card body */}
        <div className="card-body">
            <ul>
                {features.map((feature, index) => (
                    <li key={index} className='feature-item'>
                        <FaCheck className='icon'/>
                        <p className="feature">{feature}</p>
                    </li>
                ))}
            </ul>
            <EmbeddedCheckoutButton featured={featured} priceId={priceId} userId={userId}/>
        </div>
    </div>
)

export default Card

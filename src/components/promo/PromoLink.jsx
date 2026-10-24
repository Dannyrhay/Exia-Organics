import { Link } from 'react-router-dom';

/** Site links ("/products") navigate in-app; full web addresses open in a new tab. */
export default function PromoLink({ href = '', children, ...props }) {
    if (href.startsWith('/')) {
        return (
            <Link to={href} {...props}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}

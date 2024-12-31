import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const BackButton = ({ text, link }) => {
  return (
    <Link
      href={link}
      className="text-gray-500 hover:underline flex items-center gap-1 font-bold mb-5"
    >
      <ArrowLeftCircle size={18} /> {text}
    </Link>
  );
};

// Define PropTypes for runtime type checking
BackButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BackButton;
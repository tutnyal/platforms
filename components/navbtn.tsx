import React from 'react';
import Link from 'next/link';

const MyButton: React.FC = () => {
    return (
        <Link href="/HomePage" passHref> {/* Replace '/my-target-page' with your target URL */}
            <button>Go to Page</button>
        </Link>
    );
};

export default MyButton;

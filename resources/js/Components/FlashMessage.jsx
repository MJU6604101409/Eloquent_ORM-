import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
    const { flash, errors } = usePage().props;
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (flash.success || flash.error || Object.keys(errors).length > 0) {
            setIsVisible(true);
            
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash, errors]);

    if (!isVisible || (!flash.success && !flash.error && Object.keys(errors).length === 0)) return null;

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
            {flash.success && (
                <div className="bg-green-100 text-green-800 mb-4 rounded border p-4 shadow-lg animate-fade-in-down">
                    {flash.success}
                </div>
            )}

            {(flash.error || Object.keys(errors).length > 0) && (
                <div className="bg-red-100 text-red-800 mb-4 rounded border p-4 shadow-lg animate-fade-in-down">
                    {flash.error || (
                        <ul>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlashMessage;
const statusStyles = {
    'Delivered': 'bg-[var(--primary-light)] text-[var(--primary)]',
    'In Transit': 'bg-yellow-50 text-yellow-600',
    'Pending': 'bg-blue-50 text-blue-600',
    'Cancelled': 'bg-red-50 text-red-500',
};

const dots = {
    'Delivered': 'bg-[var(--primary)]',
    'In Transit': 'bg-yellow-500',
    'Pending': 'bg-blue-500',
    'Cancelled': 'bg-red-500',
};

export default function Badge({ status }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || 'bg-gray-400'}`} />
            {status}
        </span>
    );
}

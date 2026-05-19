export const BookingStatus = {
    Draft: 0,
    Pending: 1,
    UnderReview: 2,
    ModificationRequested: 3,
    Confirmed: 4,
    Rejected: 5,
    PaymentPending: 6,
    Paid: 7,
    Booked: 8,
    Completed: 9,
    Cancelled: 10,
    Refunded: 11,
    0: 'Draft',
    1: 'Pending',
    2: 'UnderReview',
    3: 'ModificationRequested',
    4: 'Confirmed',
    5: 'Rejected',
    6: 'PaymentPending',
    7: 'Paid',
    8: 'Booked',
    9: 'Completed',
    10: 'Cancelled',
    11: 'Refunded'
} as const;
export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus] | any;

export const PaymentStatus = {
    None: 0,
    Pending: 1,
    PartiallyPaid: 2,
    Paid: 3,
    Refunded: 4,
    0: 'None',
    1: 'Pending',
    2: 'PartiallyPaid',
    3: 'Paid',
    4: 'Refunded'
} as const;
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus] | any;


export interface BookingStatusHistory {
    oldStatus: BookingStatus;
    newStatus: BookingStatus;
    changedBy: string;
    changedAt: string;
    notes?: string;
}

export interface Booking {
    id: number;
    bookingReference: string;
    customerId: string;
    customerName: string;
    vendorId: string;
    vendorName: string;
    serviceName: string;
    eventDate: string;
    eventTime: string;
    location: string;
    guestCount: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    totalAmount: number;
    createdAt: string;
    statusHistory: BookingStatusHistory[];
}

export interface BookingRequest {
    vendorId: string;
    productId?: number;
    eventDate: string;
    eventTime: string;
    location: string;
    guestCount: number;
    requirements: string;
    budget: string;
    notes: string;
    totalAmount: number;
}

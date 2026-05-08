export enum BookingStatus {
    Draft = 0,
    Pending = 1,
    UnderReview = 2,
    ModificationRequested = 3,
    Confirmed = 4,
    Rejected = 5,
    PaymentPending = 6,
    Paid = 7,
    Booked = 8,
    Completed = 9,
    Cancelled = 10,
    Refunded = 11
}

export enum PaymentStatus {
    None = 0,
    Pending = 1,
    PartiallyPaid = 2,
    Paid = 3,
    Refunded = 4
}

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

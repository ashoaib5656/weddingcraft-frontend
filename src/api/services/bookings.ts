import api from '../axios';
import endpoints from '../GlobalEndpoints';
import type { Booking, BookingRequest } from '../../Types/booking';

const BOOKING_SERVICE = {
    // Customer Actions
    requestBooking: (data: BookingRequest) => api.post(`${endpoints.Bookings}/request`, data),
    getMyBookings: () => api.get<{ data: Booking[] }>(`${endpoints.Bookings}/my`),
    getBookingDetails: (id: number) => api.get<{ data: Booking }>(`${endpoints.Bookings}/${id}`),
    confirmPayment: (id: number) => api.post(`${endpoints.Bookings}/${id}/payment-confirm`),

    // Vendor Actions
    getVendorBookings: () => api.get<{ data: Booking[] }>(endpoints.VendorBookings),
    approveBooking: (id: number, notes?: string) => api.post(`${endpoints.VendorBookings}/${id}/approve`, { notes }),
    rejectBooking: (id: number, notes?: string) => api.post(`${endpoints.VendorBookings}/${id}/reject`, { notes }),
    requestModification: (id: number, notes?: string) => api.post(`${endpoints.VendorBookings}/${id}/request-modification`, { notes }),
};

export default BOOKING_SERVICE;

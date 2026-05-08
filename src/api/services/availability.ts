import API from '../axios';

export interface VendorAvailability {
    id: number;
    vendorId: string;
    blockedDate: string;
    reason: string;
}

export interface BlockDateRequest {
    date: string;
    reason?: string;
}

const AVAILABILITY_SERVICE = {
    getVendorAvailability: (vendorId: string) => 
        API.get<{ success: boolean; data: VendorAvailability[] }>(`/VendorAvailability/${vendorId}`),

    blockDate: (request: BlockDateRequest) => 
        API.post<{ success: boolean; message: string }>('/VendorAvailability/block', request),

    unblockDate: (id: number) => 
        API.delete<{ success: boolean; message: string }>(`/VendorAvailability/unblock/${id}`),
};

export default AVAILABILITY_SERVICE;

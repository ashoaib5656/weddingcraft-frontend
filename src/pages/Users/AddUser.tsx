import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    MenuItem,
    TextField,
    FormControlLabel,
    Switch,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import InputField from '../../components/Form/InputField';
import FormButton from '../../components/Form/FormButton';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { useAuth } from '../../contexts/Auth/useAuth';

// Validation Schema
const schema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    status: yup.boolean().default(true),
    // Vendor specific fields (Conditional)
    category: yup.string().when('role', {
        is: 'Vendor',
        then: (schema) => schema.required('Category is required'),
        otherwise: (schema) => schema.optional()
    }),
    contactPerson: yup.string().when('role', {
        is: 'Vendor',
        then: (schema) => schema.required('Contact Person is required'),
        otherwise: (schema) => schema.optional()
    }),
    phone: yup.string().when('role', {
        is: (val: string) => ['Vendor', 'Staff'].includes(val),
        then: (schema) => schema.required('Phone Number is required'),
        otherwise: (schema) => schema.optional()
    }),
    location: yup.string().when('role', {
        is: 'Vendor',
        then: (schema) => schema.required('Location is required'),
        otherwise: (schema) => schema.optional()
    }),
    staffPosition: yup.string().when('role', {
        is: 'Staff',
        then: (schema) => schema.required('Staff Position is required'),
        otherwise: (schema) => schema.optional()
    }),
    staffStatus: yup.string().optional(),
}, [['role', 'category'], ['role', 'contactPerson'], ['role', 'phone'], ['role', 'location'], ['role', 'staffPosition']]);

//const roles = ['Admin', 'Manager', 'Staff', 'Vendor', 'Client'];
const roles = ['Admin', 'Manager', 'Staff', 'Vendor', 'Client'];

const categories = [
    'Venue', 
    'Photography', 
    'Decoration', 
    'Catering', 
    'Music/DJ', 
    'Makeup Artist', 
    'Videography', 
    'Choreographer',
    'Invitation Cards'
];

const staffPositions = [
    'Wedding Coordinator', 
    'Support Specialist', 
    'Venue Liaison', 
    'Vendor Relations', 
    'Operations Lead'
];

const staffStatuses = ['Available', 'Busy', 'On Leave'];

const AddUser = () => {
    const navigate = useNavigate();
    const { success } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema as any),
        defaultValues: {
            name: '',
            email: '',
            role: '',
            password: '',
            status: true,
            category: '',
            contactPerson: '',
            phone: '',
            location: '',
            staffPosition: '',
            staffStatus: 'Available',
        },
    });

    const { role: currentUserRole } = useAuth();
    const selectedRole = watch('role');

    const onSubmit = async (data: any) => {
        setLoading(true);
        console.log('Submitting Unified User Data:', data);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setLoading(false);
        success(`${data.role} added successfully!`);
        
        // Dynamic redirection based on context
        if (data.role === 'Vendor' || currentUserRole?.toLowerCase() === 'manager') {
            navigate('/manager/vendors');
        } else if (data.role === 'Staff') {
            navigate('/manager/staff');
        } else {
            navigate('/admin/users');
        }
    };

    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Breadcrumbs 
                    separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'text.disabled' }} />} 
                    aria-label="breadcrumb"
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/users"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/users');
                        }}
                        sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'text.secondary' }}
                    >
                        Users
                    </Link>
                    <Typography color="primary" sx={{ fontSize: '1rem', fontWeight: 800 }}>
                        Add User
                    </Typography>
                </Breadcrumbs>
            </Box>

            <DashboardCard sx={{ p: 2.5, borderRadius: '12px' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                                Account Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Full Name *"
                                        placeholder="Enter user's full name"
                                        error={!!errors.name}
                                        helperText={errors.name?.message as string}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Email Address *"
                                        placeholder="example@wedspot.com"
                                        error={!!errors.email}
                                        helperText={errors.email?.message as string}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography
                                    component="label"
                                    sx={{
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: "#334155",
                                        mb: 0.75,
                                        display: "block",
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                >
                                    Role *
                                </Typography>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            size="small"
                                            error={!!errors.role}
                                            helperText={errors.role?.message as string}
                                            InputProps={{
                                                sx: { 
                                                    borderRadius: '10px',
                                                    height: '42px',
                                                    bgcolor: '#f8fafc'
                                                }
                                            }}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Set Password *"
                                        type="password"
                                        placeholder="Min 6 characters"
                                        error={!!errors.password}
                                        helperText={errors.password?.message as string}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', pb: '1px' }}>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    {...field} 
                                                    checked={field.value} 
                                                    color="primary" 
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                                    Active Status
                                                </Typography>
                                            }
                                        />
                                    )}
                                />
                            </Box>
                        </Grid>

                        {/* Vendor Specific Information */}
                        {selectedRole === 'Vendor' && (
                            <>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                                        Business Information
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography
                                            component="label"
                                            sx={{
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#334155",
                                                mb: 0.75,
                                                display: "block",
                                                fontFamily: "'Inter', sans-serif",
                                            }}
                                        >
                                            Category *
                                        </Typography>
                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    fullWidth
                                                    size="small"
                                                    error={!!errors.category}
                                                    helperText={errors.category?.message as string}
                                                    InputProps={{
                                                        sx: { 
                                                            borderRadius: '10px',
                                                            height: '42px',
                                                            bgcolor: '#f8fafc'
                                                        }
                                                    }}
                                                >
                                                    {categories.map((cat) => (
                                                        <MenuItem key={cat} value={cat}>
                                                            {cat}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            )}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="contactPerson"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                label="Contact Person *"
                                                placeholder="Business manager name"
                                                error={!!errors.contactPerson}
                                                helperText={errors.contactPerson?.message as string}
                                                InputProps={{ sx: { height: '42px' } }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                label="Business Phone *"
                                                placeholder="+91 XXXXX XXXXX"
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message as string}
                                                InputProps={{ sx: { height: '42px' } }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                label="Business Location *"
                                                placeholder="Enter full address or city"
                                                error={!!errors.location}
                                                helperText={errors.location?.message as string}
                                                InputProps={{ sx: { height: '42px' } }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Staff Specific Information */}
                        {selectedRole === 'Staff' && (
                            <>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                                        Staff Information
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography
                                            component="label"
                                            sx={{
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#334155",
                                                mb: 0.75,
                                                display: "block",
                                                fontFamily: "'Inter', sans-serif",
                                            }}
                                        >
                                            Staff Position *
                                        </Typography>
                                        <Controller
                                            name="staffPosition"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    fullWidth
                                                    size="small"
                                                    error={!!errors.staffPosition}
                                                    helperText={errors.staffPosition?.message as string}
                                                    InputProps={{
                                                        sx: { 
                                                            borderRadius: '10px',
                                                            height: '42px',
                                                            bgcolor: '#f8fafc'
                                                        }
                                                    }}
                                                >
                                                    {staffPositions.map((pos) => (
                                                        <MenuItem key={pos} value={pos}>
                                                            {pos}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            )}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography
                                            component="label"
                                            sx={{
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#334155",
                                                mb: 0.75,
                                                display: "block",
                                                fontFamily: "'Inter', sans-serif",
                                            }}
                                        >
                                            Current Status
                                        </Typography>
                                        <Controller
                                            name="staffStatus"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    fullWidth
                                                    size="small"
                                                    error={!!errors.staffStatus}
                                                    helperText={errors.staffStatus?.message as string}
                                                    InputProps={{
                                                        sx: { 
                                                            borderRadius: '10px',
                                                            height: '42px',
                                                            bgcolor: '#f8fafc'
                                                        }
                                                    }}
                                                >
                                                    {staffStatuses.map((status) => (
                                                        <MenuItem key={status} value={status}>
                                                            {status}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            )}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                label="Phone Number *"
                                                placeholder="+91 XXXXX XXXXX"
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message as string}
                                                InputProps={{ sx: { height: '42px' } }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <FormButton
                                    variant="outlined"
                                    onClick={() => navigate('/admin/users')}
                                    sx={{ 
                                        width: 'auto', 
                                        minWidth: '100px',
                                        px: 3,
                                        height: '40px',
                                        fontSize: '0.9rem',
                                        py: 0,
                                        background: 'transparent',
                                        color: 'text.secondary',
                                        borderColor: '#e2e8f0',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: '#f1f5f9',
                                            borderColor: '#cbd5e1',
                                            transform: 'none'
                                        }
                                    }}
                                >
                                    Cancel
                                </FormButton>
                                <FormButton
                                    type="submit"
                                    loading={loading}
                                    sx={{ 
                                        width: 'auto', 
                                        minWidth: '100px',
                                        px: 4, 
                                        height: '40px', 
                                        fontSize: '0.9rem',
                                        py: 0
                                    }}
                                >
                                    Save
                                </FormButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default AddUser;

import { Box, Button, Tooltip, useTheme, alpha } from '@mui/material';
import {
  type MRT_RowData,
  type MRT_TableInstance,
  MRT_GlobalFilterTextField,
  MRT_ToggleGlobalFilterButton,
} from 'material-react-table';
import CustomPagination from './CustomPagination';
import { handleDownloadExcel } from '../../utils/ExcelUploads';
import ExcelImage from '../../assets/icons/excel.svg';
import { useAppSelector } from '../../store/index';

interface props {
  table: MRT_TableInstance<MRT_RowData> | any;
  ExcelData?: {
    data: any;
    fileName: any;
    ignoreValues?: string[];
    keepTheSameNamingCase?: string[];
    replaceNaming?: any;
  };
  isSmall?: boolean;
  hideFullScreen?: boolean;
  actionButton?: React.ReactNode;
}

export const TableBottomToolbar = ({ table }: props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        // Set a fixed height for the container to make it compact
        height: '36px',
        // Ensure content is vertically centered
        alignItems: 'center',
        // Remove any default padding
        padding: '0 !important'
      }}
    >
      <Box
        className="pagination-container"
        sx={{
          // Remove padding from all child Box components
          '& .MuiBox-root': { padding: '0px !important' },
          // Consistent font size for all text elements in the footer
          '& .MuiTypography-root': { fontSize: '10px !important' },
          '& .MuiTablePagination-select': { fontSize: '10px !important' },
          '& .MuiTablePagination-selectLabel': { fontSize: '10px !important', fontWeight: 600 },
          '& .MuiTablePagination-displayedRows': { fontSize: '10px !important', fontWeight: 400 },
          // Ensure the pagination toolbar is compact
          '& .MuiToolbar-root': {
            minHeight: '36px !important',
            height: '36px !important',
            padding: '0 8px !important'
          },
          // Increase button size for better clickability
          '& .MuiTablePagination-actions .MuiButtonBase-root': {
            width: '28px !important',
            height: '28px !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important'
          },
          // Increase icon size using width and height
          '& .MuiTablePagination-actions .MuiButtonBase-root .MuiSvgIcon-root': {
            width: '22px !important',
            height: '22px !important',
            fontSize: 'unset !important' // Use width/height instead of font-size
          }
        }}
      >
        <CustomPagination table={table} />
      </Box>
    </Box>
  );
};

export const TableHeaderToolbar = ({ table, ExcelData, actionButton }: props) => {
  const userDateFormat = useAppSelector((state: any) => state.auth.user?.dateFormat);
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        width: 'max-content'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{
          width: table.getState().showGlobalFilter ? '200px' : '0px',
          opacity: table.getState().showGlobalFilter ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <MRT_GlobalFilterTextField 
            table={table} 
            placeholder="Search items..."
            sx={{ 
              width: '100%',
              '& .MuiInputBase-root': { 
                height: '30px', 
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '6px',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                width: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.5)
                },
                '&.Mui-focused': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
                }
              },
              '& .MuiInputBase-input': {
                padding: '4px 8px'
              },
              '& .MuiSvgIcon-root': {
                fontSize: '18px',
                color: theme.palette.text.secondary
              },
              '& .MuiInputAdornment-root': {
                  marginRight: '4px'
              }
            }} 
          />
        </Box>
        <MRT_ToggleGlobalFilterButton 
          table={table} 
          sx={{ 
            p: 0, 
            width: '32px', 
            height: '32px',
            color: 'primary.main',
            backgroundColor: 'transparent',
            '&:hover': { 
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              color: 'primary.dark' 
            }
          }} 
        />
      </Box>

      {ExcelData && (
        <Tooltip title="Excel Download">
          <Button
            onClick={() =>
              handleDownloadExcel(
                ExcelData?.data,
                ExcelData?.fileName,
                userDateFormat || 'DD-MM-YYYY',
                ExcelData?.ignoreValues,
                ExcelData?.keepTheSameNamingCase,
                ExcelData?.replaceNaming
              )
            }
            sx={{ 
              p: 0, 
              minWidth: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              '&:hover': {
                background: alpha(theme.palette.success.main, 0.05),
              }
            }}
          >
            <Box component={'img'} src={ExcelImage} alt="excel" sx={{ width: 18, height: 18 }} />
          </Button>
        </Tooltip>
      )}

      {actionButton && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {actionButton}
        </Box>
      )}
    </Box>
  );
};

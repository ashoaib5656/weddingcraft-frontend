import React from 'react';
import { Box } from '@mui/material';
import { type MRT_RowData, type MRT_TableInstance, MRT_TablePagination } from 'material-react-table';

interface CustomPaginationProps {
  table: MRT_TableInstance<MRT_RowData> | any;
}

/**
 * CustomPagination component that wraps MRT_TablePagination
 * with specific styling for larger navigation icons
 */
const CustomPagination: React.FC<CustomPaginationProps> = ({ table }) => {
  // Apply styles after component mounts
  React.useEffect(() => {
    // Direct DOM manipulation to ensure icon sizes are increased
    const applyIconStyles = () => {
      const icons = document.querySelectorAll('.MuiTablePagination-actions .MuiButtonBase-root .MuiSvgIcon-root');
      icons.forEach((icon: Element) => {
        if (icon instanceof HTMLElement) {
          icon.style.width = '24px';
          icon.style.height = '24px';
          icon.style.fontSize = '24px';
        }
      });

      const buttons = document.querySelectorAll('.MuiTablePagination-actions .MuiButtonBase-root');
      buttons.forEach((button: Element) => {
        if (button instanceof HTMLElement) {
          button.style.width = '32px';
          button.style.height = '32px';
          button.style.display = 'flex';
          button.style.justifyContent = 'center';
          button.style.alignItems = 'center';
        }
      });
    };

    // Apply immediately and after a short delay to ensure it works after rendering
    applyIconStyles();
    const timeoutId = setTimeout(applyIconStyles, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      className="custom-pagination-container"
      sx={{
        '& .MuiToolbar-root': {
          minHeight: '40px !important',
          height: '40px !important',
          padding: '0 16px !important'
        },
        '& .MuiTablePagination-actions': {
          '& .MuiButtonBase-root': {
            width: '32px !important',
            height: '32px !important',
            padding: '0 !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important'
          },
          '& .MuiSvgIcon-root': {
            width: '24px !important',
            height: '24px !important',
            fontSize: '24px !important'
          }
        },
        '& .MuiTablePagination-selectLabel': {
          fontWeight: 600,
          fontSize: 10
        },
        '& .MuiTablePagination-select': {
          fontSize: 10
        },
        '& .MuiTablePagination-displayedRows': {
          fontWeight: 400,
          fontSize: 10
        }
      }}
    >
      <MRT_TablePagination table={table} />
    </Box>
  );
};

export default CustomPagination;

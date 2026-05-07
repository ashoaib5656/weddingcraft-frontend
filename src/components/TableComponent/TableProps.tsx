import { Box, Tooltip, useTheme, alpha, IconButton, Typography, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search as SearchIcon, 
  Close as CloseIcon, 
  FilterList as FilterIcon,
} from '@mui/icons-material';
import {
  type MRT_RowData,
  type MRT_TableInstance,
  MRT_GlobalFilterTextField
} from 'material-react-table';
import CustomPagination from './CustomPagination';
import { handleDownloadExcel } from '../../utils/ExcelUploads';
import ExcelImage from '../../assets/icons/excel.svg';
import { useAppSelector } from '../../store/index';

interface props {
  table: MRT_TableInstance<MRT_RowData> | any;
  ExcelData?: {
    data: any;
    fileName: string;
  };
  actionButton?: any;
  title?: string;
}

export const TableBottomToolbar = ({ table }: props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: 0,
        bgcolor: 'background.paper',
        borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.05)}`,
      }}
    >
      <CustomPagination table={table} />
    </Box>
  );
};


export const TableHeaderToolbar = ({ table, ExcelData, actionButton, title }: props) => {
  const userDateFormat = useAppSelector((state: any) => state.auth.user?.dateFormat) || 'DD-MM-YYYY';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSearchActive = !!table.getState().showGlobalFilter;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        p: '16px 24px',
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`
      }}
    >
      {/* Left Side: Title */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
            {title}
          </Typography>
        )}
      </Box>

      {/* Right Side: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AnimatePresence mode="wait">
          {!isSearchActive ? (
            <motion.div
              key="search-trigger"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <Tooltip title="Search">
                <IconButton 
                  onClick={() => table.setShowGlobalFilter(true)}
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.divider, 0.05),
                    borderRadius: '10px'
                  }}
                >
                  <SearchIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            </motion.div>
          ) : (
            <motion.div
              key="search-field"
              initial={{ opacity: 0, width: 0, originX: 1 }}
              animate={{ opacity: 1, width: isMobile ? 160 : 250 }}
              exit={{ opacity: 0, width: 0, originX: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}
            >
              <MRT_GlobalFilterTextField 
                table={table} 
                autoFocus
                placeholder="Search..."
                sx={{ 
                  width: '100%',
                  '& .MuiInputBase-root': { 
                    height: '36px', 
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderRadius: '10px',
                    pr: 1,
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
              <IconButton 
                size="small" 
                onClick={() => {
                  table.setGlobalFilter('');
                  table.setShowGlobalFilter(false);
                }}
                sx={{ ml: 0.5, flexShrink: 0 }}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </motion.div>

          )}
        </AnimatePresence>

        {ExcelData && (
          <Tooltip title="Export to Excel">
            <IconButton 
              onClick={() => handleDownloadExcel(ExcelData.data, ExcelData.fileName, userDateFormat)}
              size="small"
              sx={{ 
                bgcolor: alpha(theme.palette.divider, 0.05),
                borderRadius: '10px',
                p: '6px'
              }}
            >
              <img src={ExcelImage} alt="excel" style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Filters">
          <IconButton 
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.divider, 0.05),
              borderRadius: '10px'
            }}
          >
            <FilterIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        {actionButton}
      </Box>
    </Box>
  );
};

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  useTheme, 
  alpha, 
  Box,
  Typography
} from '@mui/material';
import { MRT_TableBodyCellValue, flexRender } from 'material-react-table';

const TableComponent = ({ table }: any) => {
  const theme = useTheme();

  return (
    <TableContainer 
      sx={{ 
        overflowX: 'auto', 
        maxWidth: '100%', 
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        borderRadius: '12px',
        bgcolor: 'background.paper',
        '&::-webkit-scrollbar': {
          height: '6px',
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.divider, 0.05),
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.divider, 0.2),
          borderRadius: '10px',
          '&:hover': {
            background: alpha(theme.palette.divider, 0.3),
          },
        },
      }}
    >
      <Table stickyHeader sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableCell
                  key={header.id}
                  align={header.column.columnDef.muiTableHeadCellProps?.align || "center"}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    backdropFilter: 'blur(8px)',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'text.secondary',
                    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 0.8,
                    px: 2,
                    zIndex: 1,
                    transition: 'background-color 0.2s ease',
                    whiteSpace: 'nowrap',
                    '& .MuiCheckbox-root': {
                      p: 0.5,
                      color: alpha(theme.palette.text.secondary, 0.3),
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      }
                    }
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.Header ?? header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow 
                key={row.id} 
                selected={row.getIsSelected()}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                    '& .MuiTableCell-root': {
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  },
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }
                }}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    align={cell.column.columnDef.muiTableBodyCellProps?.align || "center"}
                    sx={{ 
                      fontSize: { xs: '12px', md: '13px' }, 
                      fontWeight: 500,
                      py: 0.8,
                      px: 2,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                      color: 'text.primary',
                      transition: 'border-color 0.2s ease',
                      '& .MuiCheckbox-root': {
                        p: 0.5,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        }
                      }
                    }}
                  >
                    <MRT_TableBodyCellValue cell={cell} table={table} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getVisibleFlatColumns().length} sx={{ py: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>No results found</Typography>
                  <Typography variant="caption">Try adjusting your filters or search query</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

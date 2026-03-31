import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { MRT_TableBodyCellValue, flexRender } from 'material-react-table';

const TableComponent = ({ table }: any) => {
  const theme = useTheme();

  return (
    <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
      <Table>
        <TableHead style={{ background: theme.palette.primary.main }}>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableCell
                  sx={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: theme.palette.primary.contrastText || '#ffff',
                    borderLeft: `0.6px solid ${theme.dashboard?.glassBorder || '#ecf0f5'}`,
                    py: 1,
                    px: 1,
                    minWidth: { xs: '100px', md: '150px' },
                    '& .MuiCheckbox-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      p: 0.5,
                      '& .MuiSvgIcon-root': {
                        fontSize: '18px'
                      }
                    },
                    '& .MuiCheckbox-root.Mui-checked': {
                      color: '#ffffff',
                    }
                  }}
                  align="center"
                  variant="head"
                  key={header.id}
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
          {table.getRowModel().rows.map((row: any) => (
            <TableRow key={row.id} selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell: any) => (
                <TableCell
                  sx={{ 
                    fontSize: { xs: '11px', md: '13px' }, 
                    fontWeight: 500,
                    padding: '8px 14px', 
                    border: `1px solid ${theme.dashboard?.glassBorder || '#ecf0f5'}`,
                    color: 'text.primary',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    '& .MuiCheckbox-root': {
                      p: 0.5,
                      '& .MuiSvgIcon-root': {
                        fontSize: '18px'
                      }
                    }
                  }}
                  align="center"
                  variant="body"
                  key={cell.id}
                >
                  <MRT_TableBodyCellValue cell={cell} table={table} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;


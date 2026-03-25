import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { MRT_TableBodyCellValue, flexRender } from 'material-react-table';

const TableComponent = ({ table }: any) => {
  const theme = useTheme();

  return (
    <TableContainer sx={{ overflow: 'visible' }}>
      <Table>
        <TableHead style={{ background: theme.palette.primary.main }}>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    color: theme.palette.primary.contrastText || '#ffff',
                    borderLeft: `0.6px solid ${theme.dashboard?.glassBorder || '#ecf0f5'}`,
                    minWidth: '150px',
                    '& .MuiCheckbox-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
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
                  style={{ fontSize: '10px', padding: '3px', border: `1px solid ${theme.dashboard?.glassBorder || '#ecf0f5'}` }}
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


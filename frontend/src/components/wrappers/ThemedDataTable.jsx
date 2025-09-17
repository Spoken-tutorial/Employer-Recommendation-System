import DataTable from 'react-data-table-component';
// import { tableStyles as defaultTableStyle } from '../customStyles'; // ← fix path
import { tableStyles as  defaultTableStyle } from '../../customStyles';

export default function ThemedDataTable({ customStyles, ...props }) {
  const merged = { ...defaultTableStyle, ...customStyles };
  return <DataTable {...props} customStyles={merged} />;
}

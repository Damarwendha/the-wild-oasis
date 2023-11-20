import { useCabins } from "./useCabins";

import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import CabinRows from "./CabinRows";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) <span>Error: {error.message}</span>;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
        <div></div>
      </Table.Header>
      <Table.Body>
        <CabinRows cabins={cabins} />
      </Table.Body>
    </Table>
  );
}

export default CabinTable;

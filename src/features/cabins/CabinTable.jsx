import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";

import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import CabinRows from "./CabinRows";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const currFilter = searchParams.get("discount") || "all";

  let filteredCabins;
  switch (currFilter) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => !cabin.discount);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount);
      break;
    default:
      console.error("Unexpected switch case!");
  }

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
        <CabinRows cabins={filteredCabins} />
      </Table.Body>
    </Table>
  );
}

export default CabinTable;

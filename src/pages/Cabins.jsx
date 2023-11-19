import CabinTable from "@/features/cabins/CabinTable";
import AddCabin from "@/features/cabins/AddCabin";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Cabins() {
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>

      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

import CabinTable from "@/features/cabins/CabinTable";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Cabins() {
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>

      <Row as='table' type='vertical'>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;

import { useState } from "react";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateEditCabinForm";
import Button from "@/ui/Button";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>

      <Row type="vertical">
        <CabinTable />
        <Button onClick={() => setShowForm((s) => !s)}>Add new cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

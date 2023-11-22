import Filter from "@/ui/Filter";
import TableOperations from "@/ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { URLValue: "all", label: "All" },
          { URLValue: "with-discount", label: "With discount" },
          { URLValue: "no-discount", label: "No discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

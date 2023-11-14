import CabinRow from "@/features/cabins/CabinRow";

function CabinRows({ cabins }) {
  return cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />);
}

export default CabinRows;

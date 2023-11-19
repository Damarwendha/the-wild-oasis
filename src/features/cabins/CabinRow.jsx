import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { BiDuplicate, BiEdit } from "react-icons/bi";

import { formatCurrency } from "@/utils/helpers";

import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import CreateCabinForm from "./CreateEditCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function handleDuplicate() {
    createCabin({ ...cabin, name: `${name} (copy)` });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="Cabin" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Modal.ToOpen>
              <button>
                <BiEdit />
              </button>
            </Modal.ToOpen>
            <Modal.Window>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.ToOpen>
              <button>
                <HiTrash />
              </button>
            </Modal.ToOpen>
            <Modal.Window>
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>

          <button onClick={handleDuplicate} disabled={isCreating}>
            <BiDuplicate />
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;

import styled from "styled-components";

import { formatCurrency } from "@/utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

import { HiTrash } from "react-icons/hi2";
import { BiDuplicate, BiEdit } from "react-icons/bi";
import Modal from "@/ui/Modal";
import Table from "@/ui/Table";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Menus from "@/ui/Menus";
import CreateCabinForm from "./CreateEditCabinForm";

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
    <Table.Row>
      <Img src={image} alt="Cabin" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id="menu-cabin" />

            <Menus.List id="menu-cabin">
              <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
                <BiDuplicate color="blue" opacity="60%" />
                <span>Duplicate</span>
              </Menus.Button>

              <Modal.ToOpen id="cabin-edit">
                <Menus.Button>
                  <BiEdit color="orange" opacity="60%" />
                  <span>Edit</span>
                </Menus.Button>
              </Modal.ToOpen>

              <Modal.ToOpen id="cabin-delete">
                <Menus.Button>
                  <HiTrash color="red" opacity="60%" />
                  <span>Delete</span>
                </Menus.Button>
              </Modal.ToOpen>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window id="cabin-edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window id="cabin-delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;

import { BiEdit } from "react-icons/bi";
import Modal from "@/ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";

function EditCabin({ cabin }) {
  return (
    <Modal>
      <Modal.ToOpen window="cabin-form">
        <button>
          <BiEdit />
        </button>
      </Modal.ToOpen>
      <Modal.Window name="cabin-form">
        <CreateEditCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;

import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.ToOpen window="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.ToOpen>
      <Modal.Window name="cabin-form">
        <CreateEditCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

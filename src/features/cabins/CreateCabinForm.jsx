/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { isEmptyObj } from "@/utils/helpers";

import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import Spinner from "@/ui/Spinner";
import FormRow from "@/ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { createCabin, isCreating } = useCreateCabin(reset);
  const { editCabin, isEditing } = useEditCabin(reset);

  const isWorking = isCreating || isEditing;

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: { ...otherValues } });

  // create session or edit session
  const isCreateSession = isEmptyObj(cabinToEdit);

  // undefined when create session
  const { id: cabinToEditId, image: oldImage, ...otherValues } = cabinToEdit;

  if (isWorking) return <Spinner />;

  function onSubmit(data) {
    const newImage = data.image;

    if (isCreateSession)
      createCabin({
        ...data,
        image: newImage[0],
      });
    else
      editCabin({
        ...data,
        image: isEmptyObj(newImage) ? oldImage : newImage[0],
        id: cabinToEditId,
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: true })}
        />

        {errors.maxCapacity && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: true })}
        />

        {errors.regularPrice && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice),
          })}
        />
        {errors.discount && (
          <Error>*Discount value should be less than regular price</Error>
        )}
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: true })}
        />
        {errors.description && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: isCreateSession })}
        />
        {errors.image && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

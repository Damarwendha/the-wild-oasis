/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import Spinner from "@/ui/Spinner";
import FormRow from "@/ui/FormRow";

import { createEditCabin } from "@/services/apiCabins";
import { isEmptyObj } from "@/utils/helpers";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledLabel = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: cabinToEditId, image, ...otherValues } = cabinToEdit;
  let action = !cabinToEditId ? "create" : "edit";
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: { ...otherValues } });

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: (data) => createEditCabin(data),
    mutationKey: "cabins",

    onSuccess: () => {
      toast.success("Cabin successfully added");
      queryClient.invalidateQueries("cabins");
      reset();
    },

    onError: () => {
      toast.error((error) => error.message);
    },
  });

  if (isCreating) return <Spinner />;

  function onSubmit(data) {
    mutate({
      ...data,
      image: isEmptyObj(data.image) ? image : data.image[0],
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

      <StyledFormRow label="Cabin photo">
        <StyledLabel htmlFor="image">Cabin photo</StyledLabel>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: action === "create" })}
        />
        {errors.image && <Error>*This field is requiered</Error>}
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;

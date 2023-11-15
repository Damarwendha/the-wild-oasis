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

import { addCabin } from "@/services/apiCabins";
import FormRow from "@/ui/FormRow";

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

function CreateCabinForm() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: (data) => addCabin(data),
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

  return (
    <Form onSubmit={handleSubmit(mutate)}>
      <FormRow label="Cabin name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Maximum capacity">
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />

        {errors.maxCapacity && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Regular price">
        <Input type="number" id="regularPrice" {...register("regularPrice")} />

        {errors.regularPrice && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Discount">
        <Input
          type="text"
          id="discount"
          defaultValue={0}
          {...register("discount")}
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
          {...register("description")}
        />
        {errors.description && <Error>*This field is requiered</Error>}
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
        {errors.image && <Error>*This field is requiered</Error>}
      </FormRow>

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

import styled from "styled-components";

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

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      <StyledLabel htmlFor={children[0]?.props.id || children?.props.id}>
        {label}
      </StyledLabel>
      {children}
    </StyledFormRow>
  );
}

export default FormRow;

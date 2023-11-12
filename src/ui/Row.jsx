import styled, { css } from "styled-components";

const types = {
  vertical: css`
    flex-direction: column;
    gap: 1, 6rem;
  `,
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,
};

const Row = styled.div`
  display: flex;

  ${(props) => types[props.type]}
`;

Row.defaultProps = {
  type: "horizontal",
};

export default Row;

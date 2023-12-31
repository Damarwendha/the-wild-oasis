import styled, { css } from "styled-components";

const Heading = styled.h1`
  margin-top: 2rem;
  ${(props) => as[props.as]}
`;

const as = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
};

export default Heading;

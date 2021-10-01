import styled from 'styled-components';

export const StyledMenu = styled.nav`
  width: 30%;
  box-shadow: 0px 2px 5px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #89CCE0;
  text-align: left;
  padding: 0.5rem;
  position: absolute;
  top: 61px;
  right: 0;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 1rem;
    padding-bottom: 0.5rem;
    font-weight: bold;
    color: #787676;
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
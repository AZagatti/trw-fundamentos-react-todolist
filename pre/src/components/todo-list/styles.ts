import styled from 'styled-components'

export const Container = styled.div`
  max-width: 720px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  h2 {
    margin-bottom: 16px;
  }
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    > input {
      width: 100%;
    }
  }
  > ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`

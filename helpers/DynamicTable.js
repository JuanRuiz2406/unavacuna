import { StyledTable, THead, TBody, TFoot, TH, TR, TD } from "../shared/Table";


      {/**
       <Table>
        <Table.Head>
          <Table.TR>
            {headers.map((headers, idx) => (
              <Table.TH key={idx}>{headers}</Table.TH>
            ))}
          </Table.TR>
        </Table.Head>
        <Table.Body>
          {patients.map((dt, idx) => (
            <Table.TR key={idx}>
              <Table.TD>{dt.idCard}</Table.TD>
              <Table.TD>{dt.name}</Table.TD>
              <Table.TD>{dt.lastName}</Table.TD>
              <Table.TD>
                {new Date(dt.registerDate).toLocaleDateString("es-CR")}
              </Table.TD>

              <Table.TD>
                <Button bgColor="true">Ver</Button>
              </Table.TD>
            </Table.TR>
          ))}
        </Table.Body>
      </Table>
 
 */}
 
export const Table = ({ children, ...rest }) => {
  return <StyledTable {...rest}>{children}</StyledTable>;
};

Table.Head = ({ children, ...rest }) => {
  return <THead {...rest}>{children}</THead>;
};

Table.Body = ({ children, ...rest }) => {
  return <TBody {...rest}>{children}</TBody>;
};

Table.Foot = ({ children, ...rest }) => {
  return <TFoot {...rest}>{children}</TFoot>;
};

Table.TH = ({ children, ...rest }) => {
  return <TH {...rest}>{children}</TH>;
};

Table.TR = ({ children, ...rest }) => {
  return <TR {...rest}>{children}</TR>;
};

Table.TD = ({ children, ...rest }) => {
  return <TD {...rest}>{children}</TD>;
};

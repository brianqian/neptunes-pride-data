import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';

const Container = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    text-align: center;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tbody {
      tr {
        :nth-child(odd) {
          background-color: hsl(0, 0%, 70%);
        }
        transition: 0.25s ease-in;
        :hover {
          /* font-size: 1.2em; */
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function Data({ data }) {
  const formattedData = Object.keys(data).reduce((a, user) => {
    a.push(data[user]);
    return a;
  }, []);

  console.log(formattedData);

  const columns = React.useMemo(() => [
    {
      Header: 'User',
      columns: [{ Header: 'Name', accessor: 'alias' }],
    },
    {
      Header: 'General Info',
      columns: [
        {
          Header: 'Stars',
          accessor: 'total_stars',
        },
        {
          Header: 'Carriers',
          accessor: 'total_fleets',
        },
        {
          Header: 'Total Ships',
          accessor: 'total_strength',
        },
        {
          Header: 'Economy',
          accessor: 'total_economy',
        },
        {
          Header: 'Industry',
          accessor: 'total_industry',
        },
        {
          Header: 'Science',
          accessor: 'total_science',
        },
      ],
    },
    {
      Header: 'Tech',
      columns: [
        {
          Header: 'Scanning',
          accessor: 'tech.scanning.level',
        },
        {
          Header: 'Hyperspace',
          accessor: 'tech.propulsion.level',
        },
        {
          Header: 'Terraforming',
          accessor: 'tech.terraforming.level',
        },
        {
          Header: 'Experimentation',
          accessor: 'tech.research.level',
        },
        {
          Header: 'Weapons',
          accessor: 'tech.weapons.level',
        },
        {
          Header: 'Banking',
          accessor: 'tech.banking.level',
        },
        {
          Header: 'Manufacturing',
          accessor: 'tech.manufacturing.level',
        },
      ],
    },
  ]);

  const memoData = React.useMemo(() => formattedData, [data]);

  // return <div></div>;

  return (
    <Container>
      <Table columns={columns} data={memoData} />
    </Container>
  );
}

export default Data;

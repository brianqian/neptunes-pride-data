import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';
import colorMap from '../data/colorMap';

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

const TableRow = styled.tr`
  ${(p) => {
    if (p.colorSetting === 'color') {
      return 'background-color: ' + p.theme.changeOpacity(p.color, p.opacity ?? 100) + ';';
    }
    if (p.colorSetting === 'alternate') {
      return ':nth-child(odd){background-color: gray;}';
    }
  }}
  color: ${(p) => p.fontColor || 'blue'};
  /* color: blue; */
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = ({ columns, data, settings }) => {
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
            const username = row.cells[0].value;
            {
              /* console.log(colorMap[username]); */
            }
            return (
              <TableRow
                {...row.getRowProps()}
                color={colorMap[username]}
                colorSetting={settings.color}
                opacity={settings.opacity}
                fontColor={settings.fontColor}
              >
                {row.cells.map((cell, i) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function Data({ data, settings }) {
  const formattedData = Object.keys(data).reduce((a, user) => {
    const player = data[user];
    const shipsPer12 = (player.total_industry * (player.tech.manufacturing.level + 5)) / 2;
    player.shipsPer12 = shipsPer12;
    a.push(player);
    return a;
  }, []);

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
        { Header: 'Ships/12 hrs', accessor: 'shipsPer12' },
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
      <Table columns={columns} data={memoData} settings={settings} />
    </Container>
  );
}

export default Data;
